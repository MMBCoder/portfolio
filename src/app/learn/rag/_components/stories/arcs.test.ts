import { describe, it, expect } from "vitest";
import { BEATS, BEAT_BY_STAGE, beatIntro, beatPayoff } from "./arcs";
import { CONCEPTS, STAGE_CONCEPT } from "../education/concepts";
import { GRAMMAR } from "../motion/grammar";
import { STAGE_IDS, type RagStore, type Chunk } from "../ragStore";

/* Story beats must reference real stages and concepts, quote the
   registry VERBATIM (one registry, five readings), and payoffs must
   quote only real numbers from the store. */

const fixture = (): RagStore =>
  ({
    docName: "guide.pdf", docBytes: 2048, isSample: false,
    pages: [{ page: 1, text: "a" }, { page: 2, text: "b" }],
    cleanStats: { before: 100, after: 90, joinedLines: 7, fixedHyphens: 2 },
    chunks: new Array(23).fill(0).map((_, i) => ({ id: i, chars: 400, tokens: 100 })) as Chunk[],
    embeddings: new Array(23).fill([0.1, 0.2, 0.3]),
    query: "What is the annual fee?",
    queryVec: [0.1, 0.2, 0.3],
    candidates: new Array(23).fill({ hybrid: 0.5 }),
    results: [3, 7, 9],
    promptBlocks: [{ label: "System Prompt", tokens: 60 }, { label: "Retrieved Context", tokens: 300 }, { label: "User Question", tokens: 40 }],
    answer: "The annual fee is $95 [3].",
    answerSentences: [{ text: "The annual fee is $95 [3].", citations: [3] }, { text: "It is waived in year one.", citations: [] }],
    evalScores: { faithfulness: 92, answerRelevance: 88, contextPrecision: 75, contextRecall: 80, hallucinationRisk: 8, verdict: "ok" },
    stages: Object.fromEntries(STAGE_IDS.map(id => [id, { status: "done", ms: 500, note: "8 rescored · 2 moved" }])),
  } as unknown as RagStore);

describe("narrative arcs", () => {
  it("covers all 14 stages in pipeline order — arc 1 ingestion, arc 2 query", () => {
    expect(BEATS.map(b => b.stage)).toEqual([...STAGE_IDS]);
    expect(BEATS.filter(b => b.arc === 1)).toHaveLength(7);
    expect(BEATS.filter(b => b.arc === 2)).toHaveLength(7);
  });

  it("every beat cites only real grammar tokens", () => {
    for (const b of BEATS) {
      expect(b.tokens.length, `${b.stage} cites no grammar`).toBeGreaterThan(0);
      for (const t of b.tokens) expect(GRAMMAR[t], `${b.stage} cites unknown token ${t}`).toBeDefined();
    }
  });

  it("intros quote the Concept Registry verbatim, voiced per persona", () => {
    for (const stage of STAGE_IDS) {
      const c = CONCEPTS[STAGE_CONCEPT[stage]];
      expect(beatIntro(stage, "analogy")).toContain(c.analogy);
      expect(beatIntro(stage, "technical")).toContain(c.technical);
      expect(beatIntro(stage, "business")).toContain(c.plain);
      expect(beatIntro(stage, "analogy")).toContain(c.term);
    }
  });

  it("payoffs quote the REAL numbers from the store", () => {
    const s = fixture();
    expect(beatPayoff("parse", s)).toContain("2 page");
    expect(beatPayoff("clean", s)).toContain("7 broken lines");
    expect(beatPayoff("chunk", s)).toContain("23 chunks");
    expect(beatPayoff("embed", s)).toContain("23 vectors");
    expect(beatPayoff("query", s)).toContain("annual fee");
    expect(beatPayoff("retrieve", s)).toContain("3 of 23");
    expect(beatPayoff("prompt", s)).toContain("400 tokens");
    expect(beatPayoff("ground", s)).toContain("1 of 2 sentences");
    expect(beatPayoff("evaluate", s)).toContain("faithfulness 92");
    expect(beatPayoff("evaluate", s)).toContain("not ground truth");
  });

  it("rerank payoff is honest about being skipped", () => {
    const s = fixture();
    s.stages.rerank = { status: "done", ms: 10, note: "skipped (disabled)" } as RagStore["stages"]["rerank"];
    expect(beatPayoff("rerank", s)).toContain("skipped (disabled)");
  });

  it("BEAT_BY_STAGE resolves every stage", () => {
    for (const id of STAGE_IDS) expect(BEAT_BY_STAGE[id].stage).toBe(id);
  });
});
