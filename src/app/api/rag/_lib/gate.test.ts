import { describe, it, expect, beforeEach, afterEach } from "vitest";
import crypto from "node:crypto";
import { accessRequired, isUnlocked, verifyCode, unlockCookie, guard } from "./gate";

/* The gate is OPEN when no passphrase is configured (local dev / CI) and
   ENFORCED when RAG_ACCESS_CODE is set. */

const CODE = "open-sesame";
const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

const reqWith = (headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/rag/embed", { method: "POST", headers });

const withCookie = (token: string) => reqWith({ cookie: `rag_access=${token}` });

afterEach(() => { delete process.env.RAG_ACCESS_CODE; delete process.env.RAG_RATE_LIMIT; });

describe("gate — open when unconfigured", () => {
  beforeEach(() => { delete process.env.RAG_ACCESS_CODE; });

  it("reports not required and always unlocked", () => {
    expect(accessRequired()).toBe(false);
    expect(isUnlocked(reqWith())).toBe(true);
    expect(verifyCode("anything")).toBe(true);
    expect(guard(reqWith())).toBeNull();
  });
});

describe("gate — enforced when configured", () => {
  beforeEach(() => { process.env.RAG_ACCESS_CODE = CODE; });

  it("requires access and blocks requests without a valid cookie", () => {
    expect(accessRequired()).toBe(true);
    expect(isUnlocked(reqWith())).toBe(false);
    const denied = guard(reqWith());
    expect(denied?.status).toBe(401);
  });

  it("accepts the correct passphrase and its cookie, rejects wrong ones", () => {
    expect(verifyCode(CODE)).toBe(true);
    expect(verifyCode("nope")).toBe(false);
    expect(isUnlocked(withCookie(sha(CODE)))).toBe(true);
    expect(isUnlocked(withCookie(sha("nope")))).toBe(false);
    expect(guard(withCookie(sha(CODE)))).toBeNull();
  });

  it("never puts the raw passphrase in the cookie (stores a hash, httpOnly)", () => {
    const cookie = unlockCookie();
    expect(cookie).toContain(sha(CODE));
    expect(cookie).not.toContain(CODE);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
  });
});

describe("rate limiting", () => {
  beforeEach(() => {
    delete process.env.RAG_ACCESS_CODE;   // isolate rate limit from the gate
    process.env.RAG_RATE_LIMIT = "3";
  });

  it("429s a burst from one IP beyond the per-minute limit", () => {
    const ip = { "x-forwarded-for": "203.0.113.7" };
    expect(guard(reqWith(ip))).toBeNull();   // 1
    expect(guard(reqWith(ip))).toBeNull();   // 2
    expect(guard(reqWith(ip))).toBeNull();   // 3
    const fourth = guard(reqWith(ip));       // 4 → over the limit
    expect(fourth?.status).toBe(429);
  });

  it("tracks IPs independently", () => {
    process.env.RAG_RATE_LIMIT = "1";
    expect(guard(reqWith({ "x-forwarded-for": "198.51.100.1" }))).toBeNull();
    expect(guard(reqWith({ "x-forwarded-for": "198.51.100.2" }))).toBeNull();
  });
});
