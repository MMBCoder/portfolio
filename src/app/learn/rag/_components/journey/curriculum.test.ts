import { describe, it, expect } from "vitest";
import {
  CHAPTERS, ACTIVE_CHAPTERS, advanceTrack, emptyTrack,
  type JourneyView, type JourneyTrack,
} from "./curriculum";
import { CONCEPTS } from "../education/concepts";
import { DEFAULT_PARAMS } from "../ragStore";

/* CI for the journey: chapters must reference real concepts and carry
   real teaching copy, and completion detection must fire ONLY on genuine
   action sequences — "clicked next" does not exist here. */

const idleView = (): JourneyView => ({
  ingested: false, answer: null, selected: null, playActive: false,
  detectiveTraced: false, labRuns: 0, comparedRuns: 0,
  params: { ...DEFAULT_PARAMS },
});

/** Run a sequence of views through the tracker. */
const run = (views: JourneyView[]): JourneyTrack =>
  views.reduce(advanceTrack, emptyTrack());

describe("curriculum integrity", () => {
  it("all eight chapters are active (lab + compare landed in M12)", () => {
    expect(ACTIVE_CHAPTERS.map(c => c.id)).toEqual([
      "ingest", "first-question", "open-node", "trace-source", "tune-and-ask", "break-it", "compare", "present",
    ]);
    expect(CHAPTERS.filter(c => !c.active)).toHaveLength(0);
  });

  it("every chapter references only real registry concepts", () => {
    for (const ch of CHAPTERS) {
      expect(ch.conceptIds.length, `${ch.id} has no concepts`).toBeGreaterThan(0);
      for (const cid of ch.conceptIds) {
        expect(CONCEPTS[cid], `${ch.id} references missing concept "${cid}"`).toBeDefined();
      }
    }
  });

  it("every chapter carries substantial teaching copy", () => {
    for (const ch of CHAPTERS) {
      expect(ch.title.trim().length, `${ch.id}.title empty`).toBeGreaterThan(2);
      expect(ch.goal.trim().length, `${ch.id}.goal too thin to teach`).toBeGreaterThan(60);
      expect(ch.hint.trim().length, `${ch.id}.hint not actionable`).toBeGreaterThan(30);
    }
  });

  it("every chapter completes on exactly its own signal", () => {
    const allOn = {
      ingested: true, answered: true, openedNode: true, tracedSource: true,
      ranExperiment: true, comparedConfigs: true,
      tunedParam: true, answeredAfterTune: true, playStarted: true,
    };
    for (const ch of CHAPTERS) expect(ch.isComplete(allOn), `${ch.id} should complete`).toBe(true);
  });
});

describe("signal tracker (event-detected completion)", () => {
  it("nothing latches on an idle pipeline", () => {
    const t = run([idleView(), idleView(), idleView()]);
    expect(Object.values(t.signals).every(v => v === false)).toBe(true);
  });

  it("ingested latches when ingestion completes and stays latched", () => {
    const t = run([idleView(), { ...idleView(), ingested: true }, idleView()]);
    expect(t.signals.ingested).toBe(true);
  });

  it("openedNode latches even from a transient selection", () => {
    const t = run([
      idleView(),
      { ...idleView(), selected: "chunk" },
      idleView(),                              // inspector closed again
    ]);
    expect(t.signals.openedNode).toBe(true);
  });

  it("answered latches on a grounded answer", () => {
    const t = run([idleView(), { ...idleView(), answer: "Grounded [1]." }]);
    expect(t.signals.answered).toBe(true);
    expect(t.signals.answeredAfterTune).toBe(false);   // no tune happened
  });

  it("tune-then-re-ask completes only in that order", () => {
    const tuned = { ...idleView(), params: { ...DEFAULT_PARAMS, topK: DEFAULT_PARAMS.topK + 2 } };

    // answer WITHOUT a prior tune → not complete
    const noTune = run([idleView(), { ...idleView(), answer: "A [1]." }]);
    expect(noTune.signals.answeredAfterTune).toBe(false);

    // tune, then a new answer → complete
    const ordered = run([
      { ...idleView(), answer: "A [1]." },      // first answer (chapter 2)
      { ...idleView(), answer: null },          // re-ask resets the answer
      { ...tuned, answer: null },               // user moves top-K
      { ...tuned, answer: "B [1][2]." },        // new answer arrives
    ]);
    expect(ordered.signals.tunedParam).toBe(true);
    expect(ordered.signals.answeredAfterTune).toBe(true);
  });

  it("re-asking after a tune counts even when the answer text is identical (null → answer transition)", () => {
    const tuned = { ...idleView(), params: { ...DEFAULT_PARAMS, threshold: DEFAULT_PARAMS.threshold + 0.1 } };
    const t = run([
      { ...idleView(), answer: "Same text." },
      { ...tuned, answer: "Same text." },       // tune latches; answer unchanged → no completion yet
      { ...tuned, answer: null },               // question re-sent
      { ...tuned, answer: "Same text." },       // deterministic answer returns
    ]);
    expect(t.signals.answeredAfterTune).toBe(true);
  });

  it("a tune arriving in the same tick as the answer does NOT count (strict ordering)", () => {
    const tuned = { ...idleView(), params: { ...DEFAULT_PARAMS, topK: DEFAULT_PARAMS.topK + 1 } };
    const t = run([idleView(), { ...tuned, answer: "A [1]." }]);
    expect(t.signals.tunedParam).toBe(true);
    expect(t.signals.answeredAfterTune).toBe(false);
  });

  it("unchanged params never register as a tune (no false positives)", () => {
    const t = run([idleView(), idleView(), { ...idleView(), answer: "A." }]);
    expect(t.signals.tunedParam).toBe(false);
  });

  it("playStarted latches when Play Mode launches", () => {
    const t = run([idleView(), { ...idleView(), playActive: true }, idleView()]);
    expect(t.signals.playStarted).toBe(true);
  });

  it("tracedSource latches when a detective walk reaches the source step", () => {
    const t = run([idleView(), { ...idleView(), detectiveTraced: true }, idleView()]);
    expect(t.signals.tracedSource).toBe(true);
  });

  it("chapter detectors map to their signals exactly", () => {
    const none = emptyTrack().signals;
    const only = (k: keyof typeof none) => ({ ...none, [k]: true });
    const byId = Object.fromEntries(ACTIVE_CHAPTERS.map(c => [c.id, c]));

    expect(byId["ingest"].isComplete(only("ingested"))).toBe(true);
    expect(byId["ingest"].isComplete(only("answered"))).toBe(false);
    expect(byId["first-question"].isComplete(only("answered"))).toBe(true);
    expect(byId["open-node"].isComplete(only("openedNode"))).toBe(true);
    expect(byId["trace-source"].isComplete(only("tracedSource"))).toBe(true);
    expect(byId["trace-source"].isComplete(only("openedNode"))).toBe(false);
    expect(byId["break-it"].isComplete(only("ranExperiment"))).toBe(true);
    expect(byId["compare"].isComplete(only("comparedConfigs"))).toBe(true);
    expect(byId["tune-and-ask"].isComplete(only("tunedParam"))).toBe(false);  // tuning alone isn't the lesson
    expect(byId["tune-and-ask"].isComplete(only("answeredAfterTune"))).toBe(true);
    expect(byId["present"].isComplete(only("playStarted"))).toBe(true);
  });
});
