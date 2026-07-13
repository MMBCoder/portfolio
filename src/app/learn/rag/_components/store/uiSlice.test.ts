// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { useRagStore } from "../ragStore";

const S = () => useRagStore.getState();

beforeEach(() => {
  localStorage.clear();
  S().patch({});
  useRagStore.setState({
    persona: "student", personaChosen: false, uiHydrated: false,
    dismissedMoments: [], activeMoment: null, dockTab: "params", paramPulse: null,
  });
});

describe("uiSlice", () => {
  it("setPersona marks the choice and persists it", () => {
    S().setPersona("engineer");
    expect(S().persona).toBe("engineer");
    expect(S().personaChosen).toBe(true);

    // fresh hydrate (as on next visit) restores it
    useRagStore.setState({ persona: "student", personaChosen: false, uiHydrated: false });
    S().hydrateUi();
    expect(S().uiHydrated).toBe(true);
    expect(S().persona).toBe("engineer");
    expect(S().personaChosen).toBe(true);
  });

  it("hydrateUi with no saved state keeps defaults but flags hydrated", () => {
    S().hydrateUi();
    expect(S().uiHydrated).toBe(true);
    expect(S().persona).toBe("student");
    expect(S().personaChosen).toBe(false);
  });

  it("dismissMoment remembers the rule permanently; showMoment respects it", () => {
    S().showMoment({ id: "zero-overlap", text: "lesson" });
    expect(S().activeMoment?.id).toBe("zero-overlap");

    S().dismissMoment();
    expect(S().activeMoment).toBeNull();
    expect(S().dismissedMoments).toContain("zero-overlap");

    S().showMoment({ id: "zero-overlap", text: "lesson again" });
    expect(S().activeMoment).toBeNull();   // suppressed

    // survives "reload"
    useRagStore.setState({ dismissedMoments: [], uiHydrated: false });
    S().hydrateUi();
    expect(S().dismissedMoments).toContain("zero-overlap");
  });

  it("clearMoment hides without remembering", () => {
    S().showMoment({ id: "context-underuse", text: "lesson" });
    S().clearMoment();
    expect(S().activeMoment).toBeNull();
    expect(S().dismissedMoments).not.toContain("context-underuse");
    S().showMoment({ id: "context-underuse", text: "again" });
    expect(S().activeMoment?.id).toBe("context-underuse");
  });

  it("dock routing and param pulses update", () => {
    S().setDockTab("metrics");
    expect(S().dockTab).toBe("metrics");
    S().pulseParam("chunkSize");
    expect(S().paramPulse).toBe("chunkSize");
    S().pulseParam(null);
    expect(S().paramPulse).toBeNull();
  });
});
