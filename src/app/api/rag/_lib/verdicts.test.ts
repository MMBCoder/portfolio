import { describe, it, expect } from "vitest";
import { parseSentenceVerdicts } from "./verdicts";

/* Malformed judge output must degrade to doc-level scores — never to a
   wrong per-sentence claim. */

describe("parseSentenceVerdicts", () => {
  it("parses a well-formed verdict array", () => {
    const out = parseSentenceVerdicts(
      [
        { support: "supported", evidence: [1, 3] },
        { support: "partial", evidence: [2] },
        { support: "unsupported", evidence: [] },
      ],
      3,
    );
    expect(out).toEqual([
      { support: "supported", evidence: [1, 3] },
      { support: "partial", evidence: [2] },
      { support: "unsupported", evidence: [] },
    ]);
  });

  it("rejects unknown support levels entirely (no partial trust)", () => {
    expect(parseSentenceVerdicts(
      [{ support: "supported", evidence: [1] }, { support: "maybe", evidence: [] }], 2,
    )).toBeNull();
  });

  it("rejects arrays shorter than the sentence count", () => {
    expect(parseSentenceVerdicts([{ support: "supported", evidence: [] }], 2)).toBeNull();
  });

  it("rejects non-arrays, junk entries, and zero sentences", () => {
    expect(parseSentenceVerdicts("nope", 1)).toBeNull();
    expect(parseSentenceVerdicts([null], 1)).toBeNull();
    expect(parseSentenceVerdicts([{ support: 42 }], 1)).toBeNull();
    expect(parseSentenceVerdicts([], 0)).toBeNull();
  });

  it("sanitises evidence to non-negative integers", () => {
    const out = parseSentenceVerdicts(
      [{ support: "supported", evidence: [2, "x", -1, 3.5, 7] }], 1,
    );
    expect(out).toEqual([{ support: "supported", evidence: [2, 7] }]);
  });

  it("ignores extra entries beyond the sentence count", () => {
    const out = parseSentenceVerdicts(
      [{ support: "supported", evidence: [] }, { support: "partial", evidence: [] }], 1,
    );
    expect(out).toHaveLength(1);
  });
});
