// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { loadPersisted, savePersisted, clearPersisted } from "./persist";

beforeEach(() => localStorage.clear());

describe("persist", () => {
  it("round-trips a value under the same version", () => {
    savePersisted("costs", 1, { total: 0.42 });
    expect(loadPersisted("costs", 1, { total: 0 })).toEqual({ total: 0.42 });
  });

  it("returns the fallback when nothing is stored", () => {
    expect(loadPersisted("missing", 1, "fallback")).toBe("fallback");
  });

  it("discards data stored under a different version", () => {
    savePersisted("prefs", 1, { sound: true });
    expect(loadPersisted("prefs", 2, { sound: false })).toEqual({ sound: false });
  });

  it("survives corrupted storage content", () => {
    localStorage.setItem("rag-viz:broken", "{not json");
    expect(loadPersisted("broken", 1, 7)).toBe(7);
  });

  it("clearPersisted removes the key", () => {
    savePersisted("gone", 1, [1, 2, 3]);
    clearPersisted("gone");
    expect(loadPersisted("gone", 1, [] as number[])).toEqual([]);
  });
});
