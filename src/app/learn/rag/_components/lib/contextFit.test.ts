import { describe, it, expect } from "vitest";
import { fitContext } from "./contextFit";
import type { Chunk } from "../ragStore";

/* The vessel and the prompt stage share this function — its fixtures
   are therefore the packing contract for BOTH. */

const chunk = (id: number, tokens: number): Chunk =>
  ({ id, tokens, text: `c${id}`, page: 1, start: 0, chars: 10, overlapChars: 0 });

const chunks = [chunk(1, 100), chunk(2, 200), chunk(3, 300), chunk(4, 50)];

describe("fitContext", () => {
  it("packs in rank order until the budget is exhausted", () => {
    const r = fitContext([1, 2, 3, 4], chunks, 320);
    expect(r.kept).toEqual([1, 2]);
    expect(r.ctxTokens).toBe(300);
    expect(r.dropped).toEqual([3, 4]);
  });

  it("V1 semantics: rank order is sacred — no cherry-picking a smaller later chunk", () => {
    // chunk 4 (50t) WOULD fit after 1+2, but chunk 3 blocks the line
    const r = fitContext([1, 2, 3, 4], chunks, 360);
    expect(r.kept).toEqual([1, 2]);
    expect(r.dropped).toContain(4);
  });

  it("always keeps at least the first chunk, even over budget", () => {
    const r = fitContext([3], chunks, 100);
    expect(r.kept).toEqual([3]);
    expect(r.ctxTokens).toBe(300);
    expect(r.dropped).toEqual([]);
  });

  it("handles empty selections and unknown ids", () => {
    expect(fitContext([], chunks, 500)).toEqual({ kept: [], dropped: [], ctxTokens: 0 });
    expect(fitContext([99], chunks, 500).kept).toEqual([]);
  });
});
