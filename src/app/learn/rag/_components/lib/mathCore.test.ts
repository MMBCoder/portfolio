import { describe, it, expect } from "vitest";
import { pca3Flat, kmeansFlat, flatten, toCoords3 } from "./mathCore";
import { pca3 } from "./retrieval";

/* The worker must never mean different math: the flat core is pinned
   against the V1 implementation's behaviour within 1e-4 (roadmap
   acceptance) — in practice it mirrors it operation-for-operation. */

const rand = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

const mkVectors = (n: number, d: number, seed = 7): number[][] => {
  const r = rand(seed);
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: d }, (_, j) => Math.sin(i * 0.7 + j * 0.31) + r() * 0.2));
};

describe("pca3Flat parity", () => {
  it("matches the public pca3 exactly (same algorithm, flat storage)", () => {
    const vectors = mkVectors(40, 24);
    const viaCore = toCoords3(pca3Flat(flatten(vectors), 40, 24), 40);
    const viaPublic = pca3(vectors);
    for (let i = 0; i < 40; i++) {
      for (let c = 0; c < 3; c++) {
        expect(Math.abs(viaCore[i][c] - viaPublic[i][c])).toBeLessThan(1e-4);
      }
    }
  });

  it("outputs live in the [-1, 1] cube", () => {
    const out = pca3Flat(flatten(mkVectors(30, 16)), 30, 16);
    for (const v of out) expect(Math.abs(v)).toBeLessThanOrEqual(1 + 1e-9);
  });

  it("handles empty input", () => {
    expect(pca3Flat(new Float64Array(0), 0, 0)).toHaveLength(0);
  });

  it("separates two obvious clusters on the first axis", () => {
    const a = Array.from({ length: 10 }, () => [1, 1, 0, 0]);
    const b = Array.from({ length: 10 }, () => [0, 0, 1, 1]);
    const coords = toCoords3(pca3Flat(flatten([...a, ...b]), 20, 4), 20);
    const meanA = coords.slice(0, 10).reduce((s, c) => s + c[0], 0) / 10;
    const meanB = coords.slice(10).reduce((s, c) => s + c[0], 0) / 10;
    expect(Math.sign(meanA)).not.toBe(Math.sign(meanB));
  });
});

describe("kmeansFlat", () => {
  const twoBlobs = () => {
    const pts: number[] = [];
    for (let i = 0; i < 20; i++) pts.push(0.8 + (i % 5) * 0.01, 0.8, 0.8);
    for (let i = 0; i < 20; i++) pts.push(-0.8 - (i % 5) * 0.01, -0.8, -0.8);
    return new Float64Array(pts);
  };

  it("is deterministic — same input, same clusters, every run", () => {
    const a = kmeansFlat(twoBlobs(), 40, 2);
    const b = kmeansFlat(twoBlobs(), 40, 2);
    expect(Array.from(a.assign)).toEqual(Array.from(b.assign));
    expect(Array.from(a.centroids)).toEqual(Array.from(b.centroids));
  });

  it("separates two well-separated blobs", () => {
    const { assign } = kmeansFlat(twoBlobs(), 40, 2);
    const first = new Set(Array.from(assign.slice(0, 20)));
    const second = new Set(Array.from(assign.slice(20)));
    expect(first.size).toBe(1);
    expect(second.size).toBe(1);
    expect([...first][0]).not.toBe([...second][0]);
  });

  it("clamps k to n and survives k > n", () => {
    const { centroids } = kmeansFlat(new Float64Array([0, 0, 0]), 1, 6);
    expect(centroids).toHaveLength(3);
  });
});
