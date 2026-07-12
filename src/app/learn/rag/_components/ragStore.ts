"use client";

import { create } from "zustand";

/* ────────────────────────── types ────────────────────────── */

export type StageId =
  | "upload" | "parse" | "clean" | "chunk" | "tokenize" | "embed" | "index"
  | "query" | "retrieve" | "rerank" | "prompt" | "generate" | "ground" | "evaluate";

export type StageStatus = "idle" | "running" | "done" | "error" | "stale";

export interface StageState {
  status: StageStatus;
  ms?: number;          // processing time
  note?: string;        // one-line result summary shown on the node
  error?: string;
}

export interface PageText { page: number; text: string; }

export interface Chunk {
  id: number;
  text: string;
  page: number;         // page the chunk starts on
  start: number;        // char offset in cleaned doc
  chars: number;
  tokens: number;       // approximate
  overlapChars: number; // chars carried from previous chunk
}

export interface Candidate {
  chunkId: number;
  semantic: number;     // cosine similarity 0..1
  keyword: number;      // normalised BM25 0..1
  hybrid: number;       // blended score 0..1
  rank: number;         // rank by hybrid (1-based)
  rerankScore?: number; // LLM re-rank score 0..100
  rerankRank?: number;
}

export interface PromptBlock {
  label: "System Prompt" | "Retrieved Context" | "User Question";
  text: string;
  tokens: number;
  color: string;
}

export interface AnswerSentence { text: string; citations: number[]; }

export interface EvalScores {
  faithfulness: number;
  answerRelevance: number;
  contextPrecision: number;
  contextRecall: number;
  hallucinationRisk: number;
  verdict: string;
}

export interface RagParams {
  chunkSize: number;       // target chars per chunk
  chunkOverlap: number;    // chars
  topK: number;
  threshold: number;       // min hybrid score 0..1
  hybridAlpha: number;     // 1 = pure semantic, 0 = pure keyword
  useRerank: boolean;
  temperature: number;
  maxTokens: number;
  contextBudget: number;   // token budget for retrieved context
  systemPrompt: string;
}

export interface Usage {
  embedTokens: number;
  promptTokens: number;
  completionTokens: number;
  costUSD: number;
}

export interface PlayState {
  active: boolean;
  paused: boolean;
  step: number;          // index into the play script
  totalSteps: number;
  speed: 0.5 | 1 | 2;
  stepMode: boolean;
  narration: string;
}

/* ────────────────────────── defaults ────────────────────────── */

export const DEFAULT_SYSTEM_PROMPT =
  `You are a precise assistant that answers ONLY from the provided context.
Cite every claim with the chunk number in square brackets, e.g. [2].
If the context does not contain the answer, say so plainly. Never invent facts.`;

export const DEFAULT_PARAMS: RagParams = {
  chunkSize: 600,
  chunkOverlap: 80,
  topK: 4,
  threshold: 0.25,
  hybridAlpha: 0.7,
  useRerank: true,
  temperature: 1,
  maxTokens: 600,
  contextBudget: 2000,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
};

export const STAGE_IDS: StageId[] = [
  "upload", "parse", "clean", "chunk", "tokenize", "embed", "index",
  "query", "retrieve", "rerank", "prompt", "generate", "ground", "evaluate",
];

const idleStages = (): Record<StageId, StageState> =>
  Object.fromEntries(STAGE_IDS.map(id => [id, { status: "idle" as StageStatus }])) as Record<StageId, StageState>;

/* ────────────────────────── store ────────────────────────── */

export interface RagStore {
  /* document artifacts */
  docName: string | null;
  docBytes: number;
  isSample: boolean;
  pdfData: ArrayBuffer | null;     // for preview rendering
  pages: PageText[];
  cleanStats: { before: number; after: number; joinedLines: number; fixedHyphens: number } | null;
  cleanedPages: PageText[];
  chunks: Chunk[];
  embeddings: number[][];          // parallel to chunks
  coords3: [number, number, number][]; // PCA projection, parallel to chunks

