import { describe, it, expect, beforeEach } from "vitest";
import { useRagStore } from "../ragStore";
import { captureSnapshot } from "./eventsSlice";

const S = () => useRagStore.getState();

beforeEach(() => {
  useRagStore.setState({ events: [], scrubSeq: null });
});

describe("eventsSlice", () => {
  it("assigns dense ascending seq numbers", () => {
    const snap = captureSnapshot(S());
    S().recordEvent({ t: 1, runId: 1, kind: "run-start", runKind: "ingestion", stage: null, snapshot: snap });
    S().recordEvent({ t: 2, runId: 1, kind: "stage-done", runKind: "ingestion", stage: "upload", snapshot: snap });
    expect(S().events.map(e => e.seq)).toEqual([0, 1]);
  });

  it("clearEvents drops the log and returns to live", () => {
    const snap = captureSnapshot(S());
    S().recordEvent({ t: 1, runId: 1, kind: "run-start", runKind: "ingestion", stage: null, snapshot: snap });
    S().setScrub(0);
    S().clearEvents();
    expect(S().events).toEqual([]);
    expect(S().scrubSeq).toBeNull();
  });

  it("captureSnapshot stores POINTERS, never copies (memory stays flat)", () => {
    const s = S();
    const snap = captureSnapshot(s);
    expect(snap.chunks).toBe(s.chunks);
    expect(snap.embeddings).toBe(s.embeddings);
    expect(snap.candidates).toBe(s.candidates);
    expect(snap.promptBlocks).toBe(s.promptBlocks);
    expect(snap.stages).toBe(s.stages);
  });
});
