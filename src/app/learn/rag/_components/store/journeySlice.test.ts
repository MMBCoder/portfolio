// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { useRagStore } from "../ragStore";

const S = () => useRagStore.getState();

const freshJourney = {
  journeyHydrated: false,
  journeyCompleted: [] as never[],
  journeyCardDismissed: [] as never[],
  journeyOverride: null,
  journeyResetCount: 0,
  journeyGateOpened: [] as never[],
};

beforeEach(() => {
  localStorage.clear();
  useRagStore.setState({ ...freshJourney });
});

describe("journeySlice", () => {
  it("completed chapters persist across a reload (hydrateJourney)", () => {
    S().completeChapter("ingest");
    S().completeChapter("first-question");
    expect(S().journeyCompleted).toEqual(["ingest", "first-question"]);

    useRagStore.setState({ ...freshJourney });
    S().hydrateJourney();
    expect(S().journeyHydrated).toBe(true);
    expect(S().journeyCompleted).toEqual(["ingest", "first-question"]);
  });

  it("completeChapter is idempotent and preserves completion order", () => {
    S().completeChapter("ingest");
    S().completeChapter("ingest");
    S().completeChapter("open-node");
    expect(S().journeyCompleted).toEqual(["ingest", "open-node"]);
  });

  it("card dismissal persists; reopening clears it", () => {
    S().dismissChapterCard("ingest");
    useRagStore.setState({ ...freshJourney });
    S().hydrateJourney();
    expect(S().journeyCardDismissed).toContain("ingest");

    S().reopenChapterCard("ingest");
    expect(S().journeyCardDismissed).not.toContain("ingest");
  });

  it("the on/off override persists (journey toggleable for any persona)", () => {
    S().setJourneyOverride("on");
    useRagStore.setState({ ...freshJourney });
    S().hydrateJourney();
    expect(S().journeyOverride).toBe("on");
  });

  it("restartJourney wipes progress, dismissals, and open gates, and signals the tracker", () => {
    S().completeChapter("ingest");
    S().dismissChapterCard("first-question");
    S().openJourneyGate("tune-and-ask");
    const resets = S().journeyResetCount;

    S().restartJourney();
    expect(S().journeyCompleted).toEqual([]);
    expect(S().journeyCardDismissed).toEqual([]);
    expect(S().journeyGateOpened).toEqual([]);
    expect(S().journeyResetCount).toBe(resets + 1);

    // and the wipe is what persists
    useRagStore.setState({ ...freshJourney });
    S().hydrateJourney();
    expect(S().journeyCompleted).toEqual([]);
  });

  it("gate opens are session-only (never persisted)", () => {
    S().openJourneyGate("tune-and-ask");
    expect(S().journeyGateOpened).toEqual(["tune-and-ask"]);

    useRagStore.setState({ ...freshJourney });
    S().hydrateJourney();
    expect(S().journeyGateOpened).toEqual([]);
  });
});
