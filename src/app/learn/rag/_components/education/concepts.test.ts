import { describe, it, expect } from "vitest";
import {
  CONCEPTS, CONCEPT_IDS, STAGE_CONCEPT, PARAM_CONCEPT, EXPERIMENT_LABELS, CONFIDENCE_LABELS,
} from "./concepts";
import { STAGE_IDS, DEFAULT_PARAMS } from "../ragStore";

/* CI enforcement of architecture §A6: the education layer cannot silently
   rot. A stage, parameter, or cross-reference without a concept FAILS THE
   BUILD — education-first as a guarantee, not a review hope. */

describe("concept registry completeness", () => {
  it("every pipeline stage maps to an existing concept", () => {
    for (const stage of STAGE_IDS) {
      const cid = STAGE_CONCEPT[stage];
      expect(cid, `stage "${stage}" has no lead concept`).toBeTruthy();
      expect(CONCEPTS[cid], `stage "${stage}" maps to missing concept "${cid}"`).toBeDefined();
    }
  });

  it("every tunable parameter maps to an existing concept", () => {
    for (const key of Object.keys(DEFAULT_PARAMS) as (keyof typeof DEFAULT_PARAMS)[]) {
      const cid = PARAM_CONCEPT[key];
      expect(cid, `param "${key}" has no lead concept`).toBeTruthy();
      expect(CONCEPTS[cid], `param "${key}" maps to missing concept "${cid}"`).toBeDefined();
    }
  });

  it("every concept carries all ten required fields, non-empty", () => {
    for (const id of CONCEPT_IDS) {
      const c = CONCEPTS[id];
      expect(c.id).toBe(id);
      expect(c.term.trim().length, `${id}.term is empty`).toBeGreaterThan(2);
      for (const field of ["technical", "plain", "analogy", "why",
        "misconfigured", "retrievalImpact", "hallucinationImpact"] as const) {
        expect(c[field].trim().length, `${id}.${field} is too thin to teach anything`).toBeGreaterThan(30);
      }
      expect(Array.isArray(c.params), `${id}.params missing`).toBe(true);
      expect(Array.isArray(c.related), `${id}.related missing`).toBe(true);
      expect(Array.isArray(c.experiments), `${id}.experiments missing`).toBe(true);
    }
  });

  it("all cross-references resolve (related concepts, params, experiments)", () => {
    const paramKeys = new Set(Object.keys(DEFAULT_PARAMS));
    for (const id of CONCEPT_IDS) {
      const c = CONCEPTS[id];
      for (const r of c.related) {
        expect(CONCEPTS[r], `${id}.related → missing concept "${r}"`).toBeDefined();
        expect(r, `${id} lists itself as related`).not.toBe(id);
      }
      for (const p of c.params) {
        expect(paramKeys.has(p), `${id}.params → unknown param "${p}"`).toBe(true);
      }
      for (const e of c.experiments) {
        expect(EXPERIMENT_LABELS[e], `${id}.experiments → unknown experiment "${e}"`).toBeDefined();
      }
    }
  });

  it("optional enrichment fields, when present, are substantial and well-formed", () => {
    for (const id of CONCEPT_IDS) {
      const c = CONCEPTS[id];
      if (c.history !== undefined) {
        expect(c.history.trim().length, `${id}.history is too thin to teach anything`).toBeGreaterThan(60);
      }
      if (c.tryThis !== undefined) {
        expect(c.tryThis.trim().length, `${id}.tryThis is too thin to act on`).toBeGreaterThan(60);
      }
      if (c.visual !== undefined) {
        expect(c.visual.glyph.trim().length, `${id}.visual.glyph is empty`).toBeGreaterThan(0);
        expect(c.visual.hue, `${id}.visual.hue must be #rrggbb`).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
      if (c.confidence !== undefined) {
        expect(CONFIDENCE_LABELS[c.confidence], `${id}.confidence has no label`).toBeDefined();
      }
    }
  });

  it("every parameter-bearing concept is reachable from its parameters (adjust-it links work)", () => {
    for (const [key, cid] of Object.entries(PARAM_CONCEPT)) {
      expect(
        CONCEPTS[cid].params.includes(key as keyof typeof DEFAULT_PARAMS),
        `concept "${cid}" is the lead for param "${key}" but doesn't list it in params`,
      ).toBe(true);
    }
  });
});
