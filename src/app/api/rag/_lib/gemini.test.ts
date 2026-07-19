import { describe, it, expect, vi, afterEach } from "vitest";
import { chat, embedTexts } from "./gemini";

/* Provider fallback: Gemini first, OpenAI gpt-5-mini as the cross-provider
   last resort. fetch is stubbed by URL so the chain is deterministic. */

const geminiOk = (text: string) => ({
  ok: true, status: 200,
  json: async () => ({
    candidates: [{ content: { parts: [{ text }] } }],
    usageMetadata: { promptTokenCount: 5, candidatesTokenCount: 7 },
  }),
});

const geminiEmbed = (n: number) => ({
  ok: true, status: 200,
  json: async () => ({ embeddings: Array.from({ length: n }, () => ({ values: [0.1, 0.2, 0.3] })) }),
});

const openaiOk = (text: string) => ({
  ok: true, status: 200,
  json: async () => ({ choices: [{ message: { content: text } }], usage: { prompt_tokens: 3, completion_tokens: 4 } }),
});

const fail = (status: number) => ({ ok: false, status, statusText: "err", json: async () => ({ error: { message: "down" } }) });

afterEach(() => { vi.unstubAllGlobals(); delete process.env.OPENAI_API_KEY; });

describe("gemini chat with OpenAI fallback", () => {
  it("uses Gemini when the first model answers, never touching OpenAI", async () => {
    const calls: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      calls.push(url);
      if (url.includes("generativelanguage")) return geminiOk("hi from gemini") as unknown as Response;
      throw new Error("should not call openai");
    }));
    const r = await chat("sys", "user");
    expect(r.text).toBe("hi from gemini");
    expect(calls.some(u => u.includes("openai.com"))).toBe(false);
  });

  it("falls back to OpenAI gpt-5-mini when every Gemini model is 503 and a key is set", async () => {
    process.env.OPENAI_API_KEY = "sk-test";
    const calls: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      calls.push(url);
      if (url.includes("generativelanguage")) return fail(503) as unknown as Response;
      if (url.includes("openai.com")) return openaiOk("hi from openai") as unknown as Response;
      throw new Error(`unexpected ${url}`);
    }));
    const r = await chat("sys", "user");
    expect(r.text).toBe("hi from openai");
    // all three Gemini models were tried before the fallback
    expect(calls.filter(u => u.includes("generativelanguage")).length).toBe(3);
    expect(calls.some(u => u.includes("openai.com"))).toBe(true);
  });

  it("throws when Gemini fails and no OpenAI key is configured", async () => {
    delete process.env.OPENAI_API_KEY;
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (url.includes("generativelanguage")) return fail(503) as unknown as Response;
      throw new Error("no openai");
    }));
    await expect(chat("sys", "user")).rejects.toThrow();
  });

  it("does NOT fall back on a non-retryable 400 (bad request)", async () => {
    process.env.OPENAI_API_KEY = "sk-test";
    const calls: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      calls.push(url);
      return fail(400) as unknown as Response;
    }));
    await expect(chat("sys", "user")).rejects.toThrow();
    expect(calls.some(u => u.includes("openai.com"))).toBe(false);   // 400 won't be fixed by another provider
  });

  it("embeds via Gemini and estimates token usage", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (url.includes("batchEmbedContents")) return geminiEmbed(2) as unknown as Response;
      throw new Error("unexpected");
    }));
    const { vectors, tokens } = await embedTexts(["hello", "world"]);
    expect(vectors).toHaveLength(2);
    expect(vectors[0]).toEqual([0.1, 0.2, 0.3]);
    expect(tokens).toBeGreaterThan(0);
  });
});
