import { describe, it, expect } from "vitest";
import { embedReuse, buildDiffFacts } from "./compareUtils";
import { explainDiff } from "../lab/ExplanationEngine";
import { coachInsights, type CoachState } from "../coach/insights";
import { LAB_EXPERIMENTS } from "../lab/experiments";
import { CONCEPTS } from "../education/concepts";
import { DEFAULT_PARAMS, STAGE_IDS, type Chunk, type EvalScores, type RagParams, type StageId, type StageState } from "../ragStore";
import type { RunPin } from "../store/compareSlice";

const chunk = (id: number, tokens = 100): Chunk =>
  ({ id, tokens, text: `c${id}`, page: 1, start: 0, chars: 10, overlapChars: 0 });

const scores = (over: Partial<EvalScores>): EvalScores =>
  ({ faithfulness: 90, answerRelevance: 85, contextPrecision: 80, contextRecall: 75, hallucinationRisk: 10, verdict: "", ...over });

const pin = (over: Partial<RunPin> = {}): RunPin => ({
  at: 0, runId: 1, params: { ...DEFAULT_PARAMS }, query: "q",
  results: [1, 2, 3], evalScores: scores({}), answer: "A answer",
  usageAt: { embedTokens: 0, promptTokens: 0, completionTokens: 0, costUSD: 0.01 },
  queryMs: 5000, chunkCount: 3, ...over,
});

describe("embed-reuse detection (A/B cost honesty)", () => {
  it("unchanged chunking re-uses embeddings at $0", () => {
    const r = embedReuse(DEFAULT_PARAMS, { ...DEFAULT_PARAMS, topK: 8, temperature: 1 }, [chunk(1), chunk(2)]);
    expect(r).toEqual({ reuse: true, estCostUSD: 0, estTokens: 0 });
  });

  it("chunking changes preview the REAL token count and price", () => {
    const r = embedReuse(DEFAULT_PARAMS, { ...DEFAULT_PARAMS, chunkSize: DEFAULT_PARAMS.chunkSize + 200 }, [chunk(1, 100), chunk(2, 150)]);
    expect(r.reuse).toBe(false);
    expect(r.estTokens).toBe(250);
    expect(r.estCostUSD).toBeGreaterThan(0);
  });
});

describe("diff facts + explanation binding", () => {
  const facts = buildDiffFacts(pin(), {
    params: { ...DEFAULT_PARAMS, topK: DEFAULT_PARAMS.topK + 2 },
    results: [2, 3, 4, 5],
    evalScores: scores({ hallucinationRisk: 35, faithfulness: 70 }),
    queryMs: 7000,
    costUSD: 0.018,
  });

  it("computes shared / only-A / only-B retrieval sets", () => {
    expect(facts.shared).toEqual([2, 3]);
    expect(facts.onlyA).toEqual([1]);
    expect(facts.onlyB).toEqual([4, 5]);
    expect(facts.paramsChanged).toEqual(["topK"]);
    expect(facts.costDeltaUSD).toBeCloseTo(0.008, 10);
  });

  it("explanations quote ONLY numbers that exist in the facts (no unbound claims)", () => {
    const lines = explainDiff(facts);
    const legal = new Set<string>([
      "10", "35", "25", "90", "70", "20",           // risk/faith values and deltas
      "80", "80",                                   // precision (unchanged → not quoted, but legal)
      "2", "5", "1", "4", "3",                      // set sizes & chunk ids
      "5.0", "7.0", "2.0",                          // latency seconds
      "0.0080",                                     // cost delta
    ]);
    for (const line of lines) {
      for (const num of line.match(/\d+(?:\.\d+)?/g) ?? []) {
        expect(legal.has(num), `"${num}" in "${line}" is not a measured fact`).toBe(true);
      }
    }
    expect(lines.some(l => l.includes("35"))).toBe(true);      // risk quoted
    expect(lines.some(l => l.includes("share 2 of 5"))).toBe(true);
  });

  it("reports honest 'no significant change' when nothing moved", () => {
    const flat = buildDiffFacts(pin(), {
      params: { ...DEFAULT_PARAMS }, results: [1, 2, 3],
      evalScores: scores({}), queryMs: 5100, costUSD: 0.01,
    });
    expect(explainDiff(flat).join(" ")).toMatch(/No significant measured difference/);
  });
});

describe("lab presets", () => {
  it("every preset references a real concept and real params", () => {
    expect(LAB_EXPERIMENTS).toHaveLength(9);
    for (const e of LAB_EXPERIMENTS) {
      expect(CONCEPTS[e.conceptId], `${e.id} concept`).toBeDefined();
      expect(e.hypothesis.length, `${e.id} hypothesis too thin`).toBeGreaterThan(50);
      for (const k of Object.keys(e.apply)) {
        expect(k in DEFAULT_PARAMS, `${e.id} applies unknown param ${k}`).toBe(true);
      }
      const rechunks = "chunkSize" in e.apply || "chunkOverlap" in e.apply;
      expect(e.needsReembed, `${e.id} re-embed flag wrong`).toBe(rechunks);
    }
  });
});

describe("coach rules", () => {
  const idleStages = () =>
    Object.fromEntries(STAGE_IDS.map(id => [id, { status: "idle" }])) as Record<StageId, StageState>;

  const base = (): CoachState => ({
    stages: idleStages(), candidates: [], results: [],
    params: { ...DEFAULT_PARAMS } as RagParams, promptBlocks: [], evalScores: null,
    answerSentences: [], chunks: [],
  });

  it("high risk + uncited sentences → raise threshold, quoting the numbers", () => {
    const s = base();
    s.stages.evaluate = { status: "done" };
    s.evalScores = scores({ hallucinationRisk: 55 });
    s.answerSentences = [{ text: "a", citations: [] }, { text: "b", citations: [1] }];
    const ins = coachInsights(s);
    const hit = ins.find(i => i.id === "high-risk")!;
    expect(hit.text).toContain("55/100");
    expect(hit.text).toContain("1 sentence");
    expect(hit.apply?.params.threshold).toBeGreaterThan(DEFAULT_PARAMS.threshold);
  });

  it("insights disappear once the condition is addressed (no nagging)", () => {
    const s = base();
    s.stages.evaluate = { status: "done" };
    s.evalScores = scores({ hallucinationRisk: 8 });
    expect(coachInsights(s).find(i => i.id === "high-risk")).toBeUndefined();
  });

  it("ranked by severity, most important first", () => {
    const s = base();
    s.stages.evaluate = { status: "done" };
    s.stages.retrieve = { status: "done" };
    s.evalScores = scores({ hallucinationRisk: 60 });
    s.answerSentences = [{ text: "a", citations: [] }];
    s.params.useRerank = false;
    s.candidates = Array.from({ length: 8 }, (_, i) => ({ chunkId: i + 1, semantic: 0.9, keyword: 0.9, hybrid: 0.9, rank: i + 1 }));
    s.results = [1, 2, 3, 4];
    const ins = coachInsights(s);
    expect(ins.length).toBeGreaterThan(1);
    for (let i = 1; i < ins.length; i++) expect(ins[i - 1].severity).toBeGreaterThanOrEqual(ins[i].severity);
  });
});
