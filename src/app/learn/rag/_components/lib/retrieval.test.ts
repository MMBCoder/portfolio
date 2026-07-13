import { describe, it, expect } from "vitest";
import { cosine, keywordScores, scoreCandidates, pca3, projectQuery } from "./retrieval";
import type { Chunk } from "../ragStore";

const mkChunk = (id: number, text: string): Chunk => ({
  id, text, page: 1, start: 0, chars: text.length, tokens: 10, overlapChars: 0,
});

describe("cosine", () => {
  it("is 1 for identical vectors", () => {
    expect(cosine([1, 2, 3], [1, 2, 3])).toBeCloseTo(1, 6);
  });

  it("is 0 for orthogonal vectors", () => {
    expect(cosine([1, 0], [0, 1])).toBeCloseTo(0, 6);
  });

  it("is -1 for opposite vectors", () => {
    expect(cosine([1, 1], [-1, -1])).toBeCloseTo(-1, 6);
  });

  it("guards against zero vectors instead of dividing by zero", () => {
    expect(cosine([0, 0], [0, 0])).toBe(0);
  });
});

describe("keywordScores", () => {
  const chunks = [
    mkChunk(1, "The Voyager card includes airport lounge access and travel insurance."),
    mkChunk(2, "Interest rates are calculated monthly on the outstanding balance."),
    mkChunk(3, "Travel benefits include lounge access, travel insurance and no foreign fees."),
  ];

  it("scores chunks containing query terms above chunks without them", () => {
    const scores = keywordScores("travel lounge insurance", chunks);
    expect(scores[0]).toBeGreaterThan(scores[1]);
    expect(scores[2]).toBeGreaterThan(scores[1]);
  });

  it("gives zero when no query term matches", () => {
    const scores = keywordScores("quantum entanglement", chunks);
    expect(scores.every(s => s === 0)).toBe(true);
  });

  it("ignores stopwords entirely", () => {
    const scores = keywordScores("the and of to", chunks);
    expect(scores.every(s => s === 0)).toBe(true);
  });
});

describe("scoreCandidates", () => {
  const chunks = [mkChunk(1, "alpha beta"), mkChunk(2, "gamma delta"), mkChunk(3, "epsilon zeta")];
  const embeddings = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

  it("orders purely by semantic similarity when alpha = 1", () => {
    const cands = scoreCandidates([0.9, 0.1, 0], "unrelated", chunks, embeddings, 1);
    expect(cands[0].chunkId).toBe(1);
    expect(cands.map(c => c.rank)).toEqual([1, 2, 3]);
  });

  it("lets keyword matches win when alpha = 0", () => {
    const cands = scoreCandidates([0, 0, 1], "gamma delta", chunks, embeddings, 0);
    expect(cands[0].chunkId).toBe(2);
  });

  it("keeps raw semantic score alongside normalised hybrid", () => {
    const cands = scoreCandidates([1, 0, 0], "alpha", chunks, embeddings, 0.7);
    const c1 = cands.find(c => c.chunkId === 1)!;
    expect(c1.semantic).toBeCloseTo(1, 6);
    for (const c of cands) {
      expect(c.hybrid).toBeGreaterThanOrEqual(0);
      expect(c.hybrid).toBeLessThanOrEqual(1 + 1e-9);
    }
  });

  it("assigns dense ranks 1..n sorted by hybrid descending", () => {
    const cands = scoreCandidates([0.2, 0.9, 0.4], "epsilon", chunks, embeddings, 0.5);
    const sorted = [...cands].sort((a, b) => b.hybrid - a.hybrid);
    expect(cands).toEqual(sorted);
    expect(cands.map(c => c.rank)).toEqual([1, 2, 3]);
  });
});

describe("pca3", () => {
  it("returns [] for no vectors", () => {
    expect(pca3([])).toEqual([]);
  });

  it("returns one coordinate triple per vector, inside the unit cube", () => {
    const vecs = Array.from({ length: 20 }, (_, i) =>
      Array.from({ length: 8 }, (_, j) => Math.sin(i * 1.7 + j * 0.9)),
    );
    const coords = pca3(vecs);
    expect(coords).toHaveLength(20);
    for (const [x, y, z] of coords) {
      expect(Math.abs(x)).toBeLessThanOrEqual(1 + 1e-9);
      expect(Math.abs(y)).toBeLessThanOrEqual(1 + 1e-9);
      expect(Math.abs(z)).toBeLessThanOrEqual(1 + 1e-9);
    }
  });

  it("is deterministic for the same input", () => {
    const vecs = Array.from({ length: 10 }, (_, i) =>
      Array.from({ length: 6 }, (_, j) => ((i * 31 + j * 17) % 13) / 13),
    );
    expect(pca3(vecs)).toEqual(pca3(vecs));
  });

  it("separates well-separated clusters on the first axis", () => {
    const clusterA = Array.from({ length: 10 }, () => [10, 0, 0, 0].map(x => x + Math.random() * 0.01));
    const clusterB = Array.from({ length: 10 }, () => [-10, 0, 0, 0].map(x => x + Math.random() * 0.01));
    const coords = pca3([...clusterA, ...clusterB]);
    const aX = coords.slice(0, 10).map(c => c[0]);
    const bX = coords.slice(10).map(c => c[0]);
    const aMean = aX.reduce((s, x) => s + x, 0) / 10;
    const bMean = bX.reduce((s, x) => s + x, 0) / 10;
    expect(Math.abs(aMean - bMean)).toBeGreaterThan(1); // opposite ends of the cube
  });
});

describe("projectQuery", () => {
  it("lands nearest to the coordinate of the most similar embedding", () => {
    const embeddings = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0]];
    const coords: [number, number, number][] = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
    const pos = projectQuery([1, 0.05, 0], embeddings, coords);
    const dists = coords.map(c =>
      Math.hypot(pos[0] - c[0], pos[1] - c[1], pos[2] - c[2]),
    );
    expect(dists.indexOf(Math.min(...dists))).toBe(0);
  });
});
