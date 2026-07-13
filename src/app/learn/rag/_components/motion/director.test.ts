import { describe, it, expect } from "vitest";
import { computeFly } from "./director";

/* Camera math is pure: the target node ends centered in the viewport. */

describe("computeFly", () => {
  it("centers the node in the viewport at the requested scale", () => {
    const t = computeFly(1000, 600, { x: 100, y: 50, w: 200, h: 100 }, 1.5);
    // node center (200, 100) scaled by 1.5 → (300, 150); viewport center (500, 300)
    expect(t.x).toBe(500 - 300);
    expect(t.y).toBe(300 - 150);
    expect(t.scale).toBe(1.5);
  });

  it("scale 1 with a centered node is the identity", () => {
    const t = computeFly(800, 400, { x: 350, y: 150, w: 100, h: 100 }, 1);
    expect(t.x).toBe(0);
    expect(t.y).toBe(0);
  });
});
