import { describe, it, expect } from "vitest";
import { MOMENT_RULES, type MomentState } from "./learningMoments";
import { DEFAULT_PARAMS, STAGE_IDS, type StageId, type StageState, type Candidate } from "../ragStore";
import { CONCEPTS } from "./concepts";

/* Rules are pure functions over real-shaped state — they can only quote
   numbers that exist. Fixtures below mirror actual pipeline output. */

const rule = (id: string) => {
  const r = MOMENT_RULES.find(r => r.id === id);
  if (!r) throw new Error(`no rule ${id}`);
  return r;
};

const idleStages = () =>
  Object.fromEntries(STAGE_IDS.map(id => [id, { status: "idle" }])) as Record<StageId, StageState>;

const cand = (chunkId: number, hybrid: number, rank: number, extra?: Partial<Candidate>): Candidate =>
  ({ chunkId, semantic: hybrid, keyword: hybrid, hybrid, rank, ...extra });

const base = (): MomentState => ({
  stages: idleStages(),
  candidates: [],
  results: [],
  params: { ...DEFAULT_PARAMS },
  promptBlocks: [],
  evalScores: null,
  chunks: [],
});

describe("learning-moment rules", () => {
  it("every rule references a real concept", () => {
    for (const r of MOMENT_RULES) expect(CONCEPTS[r.conceptId]).toBeDefined();
  });

  it("empty-retrieval fires only when retrieval finished with zero results", () => {
    const s = base();
    s.stages.retrieve = { status: "done" };
    s.candidates = [cand(1, 0.1, 1), cand(2, 0.05, 2)];
    s.results = [];
    expect(rule("empty-retrieval").evaluate(s)).toMatch(/all 2 chunks scored below/);

    s.results = [1];
    expect(rule("empty-retrieval").evaluate(s)).toBeNull();
  });

  it("budget-eviction fires when the prompt kept fewer chunks than retrieval selected (M8)", () => {
    const s = base();
    s.stages.prompt = { status: "done" };
    s.params.topK = 4;
    s.params.threshold = 0.3;
    s.candidates = [cand(1, 0.9, 1), cand(2, 0.8, 2), cand(3, 0.7, 3), cand(4, 0.6, 4)];
    s.results = [1, 2];   // prompt trimmed to 2
    expect(rule("budget-eviction").evaluate(s)).toMatch(/selected 4 chunks, but only 2 fit/);

    s.results = [1, 2, 3, 4];   // everything fit
    expect(rule("budget-eviction").evaluate(s)).toBeNull();
  });

  it("threshold-rejections fires at ≥5 rejections and quotes real counts", () => {
    const s = base();
    s.stages.retrieve = { status: "done" };
    s.candidates = [
      cand(1, 0.8, 1), cand(2, 0.7, 2),
      ...Array.from({ length: 6 }, (_, i) => cand(i + 3, 0.1, i + 3)),
    ];
    s.results = [1, 2];
    expect(rule("threshold-rejections").evaluate(s)).toMatch(/6 of 8 chunks/);

    s.candidates = [cand(1, 0.8, 1), cand(2, 0.1, 2)];  // only 1 rejection
    expect(rule("threshold-rejections").evaluate(s)).toBeNull();
  });

  it("rerank-promotion fires when a chunk crossed into top-K via re-ranking", () => {
    const s = base();
    s.stages.rerank = { status: "done" };
    s.params.topK = 4;
    s.candidates = [cand(7, 0.5, 6, { rerankScore: 91, rerankRank: 2 })];
    expect(rule("rerank-promotion").evaluate(s)).toMatch(/chunk 7[\s\S]*#6[\s\S]*#2/);

    s.candidates = [cand(7, 0.5, 2, { rerankScore: 91, rerankRank: 1 })];  // already inside top-K
    expect(rule("rerank-promotion").evaluate(s)).toBeNull();
  });

  it("context-underuse fires below 40% utilisation with real token numbers", () => {
    const s = base();
    s.stages.prompt = { status: "done" };
    s.promptBlocks = [
      { label: "System Prompt", text: "", tokens: 50, color: "" },
      { label: "Retrieved Context", text: "", tokens: 300, color: "" },
      { label: "User Question", text: "", tokens: 30, color: "" },
    ];
    s.params.contextBudget = 2000;
    expect(rule("context-underuse").evaluate(s)).toMatch(/15% full \(300 of 2000/);

    s.promptBlocks[1].tokens = 1200;   // 60% — healthy
    expect(rule("context-underuse").evaluate(s)).toBeNull();
  });

  it("zero-overlap fires only when chunks exist with overlap 0", () => {
    const s = base();
    s.params.chunkOverlap = 0;
    expect(rule("zero-overlap").evaluate(s)).toBeNull();   // no chunks yet

    s.chunks = [{ id: 1, text: "x", page: 1, start: 0, chars: 1, tokens: 1, overlapChars: 0 }];
    expect(rule("zero-overlap").evaluate(s)).toMatch(/overlap is set to 0/);

    s.params.chunkOverlap = 80;
    expect(rule("zero-overlap").evaluate(s)).toBeNull();
  });

  it("hallucination-high fires at risk ≥ 40 and quotes the score", () => {
    const s = base();
    s.evalScores = {
      faithfulness: 55, answerRelevance: 70, contextPrecision: 60,
      contextRecall: 50, hallucinationRisk: 62, verdict: "shaky",
    };
    expect(rule("hallucination-high").evaluate(s)).toMatch(/62\/100/);

    s.evalScores.hallucinationRisk = 12;
    expect(rule("hallucination-high").evaluate(s)).toBeNull();
  });
});
