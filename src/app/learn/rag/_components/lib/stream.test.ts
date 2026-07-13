import { describe, it, expect } from "vitest";
import { NdjsonParser, citationsInText } from "./stream";

/* The parser must survive frames split ANYWHERE by the network. */

describe("NdjsonParser", () => {
  it("parses complete frames", () => {
    const p = new NdjsonParser();
    const frames = p.push('{"delta":"Hello"}\n{"delta":" world"}\n');
    expect(frames).toEqual([{ delta: "Hello" }, { delta: " world" }]);
  });

  it("reassembles frames split across chunks — even mid-token", () => {
    const p = new NdjsonParser();
    expect(p.push('{"del')).toEqual([]);
    expect(p.push('ta":"Hel')).toEqual([]);
    expect(p.push('lo"}\n{"done":true,"promptTokens":5,')).toEqual([{ delta: "Hello" }]);
    expect(p.push('"completionTokens":9}\n')).toEqual([{ done: true, promptTokens: 5, completionTokens: 9 }]);
  });

  it("ignores blank lines and reports malformed frames as errors", () => {
    const p = new NdjsonParser();
    const frames = p.push('\n\n{"delta":"x"}\nnot-json\n');
    expect(frames[0]).toEqual({ delta: "x" });
    expect(frames[1]).toEqual({ error: "malformed stream frame" });
  });
});

describe("citationsInText (evidence-selection act)", () => {
  it("returns chunk ids in FIRST-appearance order, deduplicated", () => {
    expect(citationsInText("Claim A [3]. Claim B [1] and again [3], then [2].")).toEqual([3, 1, 2]);
  });

  it("handles streams with no citations yet", () => {
    expect(citationsInText("The answer is being writ")).toEqual([]);
  });

  it("detects a marker the moment it completes", () => {
    expect(citationsInText("lounge access [")).toEqual([]);
    expect(citationsInText("lounge access [1")).toEqual([]);
    expect(citationsInText("lounge access [1]")).toEqual([1]);
  });
});