  /* query artifacts */
  query: string;
  queryVec: number[] | null;
  candidates: Candidate[];         // all chunks scored, sorted by hybrid
  results: number[];               // chunkIds actually sent to the LLM (post rerank/threshold/topK)
  promptBlocks: PromptBlock[];
  answer: string | null;
  answerSentences: AnswerSentence[];
  evalScores: EvalScores | null;

  /* bookkeeping */
  stages: Record<StageId, StageState>;
  params: RagParams;
  usage: Usage;
  runId: number;                   // bumped to cancel in-flight runs
  ingested: boolean;               // pipeline ready for questions
  chunksStale: boolean;            // chunk params changed after embedding

  /* ui */
  selected: StageId | null;
  hoverChunk: number | null;       // chunkId hovered anywhere (grounding sync)
  inspectorChunk: number | null;   // chunk pinned in tokenize view
  play: PlayState;

  /* actions */
  setStage: (id: StageId, patch: Partial<StageState>) => void;
  resetStagesFrom: (id: StageId) => void;
  setParam: <K extends keyof RagParams>(key: K, value: RagParams[K]) => void;
  select: (id: StageId | null) => void;
  setHoverChunk: (id: number | null) => void;
  patch: (p: Partial<RagStore>) => void;
  addUsage: (u: Partial<Usage>) => void;
  bumpRun: () => number;
  resetAll: () => void;
  resetQuery: () => void;
}

const initialData = {
  docName: null, docBytes: 0, isSample: false, pdfData: null,
  pages: [], cleanStats: null, cleanedPages: [], chunks: [],
  embeddings: [], coords3: [],
  query: "", queryVec: null, candidates: [], results: [],
  promptBlocks: [], answer: null, answerSentences: [], evalScores: null,
  stages: idleStages(),
  usage: { embedTokens: 0, promptTokens: 0, completionTokens: 0, costUSD: 0 },
  ingested: false, chunksStale: false,
  selected: null as StageId | null, hoverChunk: null, inspectorChunk: null,
};

export const useRagStore = create<RagStore>((set, get) => ({
  ...initialData,
  params: { ...DEFAULT_PARAMS },
  runId: 0,
  play: { active: false, paused: false, step: 0, totalSteps: 0, speed: 1, stepMode: false, narration: "" },

  setStage: (id, patch) =>
    set(s => ({ stages: { ...s.stages, [id]: { ...s.stages[id], ...patch } } })),

  resetStagesFrom: (id) => {
    const idx = STAGE_IDS.indexOf(id);
    set(s => {
      const stages = { ...s.stages };
      STAGE_IDS.slice(idx).forEach(sid => { stages[sid] = { status: "idle" }; });
      return { stages };
    });
  },

  setParam: (key, value) => set(s => ({ params: { ...s.params, [key]: value } })),
  select: (id) => set({ selected: id }),
  setHoverChunk: (id) => set({ hoverChunk: id }),
  patch: (p) => set(p),

  addUsage: (u) => set(s => ({
    usage: {
      embedTokens: s.usage.embedTokens + (u.embedTokens ?? 0),
      promptTokens: s.usage.promptTokens + (u.promptTokens ?? 0),
      completionTokens: s.usage.completionTokens + (u.completionTokens ?? 0),
      costUSD: s.usage.costUSD + (u.costUSD ?? 0),
    },
  })),

  bumpRun: () => { const id = get().runId + 1; set({ runId: id }); return id; },

  resetAll: () => set({ ...initialData, stages: idleStages(), runId: get().runId + 1 }),

  resetQuery: () => set(s => {
    const stages = { ...s.stages };
    (["query", "retrieve", "rerank", "prompt", "generate", "ground", "evaluate"] as StageId[])
      .forEach(id => { stages[id] = { status: "idle" }; });
    return {
      stages, queryVec: null, candidates: [], results: [],
      promptBlocks: [], answer: null, answerSentences: [], evalScores: null,
    };
  }),
}));

/* pricing estimates (USD per 1M tokens) — displayed as estimates in the UI */
export const PRICING = {
  embedInput: 0.02,          // text-embedding-3-small
  genInput: 0.25,            // gpt-5-mini input
  genOutput: 2.0,            // gpt-5-mini output
};
