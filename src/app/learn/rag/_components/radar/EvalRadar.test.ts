import { describe, it, expect } from "vitest";
import { radarPoints, radarAxes } from "./EvalRadar";

describe("radar geometry", () => {
  it("full scores trace the outer pentagon, zero scores collapse to the center", () => {
    const full = radarPoints([100, 100, 100, 100, 100], 50, 50, 40).split(" ");
    expect(full).toHaveLength(5);
    expect(full[0]).toBe("50.00,10.00");   // top vertex at cy − r

    const zero = radarPoints([0, 0, 0], 50, 50, 40).split(" ");
    for (const p of zero) expect(p).toBe("50.00,50.00");
  });

  it("clamps out-of-range values", () => {
    const pts = radarPoints([150, -20], 0, 0, 10).split(" ");
    expect(pts[0]).toBe("0.00,-10.00");   // clamped to 100
    expect(pts[1]).toBe("0.00,0.00");     // clamped to 0
  });

  it("axes plot hallucination risk INVERTED and say so in the label", () => {
    const axes = radarAxes({
      faithfulness: 90, answerRelevance: 80, contextPrecision: 70,
      contextRecall: 60, hallucinationRisk: 25, verdict: "",
    });
    const safety = axes.find(a => a.label.includes("100−risk"));
    expect(safety?.value).toBe(75);
  });
});
