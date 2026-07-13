import { describe, it, expect } from "vitest";
import { OBJECTIVES, FEATURE_OBJECTIVES, SCREEN_ANSWERS } from "./objectives";

/* Every feature must justify its existence pedagogically; every screen
   must answer the four museum questions. CI-enforced. */

const FEATURE_IDS = [
  "pipeline-canvas", "inspector", "play-mode", "timeline", "universe",
  "detective", "brain", "prompt-mri", "context-window", "cost-meter",
  "playground", "lab", "coach", "radar", "chunk-story", "heatmap",
  "presentation", "journey", "sound",
] as const;

describe("educational objectives coverage", () => {
  it("every feature maps to at least one objective", () => {
    for (const f of FEATURE_IDS) {
      const objs = FEATURE_OBJECTIVES[f];
      expect(objs, `feature "${f}" has no objectives`).toBeDefined();
      expect(objs.length, `feature "${f}" has an empty objective list`).toBeGreaterThan(0);
    }
  });

  it("every referenced objective exists", () => {
    for (const [f, objs] of Object.entries(FEATURE_OBJECTIVES)) {
      for (const o of objs) {
        expect(OBJECTIVES[o], `feature "${f}" references missing objective "${o}"`).toBeDefined();
      }
    }
  });

  it("every objective is a learner-can statement answering ≥1 museum question", () => {
    for (const o of Object.values(OBJECTIVES)) {
      expect(o.statement).toMatch(/^(Learner|First-time learner)/);
      expect(o.answers.length).toBeGreaterThan(0);
    }
  });

  it("every registered screen answers all four museum questions", () => {
    for (const [screen, answers] of Object.entries(SCREEN_ANSWERS)) {
      for (const q of ["what", "why", "quality", "improve"] as const) {
        expect(
          answers[q]?.trim().length,
          `screen "${screen}" does not answer "${q}"`,
        ).toBeGreaterThan(15);
      }
    }
  });
});
