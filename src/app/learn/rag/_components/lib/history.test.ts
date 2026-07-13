import { describe, it, expect } from "vitest";
import { chunkHistories, pageHeat, heatColor, latencySamples, queryRuns, MAX_RUNS } from "./history";
import { captureSnapshot, type PipelineEvent, type ArtifactRefs } from "../store/eventsSlice";
import type { Chunk, Candidate, AnswerSentence } from "../ragStore";

/* History is a pure projection of the event log — these fixtures mirror
   the snapshots real query runs record. */

const chunk = (id: number, page: number): Chunk =>
  ({ id, page, text: `chunk ${id}`, chars: 10, tokens: 5, start: 0, overlapChars: 0 });

const snap = (over: Partial<ArtifactRefs>): ArtifactRefs =>
  ({ ...captureSnapshot({
    docName: "d", docBytes: 1, isSample: true, pdfData: null,
    pages: [{ page: 1, text: "a" }, { page: 2, text: "b" }],
    cleanStats: null, cleanedPages: [], chunks: [], embeddings: [], coords3: [],
    query: "", queryVec: null, candidates: [], results: [], promptBlocks: [],
    answer: null, answerSentences: [], evalScores: null, sentenceVerdicts: null,
    stages: {}, usage: { embedTokens: 0, promptTokens: 0, completionTokens: 0, costUSD: 0 },
    ingested: true,
  } as never), ...over });

const queryEvent = (runId: number, over: Partial<ArtifactRefs>, seq = runId): PipelineEvent => ({
  seq, t: runId * 1000, runId, kind: "stage-done", runKind: "query",
  stage: "evaluate", ms: 400, snapshot: snap(over),
});

const chunks = [chunk(1, 1), chunk(2, 1), chunk(3, 2)];
const cand = (chunkId: number, semantic: number): Candidate =>
  ({ chunkId, semantic, keyword: 0, hybrid: semantic, rank: 1 });
const sent = (citations: number[]): AnswerSentence => ({ text: "s", citations });

describe("chunkHistories", () => {
  const events = [
    queryEvent(1, { chunks, query: "q1", candidates: [cand(1, 0.9), cand(2, 0.4)], results: [1], answerSentences: [sent([1])] }),
    queryEvent(2, { chunks, query: "q2", candidates: [cand(1, 0.3), cand(2, 0.8)], results: [2], answerSentences: [sent([])] }),
  ];

  it("builds a per-question biography for every chunk", () => {
    const h = chunkHistories(events);
    const c1 = h.get(1)!;
    expect(c1.records.map(r => r.query)).toEqual(["q1", "q2"]);
    expect(c1.records[0]).toMatchObject({ sim: 0.9, retrieved: true, cited: true });
    expect(c1.records[1]).toMatchObject({ sim: 0.3, retrieved: false, cited: false });
    expect(c1.retrievedCount).toBe(1);
    expect(c1.citedCount).toBe(1);

    const c2 = h.get(2)!;
    expect(c2.retrievedCount).toBe(1);
    expect(c2.citedCount).toBe(0);   // retrieved but never cited
  });

  it("heat map matches the retrieval log exactly", () => {
    const cells = pageHeat(events);
    const p1 = cells.find(c => c.page === 1)!;
    expect(p1.count).toBe(2);   // chunk 1 once + chunk 2 once
    expect(p1.chunks).toEqual([{ id: 1, count: 1 }, { id: 2, count: 1 }]);
    const p2 = cells.find(c => c.page === 2)!;
    expect(p2.count).toBe(0);   // cold pages still appear
  });

  it("keeps one final event per run (ground superseded by evaluate)", () => {
    const both = [
      { ...queryEvent(1, { chunks, query: "q1" }), stage: "ground" as const, seq: 0 },
      queryEvent(1, { chunks, query: "q1" }, 1),
    ];
    expect(queryRuns(both)).toHaveLength(1);
  });

  it("caps at MAX_RUNS most recent runs (memory bound)", () => {
    const many = Array.from({ length: MAX_RUNS + 10 }, (_, i) =>
      queryEvent(i + 1, { chunks, query: `q${i + 1}`, results: [1] }, i));
    expect(queryRuns(many)).toHaveLength(MAX_RUNS);
    const h = chunkHistories(many);
    expect(h.get(1)!.records).toHaveLength(MAX_RUNS);
    expect(h.get(1)!.records[0].query).toBe("q11");   // oldest 10 dropped
  });
});

describe("heatColor", () => {
  it("is cold at zero and monotonically warmer with count", () => {
    expect(heatColor(0, 5)).toBe("rgba(37,99,235,0.05)");
    const alpha = (c: string) => Number(c.match(/([\d.]+)\)$/)![1]);
    expect(alpha(heatColor(1, 5))).toBeLessThan(alpha(heatColor(5, 5)));
  });
});

describe("latencySamples", () => {
  it("collects real per-stage duration samples across runs", () => {
    const events = [
      queryEvent(1, { chunks }), queryEvent(2, { chunks }), queryEvent(3, { chunks }),
    ];
    const s = latencySamples(events);
    expect(s.evaluate).toEqual([400, 400, 400]);
  });
});
