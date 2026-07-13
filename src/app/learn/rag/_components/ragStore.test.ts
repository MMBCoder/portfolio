import { describe, it, expect, beforeEach } from "vitest";
import { useRagStore, STAGE_IDS, DEFAULT_PARAMS, PRICING } from "./ragStore";

const S = () => useRagStore.getState();

beforeEach(() => {
  S().resetAll();
  S().patch({
    params: { ...DEFAULT_PARAMS },
    usage: { embedTokens: 0, promptTokens: 0, completionTokens: 0, costUSD: 0 },
  });
});

describe("stage bookkeeping", () => {
  it("has all 14 stages idle initially", () => {
    expect(STAGE_IDS).toHaveLength(14);
    for (const id of STAGE_IDS) expect(S().stages[id].status).toBe("idle");
  });

  it("setStage merges a partial patch without touching other stages", () => {
    S().setStage("embed", { status: "running" });
    S().setStage("embed", { ms: 123 });
    expect(S().stages.embed).toMatchObject({ status: "running", ms: 123 });
    expect(S().stages.parse.status).toBe("idle");
  });

  it("resetStagesFrom resets the given stage and everything after it", () => {
    for (const id of STAGE_IDS) S().setStage(id, { status: "done", ms: 5 });
    S().resetStagesFrom("query");
    expect(S().stages.index.status).toBe("done");
    expect(S().stages.query).toEqual({ status: "idle" });
    expect(S().stages.evaluate).toEqual({ status: "idle" });
  });
});

describe("resetQuery", () => {
  it("clears query artifacts and query stages but keeps ingestion artifacts", () => {
    S().patch({
      chunks: [{ id: 1, text: "t", page: 1, start: 0, chars: 1, tokens: 1, overlapChars: 0 }],
      embeddings: [[1, 2]],
      ingested: true,
      queryVec: [1],
      candidates: [{ chunkId: 1, semantic: 1, keyword: 1, hybrid: 1, rank: 1 }],
      results: [1],
      answer: "old answer",
    });
    S().setStage("index", { status: "done" });
    S().setStage("generate", { status: "done" });

    S().resetQuery();

    expect(S().chunks).toHaveLength(1);
    expect(S().embeddings).toHaveLength(1);
    expect(S().ingested).toBe(true);
    expect(S().queryVec).toBeNull();
    expect(S().candidates).toEqual([]);
    expect(S().results).toEqual([]);
    expect(S().answer).toBeNull();
    expect(S().stages.index.status).toBe("done");
    expect(S().stages.generate.status).toBe("idle");
  });
});

describe("resetAll", () => {
  it("clears artifacts, bumps runId, and preserves params", () => {
    S().setParam("topK", 7);
    S().patch({ docName: "x.pdf", ingested: true });
    const before = S().runId;

    S().resetAll();

    expect(S().docName).toBeNull();
    expect(S().ingested).toBe(false);
    expect(S().runId).toBe(before + 1);
    expect(S().params.topK).toBe(7); // params survive a reset — user tuning is respected
  });
});

describe("usage accounting", () => {
  it("accumulates additively across calls", () => {
    S().addUsage({ embedTokens: 100, costUSD: 0.001 });
    S().addUsage({ promptTokens: 50, completionTokens: 20, costUSD: 0.002 });
    expect(S().usage).toEqual({
      embedTokens: 100, promptTokens: 50, completionTokens: 20,
      costUSD: expect.closeTo(0.003, 9),
    });
  });

  it("has real (non-zero) pricing constants for both models", () => {
    expect(PRICING.embedInput).toBeGreaterThan(0);
    expect(PRICING.genInput).toBeGreaterThan(0);
    expect(PRICING.genOutput).toBeGreaterThan(PRICING.genInput);
  });
});

describe("run cancellation and selection", () => {
  it("bumpRun returns the new id and stores it", () => {
    const id = S().bumpRun();
    expect(S().runId).toBe(id);
    expect(S().bumpRun()).toBe(id + 1);
  });

  it("select toggles the inspector target", () => {
    S().select("chunk");
    expect(S().selected).toBe("chunk");
    S().select(null);
    expect(S().selected).toBeNull();
  });

  it("setParam updates one key without clobbering the rest", () => {
    S().setParam("chunkSize", 900);
    expect(S().params.chunkSize).toBe(900);
    expect(S().params.systemPrompt).toBe(DEFAULT_PARAMS.systemPrompt);
  });
});
