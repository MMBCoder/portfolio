import { describe, it, expect } from "vitest";
import { PIPELINE_EDGES, planPackets, MAX_PACKETS } from "./PacketSystem";
import { STAGE_IDS, type RagStore, type StageId, type StageState } from "../ragStore";

/* Packet scheduling is pure: a burst fires exactly on the target stage's
   idle→running transition with its source done, and packet counts bind
   to REAL artifact counts (visually batched above MAX_PACKETS). */

const stages = (over: Partial<Record<StageId, StageState["status"]>> = {}) =>
  Object.fromEntries(
    STAGE_IDS.map(id => [id, { status: over[id] ?? "idle" }]),
  ) as Record<StageId, StageState>;

const state = (over: Partial<RagStore>): RagStore =>
  ({
    stages: stages(), pages: [], cleanedPages: [], chunks: [], embeddings: [],
    candidates: [], results: [], answerSentences: [], params: { topK: 4 },
    ...over,
  } as unknown as RagStore);

const edge = (id: string) => {
  const e = PIPELINE_EDGES.find(e => e.id === id);
  if (!e) throw new Error(`no edge ${id}`);
  return e;
};

describe("planPackets", () => {
  it("fires exactly on the target's idle→running transition with the source done", () => {
    const prev = state({ stages: stages({ chunk: "done" }) });
    const next = state({
      stages: stages({ chunk: "done", tokenize: "running" }),
      chunks: new Array(23).fill({}) as RagStore["chunks"],
    });
    const plan = planPackets(edge("chunk-tokenize"), prev, next);
    expect(plan).not.toBeNull();
    expect(plan!.count).toBe(23);       // 23 chunks → 23 packets, honestly
    expect(plan!.batched).toBe(false);
  });

  it("does not fire while the target keeps running (no re-trigger)", () => {
    const running = state({ stages: stages({ chunk: "done", tokenize: "running" }) });
    expect(planPackets(edge("chunk-tokenize"), running, running)).toBeNull();
  });

  it("does not fire when the source stage is not done", () => {
    const prev = state({});
    const next = state({ stages: stages({ tokenize: "running" }) });
    expect(planPackets(edge("chunk-tokenize"), prev, next)).toBeNull();
  });

  it("batches visually above MAX_PACKETS while keeping the real count", () => {
    const prev = state({ stages: stages({ tokenize: "done" }) });
    const next = state({
      stages: stages({ tokenize: "done", embed: "running" }),
      chunks: new Array(150).fill({}) as RagStore["chunks"],
    });
    const plan = planPackets(edge("tokenize-embed"), prev, next);
    expect(plan!.count).toBe(MAX_PACKETS);
    expect(plan!.real).toBe(150);
    expect(plan!.batched).toBe(true);
  });

  it("single-item edges carry exactly one packet (the prompt, the question)", () => {
    const prev = state({ stages: stages({ prompt: "done" }) });
    const next = state({ stages: stages({ prompt: "done", generate: "running" }) });
    const plan = planPackets(edge("prompt-generate"), prev, next);
    expect(plan!.count).toBe(1);
  });

  it("covers every stage-to-stage transition in the pipeline", () => {
    // 6 ingestion links + index→query bridge + 6 query links
    expect(PIPELINE_EDGES).toHaveLength(13);
    for (let i = 0; i < STAGE_IDS.length - 1; i++) {
      const found = PIPELINE_EDGES.some(
        e => e.from === STAGE_IDS[i] && e.to === STAGE_IDS[i + 1],
      );
      expect(found, `no edge ${STAGE_IDS[i]} → ${STAGE_IDS[i + 1]}`).toBe(true);
    }
  });
});
