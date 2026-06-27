"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Narration scripts — one continuous storytelling arc ───────────────────────
// Each scene's voice-over picks up from the last, like chapters of a documentary.
// Word counts are calibrated to finish ~2-3s before each scene's auto-advance timer.

export const NARRATIONS: Record<number, string> = {
  0: "Enterprise data is siloed — and no single team has the complete picture. A Customer Data Platform is built to connect all of it.",

  1: "Meet Alex — a real customer browsing your website right now, looking for the right offer.",

  2: "In minutes, Alex leaves footprints across five channels — website, email, store, mobile, and support. Every system records her. Not one of them shares it.",

  3: "Behind the scenes, seven enterprise systems stream live events — CRM, email, mobile, website, in-store — all generating data, all in complete isolation.",

  4: "The CDP steps in. It ingests every event and resolves Alex's fragmented signals — cookie, email, CRM, device — into one unified profile. In real time.",

  5: "Five scattered identifiers become one trusted golden record — Alex's complete history, available to every team across the enterprise, instantly.",

  6: "AI agents now activate on the unified profile — scoring Alex's segment, predicting her next intent, and preparing the optimal personalised recommendation.",

  7: "The decision engine receives six signals simultaneously — browsing, email engagement, purchase history, credit band. It processes everything and surfaces one recommendation. Ninety-one percent confidence.",

  8: "The recommendation activates across every channel — personalised email, mobile push, dynamically updated homepage. One decision, delivered everywhere Alex is, at the same moment.",

  9: "Alex opens the email during her morning commute. The offer feels genuinely relevant — because it is. She applies in under two minutes.",

  10: "One connected journey, real business outcomes — higher conversion, stronger lifetime value, and decisions that scale across seventy million customer profiles simultaneously.",

  11: "This is the full architecture behind Alex's journey — eight layers, from customer touchpoints through identity resolution and AI agents, all the way to omnichannel delivery.",

  12: "This is what a modern Customer Data Platform makes possible — not just better data management, but genuinely intelligent, personalised experiences delivered in real time, across every channel your business owns. Alex's journey took under two hundred milliseconds. Multiply that across seventy million customers, simultaneously. This is enterprise AI at scale.",
};

// ── Voice preference order ────────────────────────────────────────────────────
const PREFERRED_VOICES = [
  "Daniel",                  // macOS/iOS — warm UK English, most natural
  "Arthur",                  // Windows 11 UK English
  "Google UK English Male",  // Chrome desktop
  "Alex",                    // macOS US English (classic)
  "Aaron",                   // macOS/iOS US English
  "Fred",
  "Google US English",
  "Samantha",
  "Karen",
  "Google UK English Female",
  "Moira",
];

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  for (const name of PREFERRED_VOICES) {
    const hit = voices.find(
      v => (v.name === name || v.name.startsWith(name)) && v.lang.startsWith("en"),
    );
    if (hit) return hit;
  }
  return voices.find(v => v.lang.startsWith("en")) ?? null;
}

// ── Timing constants ──────────────────────────────────────────────────────────
// START_DELAY: wait for scene enter animation to settle before voice begins
const START_DELAY_MS = 350;
// CHAIN_DELAY: natural story-beat pause between chained narrations (queue flush)
const CHAIN_DELAY_MS = 200;

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useNarration(
  scene: number,
  isPlaying: boolean,
  muted: boolean,
): { triggerManualNav: () => void } {
  const synthRef       = useRef<SpeechSynthesis | null>(null);
  const voiceRef       = useRef<SpeechSynthesisVoice | null>(null);
  const pendingRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSpeakingRef  = useRef(false);
  const queuedSceneRef = useRef<number | null>(null);
  // Set true by triggerManualNav() before each user-initiated scene change
  const isManualNavRef = useRef(false);

  // Stable refs — async callbacks read these so they never see stale prop values
  const isPlayingRef = useRef(isPlaying);
  const mutedRef     = useRef(muted);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  // ── Core speak function (stable — references only mutable refs) ───────────
  const speak = useCallback((sceneIndex: number, delay: number) => {
    if (pendingRef.current) {
      clearTimeout(pendingRef.current);
      pendingRef.current = null;
    }

    const text = NARRATIONS[sceneIndex];
    if (!text) return;

    pendingRef.current = setTimeout(() => {
      pendingRef.current = null;
      const synth = synthRef.current;
      if (!synth || !isPlayingRef.current || mutedRef.current) return;

      const u = new SpeechSynthesisUtterance(text);
      u.rate   = 0.9;   // Deliberate, expert pacing — slower than default
      u.pitch  = 0.95;  // Slightly deeper for authority
      u.volume = 0.9;
      if (voiceRef.current) u.voice = voiceRef.current;

      isSpeakingRef.current = true;

      // When this chapter ends, seamlessly begin the queued chapter (if any)
      u.onend = () => {
        isSpeakingRef.current = false;
        const queued = queuedSceneRef.current;
        if (queued !== null && isPlayingRef.current && !mutedRef.current) {
          queuedSceneRef.current = null;
          speak(queued, CHAIN_DELAY_MS);
        }
      };

      u.onerror = () => {
        isSpeakingRef.current = false;
        // On synthesis error, still try to chain to queued scene
        const queued = queuedSceneRef.current;
        if (queued !== null && isPlayingRef.current && !mutedRef.current) {
          queuedSceneRef.current = null;
          speak(queued, CHAIN_DELAY_MS);
        }
      };

      synth.speak(u);
    }, delay);
  }, []); // stable — reads refs only, no prop captures

  // ── Signal for manual navigation (prev/next/goto/replay/swipe/keyboard) ───
  // Must be called BEFORE dispatch so the scene-change effect sees the flag.
  const triggerManualNav = useCallback(() => {
    isManualNavRef.current = true;
  }, []);

  // ── Initialise SpeechSynthesis + voice loading ────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synthRef.current = synth;

    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) voiceRef.current = pickVoice(voices);
    };
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
      if (pendingRef.current) clearTimeout(pendingRef.current);
      synth.cancel();
      isSpeakingRef.current = false;
    };
  }, []);

  // ── React to scene / play / mute changes ─────────────────────────────────
  useEffect(() => {
    const synth = synthRef.current;

    // Pause or mute → stop everything cleanly
    if (!isPlaying || muted) {
      if (pendingRef.current) {
        clearTimeout(pendingRef.current);
        pendingRef.current = null;
      }
      queuedSceneRef.current = null;
      isSpeakingRef.current = false;
      synth?.cancel();
      return;
    }

    // Manual navigation (prev/next/goto/replay/swipe/keyboard):
    // Cancel the current sentence immediately and restart for the new scene.
    if (isManualNavRef.current) {
      isManualNavRef.current = false;
      if (pendingRef.current) {
        clearTimeout(pendingRef.current);
        pendingRef.current = null;
      }
      queuedSceneRef.current = null;
      isSpeakingRef.current = false;
      synth?.cancel();
      speak(scene, START_DELAY_MS);
      return;
    }

    // Auto-advance: the current sentence is mid-way — let it finish naturally.
    // Queue this scene so speech chains seamlessly when the utterance ends.
    if (isSpeakingRef.current) {
      queuedSceneRef.current = scene;
      return;
    }

    // Nothing is speaking (e.g. resumed after pause, or first load) — start fresh.
    speak(scene, START_DELAY_MS);
  }, [scene, isPlaying, muted, speak]);

  return { triggerManualNav };
}
