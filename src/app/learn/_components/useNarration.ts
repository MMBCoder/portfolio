"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Narration scripts — one continuous executive storytelling arc ─────────────
// Written in the voice of a Senior VP of Digital Transformation explaining to
// leadership. Calm. Confident. Thoughtful. Each scene picks up from the last.

// Voice-directed narration — written as spoken by a warm, confident Indian English
// narrator (30s, management-consultant tone). Markers: [pause] [short pause] become
// real pauses at synthesis time; [smile] [slower] [slightly faster] [emphasize] are
// direction cues and are stripped before speaking.
export const NARRATIONS: Record<number, string> = {
  0: "Three seconds. [short pause] That's roughly how long you have when someone clicks on your card ad. [pause] Most banks never even see it happen. The click. The comparison. The application that dies three fields from the finish line. [pause] Real revenue — invisible. [slower] Until now. [pause] This is the story of one customer… and the platform that refused to lose him.",

  1: "His name is Mirza. [short pause] Right now, he's comparing credit cards across six browser tabs. Your ad caught his eye on social media. A marketplace ranked you against your rivals. A prescreen offer sits unread in his inbox. [pause] And here's the uncomfortable truth — [slower] your systems think he's six different people. [short pause] Six shadows. Zero customers.",

  2: "Now watch closely. [short pause] Every move Mirza makes leaves a footprint. Click. Compare. Scroll. And then — the moment that matters. [slower] He opens your application… fills in almost everything… and walks away. Three fields. That's all that stood between you and a new customer. [pause] But this time, something was listening.",

  3: "Stop. [short pause] Before a single byte moves, there's a question that has to be asked. [slower] May we? [pause] Mirza sees a clear consent banner. He chooses what to share — and what stays private. Only what he approves ever enters the platform. [short pause] In banking, trust isn't a feature. [slower] It's the licence to operate.",

  4: "Here's where it gets interesting. [short pause] A cookie from the ad click. An email address from the prescreen file. A device signature from the marketplace. A half-finished form. Four strangers, as far as your systems know. [pause] Identity resolution picks up the threads… and pulls. [slower] Four fragments collapse into one person. [short pause] Hello, Mirza.",

  5: "And suddenly — the lights come on. [short pause] One screen. Everything. His journey across every channel. The card he wanted. The exact field where he stopped. His eligibility. His consent. And propensity scores, updating in real time. [pause] Marketing sees it. Risk sees it. Service sees it. [slower] The same Mirza. Finally.",

  6: "Now the models lean in. [short pause] Will he finish the application on his own? How do we reach him — email, web, or the app? When? And which offer actually fits? [pause] The AI studies his profile and builds the play. [slower] But look carefully — it's holding a recommendation, not a trigger. [short pause] Machines propose. They never dispose.",

  7: "Because before anything ships, three humans stand in the doorway. [short pause] An analyst pressure-tests the logic. A compliance officer holds it against lending regulation. A business leader signs the release. [pause] Only then does it move. [slower] That's not bureaucracy. That's the difference between AI you demo… and AI you deploy in a bank.",

  8: "Green light. [slightly faster] A reminder email lands — his application saved, one click to resume. He returns, and a banner greets him by context, not by accident. Three fields. Done. [pause] Approved. [slower] Yesterday, Mirza was an abandoned form in a database. [short pause] Today, he's a customer. [smile] That's the machine, working.",

  9: "But acquisition is just the opening scene. [short pause] Card activated — and now the platform runs beside him. Onboarding that teaches. Spend insights that surprise him. Rewards that arrive before he asks. A credit line increase the day his behaviour earns it. [pause] And if he ever starts drifting away… [slower] the platform knows weeks before anyone else.",

  10: "So here's the whole picture. [short pause] Every prospect recognised. Every preference respected. Every abandoned application, a second chance. Every relationship, growing. [pause] AI at machine speed. Humans holding the pen. [slower] From the first click to a lifetime of loyalty. [pause] One platform. One customer. [smile] One journey — done right.",
};

// Convert voice-direction markers into synthesis-friendly text:
// pauses become punctuation the TTS engine honours; style cues are stripped.
export function toSpeakable(text: string): string {
  return text
    .replace(/\[pause\]/gi, " ... ")
    .replace(/\[short pause\]/gi, ", ")
    .replace(/\[(smile|emphasize|slower|slightly faster)\]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ── Voice preference order ────────────────────────────────────────────────────
const PREFERRED_VOICES = [
  "Microsoft Ravi",          // Windows — Indian English male
  "Microsoft Heera",         // Windows — Indian English female
  "Rishi",                   // macOS/iOS — Indian English male
  "Veena",                   // macOS — Indian English female
  "Google English (India)",  // Chrome
  "Microsoft Neerja",        // Windows/Edge — Indian English female
  "Microsoft Prabhat",       // Edge — Indian English male
  "Daniel",
  "Google UK English Male",
  "Samantha",
];

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // 1. Named Indian-English voices (most natural)
  for (const name of PREFERRED_VOICES) {
    const hit = voices.find(
      v => (v.name === name || v.name.startsWith(name)) && v.lang.startsWith("en"),
    );
    if (hit) return hit;
  }
  // 2. Any Indian-English voice by locale
  const enIN = voices.find(v => v.lang === "en-IN" || v.lang.startsWith("en-IN"));
  if (enIN) return enIN;
  // 3. Any English voice
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

      const u = new SpeechSynthesisUtterance(toSpeakable(text));
      u.rate   = 0.9;   // Deliberate, expert pacing — slower than default
      u.pitch  = 1.02;  // warm, natural  // Slightly deeper for authority
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
