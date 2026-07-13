import { describe, it, expect } from "vitest";
import { composeConcept } from "./compose";
import { CONCEPTS } from "./concepts";

const c = CONCEPTS["chunking"];

describe("persona-voice composition", () => {
  it("student (analogy voice) leads with the analogy", () => {
    const out = composeConcept(c, "analogy");
    expect(out.lead).toBe(c.analogy);
    expect(out.sections.map(s => s.text)).toContain(c.plain);
    expect(out.sections.map(s => s.text)).toContain(c.why);
  });

  it("engineer (technical voice) leads with the technical definition", () => {
    const out = composeConcept(c, "technical");
    expect(out.lead).toBe(c.technical);
    expect(out.sections.map(s => s.text)).toContain(c.misconfigured);
  });

  it("researcher (statistical voice) surfaces both impact fields", () => {
    const out = composeConcept(c, "statistical");
    expect(out.lead).toBe(c.technical);
    const texts = out.sections.map(s => s.text);
    expect(texts).toContain(c.retrievalImpact);
    expect(texts).toContain(c.hallucinationImpact);
  });

  it("executive (business voice) leads plainly and puts risk first", () => {
    const out = composeConcept(c, "business");
    expect(out.lead).toBe(c.plain);
    expect(out.sections[0].text).toBe(c.hallucinationImpact);
  });

  it("presenter (narrative voice) pairs plain lead with the analogy", () => {
    const out = composeConcept(c, "narrative");
    expect(out.lead).toBe(c.plain);
    expect(out.sections.map(s => s.text)).toContain(c.analogy);
  });

  it("never invents text — every section quotes a registry field verbatim", () => {
    const fields = new Set(Object.values(c).filter((v): v is string => typeof v === "string"));
    for (const voice of ["analogy", "technical", "statistical", "business", "narrative"] as const) {
      const out = composeConcept(c, voice);
      expect(fields.has(out.lead)).toBe(true);
      for (const s of out.sections) expect(fields.has(s.text)).toBe(true);
    }
  });
});
