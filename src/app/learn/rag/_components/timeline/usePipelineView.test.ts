// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useRagStore, DEFAULT_PARAMS, type Chunk } from "../ragStore";
import { captureSnapshot } from "../store/eventsSlice";
import { projectedState } from "./usePipelineView";
import { runIngestion } from "../lib/pipeline";

const S = () => useRagStore.getState();

const mkChunk = (id: number): Chunk =>
  ({ id, page: 1, text: `chunk ${id}`, chars: 8, tokens: 3, overlapChars: 0 } as Chunk);

beforeEach(() => {
  S().resetAll();
  useRagStore.setState({ events: [], scrubSeq: null });
});

describe("projection (scrub = read-only view, live store never rewound)", () => {
  it("live view is the store itself (zero-cost when not scrubbing)", () => {
    const s = S();
    expect(projectedState(s)).toBe(s);
  });

  it("scrubbed view overlays the snapshot at the scrub position", () => {
    // moment A: no chunks yet
    S().recordEvent({ t: 1, runId: 1, kind: "run-start", runKind: "ingestion", stage: null, snapshot: captureSnapshot(S()) });
    // moment B: chunks exist
    useRagStore.setState({ chunks: [mkChunk(1), mkChunk(2)] });
    S().recordEvent({ t: 2, runId: 1, kind: "stage-done", runKind: "ingestion", stage: "chunk", snapshot: captureSnapshot(S()) });
    // live moves on: more chunks
    useRagStore.setState({ chunks: [mkChunk(1), mkChunk(2), mkChunk(3)] });

    S().setScrub(0);
    expect(projectedState(S()).chunks).toHaveLength(0);   // artifacts vanish before their stage
    S().setScrub(1);
    expect(projectedState(S()).chunks).toHaveLength(2);
    S().setScrub(null);
    expect(projectedState(S()).chunks).toHaveLength(3);   // live again
    // and the LIVE store was never touched by any of this
    expect(S().chunks).toHaveLength(3);
  });

  it("params stay live while scrubbing (params always edit live state)", () => {
    S().recordEvent({ t: 1, runId: 1, kind: "run-start", runKind: "query", stage: null, snapshot: captureSnapshot(S()) });
    S().setScrub(0);
    S().setParam("topK", DEFAULT_PARAMS.topK + 3);
    expect(projectedState(S()).params.topK).toBe(DEFAULT_PARAMS.topK + 3);
  });

  it("is memoized per store snapshot (referential stability for selectors)", () => {
    S().recordEvent({ t: 1, runId: 1, kind: "run-start", runKind: "query", stage: null, snapshot: captureSnapshot(S()) });
    S().setScrub(0);
    const s = S();
    expect(projectedState(s)).toBe(projectedState(s));
  });
});

describe("recording wraps real runs (integration, stubbed network)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("a sample ingestion records run-start + one event per stage, scrubbable at every seq", async () => {
    vi.stubGlobal("fetch", async (url: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body ?? "{}")) as { texts?: string[] };
      if (String(url).includes("/embed")) {
        const vectors = (body.texts ?? []).map((_, i) =>
          new Array(8).fill(0).map((__, d) => Math.sin(i + d)));
        return new Response(JSON.stringify({ vectors, tokens: (body.texts ?? []).length * 3 }), { status: 200 });
      }
      throw new Error(`unexpected fetch ${String(url)}`);
    });

    const ok = await runIngestion({ sample: true });
    expect(ok).toBe(true);

    const evs = S().events;
    expect(evs[0].kind).toBe("run-start");
    expect(evs.filter(e => e.kind === "stage-done").map(e => e.stage)).toEqual(
      ["upload", "parse", "clean", "chunk", "tokenize", "embed", "index"],
    );

    // projection at every seq: artifacts appear exactly when their stage lands
    const at = (seq: number) => {
      useRagStore.setState({ scrubSeq: seq });
      return projectedState(S());
    };
    expect(at(0).pages).toHaveLength(0);
    expect(at(2).pages.length).toBeGreaterThan(0);        // after parse
    expect(at(3).chunks).toHaveLength(0);                 // clean done, not chunked yet
    expect(at(4).chunks.length).toBeGreaterThan(0);       // after chunk
    expect(at(4).embeddings).toHaveLength(0);
    expect(at(6).embeddings.length).toBeGreaterThan(0);   // after embed
    expect(at(6).ingested).toBe(false);
    expect(at(7).ingested).toBe(true);                    // after index

    // durations are real measurements
    for (const e of evs.filter(e => e.kind === "stage-done")) {
      expect(e.ms).toBeGreaterThan(0);
    }

    useRagStore.setState({ scrubSeq: null });
  }, 20_000);
});
