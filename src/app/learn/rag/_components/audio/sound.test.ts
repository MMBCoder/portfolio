// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { soundStore } from "./sound";

/* Sound is OFF by default, persists its toggle, and never throws when
   the AudioContext is unavailable (jsdom has none) — it is never
   load-bearing. */

beforeEach(() => {
  localStorage.clear();
  // reset the module's persisted view
  if (soundStore.isEnabled()) soundStore.toggle();
});

describe("sound", () => {
  it("is off by default", () => {
    localStorage.clear();
    expect(soundStore.isEnabled()).toBe(false);
  });

  it("toggles and persists the preference", () => {
    soundStore.toggle();
    expect(soundStore.isEnabled()).toBe(true);
    expect(localStorage.getItem("rag-viz:sound")).toContain("true");
    soundStore.toggle();
    expect(soundStore.isEnabled()).toBe(false);
  });

  it("play() is a no-op that never throws without an AudioContext", () => {
    expect(() => soundStore.play("settle")).not.toThrow();
    soundStore.toggle();   // enabled, but jsdom has no working AudioContext
    expect(() => soundStore.play("shake")).not.toThrow();
    expect(() => soundStore.play("beat")).not.toThrow();
  });

  it("notifies subscribers on change", () => {
    let fired = 0;
    const unsub = soundStore.subscribe(() => { fired++; });
    soundStore.toggle();
    expect(fired).toBeGreaterThan(0);
    unsub();
  });
});
