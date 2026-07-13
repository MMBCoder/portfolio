// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { useRagStore, type Chunk } from "../ragStore";
import { reembed, EMBED_BATCH } from "./pipeline";

/* M6: embeds are batched (EMBED_BATCH per request) and reassembled in
   order; usage tokens accumulate across batches. */

const S = () => useRagStore.getState();

afterEach(() => vi.unstubAllGlobals());

describe("batched embedding", () => {
  it("splits 250 chunks into 100/100/50, reassembles in order, sums tokens", async () => {
    const chunks: Chunk[] = Array.from({ length: 250 }, (_, i) => ({
      id: i + 1, text: `chunk text ${i + 1}`, page: 1, start: i * 10,
      chars: 14, tokens: 5, overlapChars: 0,
    }));
    S().resetAll();
    useRagStore.setState({ chunks, usage: { embedTokens: 0, promptTokens: 0, completionTokens: 0, costUSD: 0 } });

    const batchSizes: number[] = [];
    vi.stubGlobal("fetch", async (_url: RequestInfo | URL, init?: RequestInit) => {
      const { texts } = JSON.parse(String(init?.body)) as { texts: string[] };
      batchSizes.push(texts.length);
      // vector encodes its global chunk index so order is verifiable
      const vectors = texts.map(t => {
        const idx = Number(t.replace("chunk text ", ""));
        return [idx, 0, 0, 0];
      });
      return new Response(JSON.stringify({ vectors, tokens: texts.length * 5 }), { status: 200 });
    });

    const ok = await reembed();
    expect(ok).toBe(true);
    expect(batchSizes).toEqual([EMBED_BATCH, EMBED_BATCH, 50]);

    const st = S();
    expect(st.embeddings).toHaveLength(250);
    expect(st.embeddings[0][0]).toBe(1);       // order preserved across batches
    expect(st.embeddings[249][0]).toBe(250);
    expect(st.usage.embedTokens).toBe(1250);   // summed across batches
    expect(st.coords3).toHaveLength(250);      // PCA ran (sync fallback in jsdom)
    expect(st.ingested).toBe(true);
  }, 20_000);
});
