import { describe, it, expect } from "vitest";
import { GRAMMAR, GRAMMAR_TOKENS, nodeMotion } from "./grammar";

/* The grammar is a contract: every token documents its motion, meaning,
   real-data binding, and reduced-motion variant. An animation without a
   citation here doesn't ship. */

describe("motion grammar", () => {
  it("defines all nine tokens with meaning, data binding, and reduced variant", () => {
    expect(GRAMMAR_TOKENS).toHaveLength(9);
    for (const token of GRAMMAR_TOKENS) {
      const g = GRAMMAR[token];
      expect(g.motion.length, `${token}.motion`).toBeGreaterThan(5);
      expect(g.teaches.length, `${token}.teaches`).toBeGreaterThan(5);
      expect(g.boundTo.length, `${token}.boundTo`).toBeGreaterThan(5);
      expect(g.reduced.length, `${token}.reduced`).toBeGreaterThan(5);
    }
  });

  it("nodeMotion: settle fires on done, shake on error, recede dims", () => {
    expect(nodeMotion("done", false, false).scale).toEqual([1.04, 1]);
    expect(nodeMotion("error", false, false).x).toEqual([0, -2, 2, -2, 2, 0]);
    expect(nodeMotion("running", true, false).opacity).toBe(0.45);
    expect(nodeMotion("idle", false, false).opacity).toBe(1);
  });

  it("nodeMotion reduced variant carries state without keyframes", () => {
    const m = nodeMotion("done", false, true);
    expect(m.scale).toBeUndefined();
    expect(m.x).toBeUndefined();
    expect(m.opacity).toBe(1);
    expect(nodeMotion("error", true, true).opacity).toBe(0.45);
  });
});
