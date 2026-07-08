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
  0: "Every day… [short pause] thousands of people click on a card ad. They compare offers. They start an application. [pause] And then — they simply walk away. [slower] Each of those moments is a story. A customer, waiting to be won. [pause] The trouble is, in most card businesses these signals sit scattered across dozens of systems that never talk to each other. [short pause] [smile] That's exactly what a Customer Data Platform changes.",

  1: "So let me introduce you to Mirza. [short pause] He's shopping for a credit card right now. He's seen your ad on social media… compared cards on a marketplace… even received a prescreen offer in his inbox. [pause] Six different channels. [slower] And here's the problem — not one of them knows he's the same person.",

  2: "Now, watch what happens as Mirza shops around. [short pause] Every step he takes creates a signal. An ad click. A comparison. And then the big one — [slower] he starts your application… and abandons it, just three fields from the finish. [pause] Event listeners across every touchpoint quietly capture each of these moments, in real time.",

  3: "But before any of that data goes anywhere — [emphasize] Mirza has to say yes. [short pause] A clear consent banner lays out his privacy choices. He decides what he's comfortable sharing, and only that data enters the platform. [pause] In credit cards, consent isn't a checkbox exercise. [slower] It's the foundation everything else stands on.",

  4: "Here's the thing — Mirza looks completely different in every system. [short pause] An anonymous cookie here. An email address there. A device fingerprint from the marketplace. And that half-finished application. [pause] Identity resolution quietly stitches all of these fragments together… [slower] into one single, trusted view of Mirza.",

  5: "And now, for the first time — everyone can see the full picture. [short pause] His journey across channels. His card preferences. That abandoned application, three fields from done. His prescreen eligibility, his consent status… and AI-driven propensity scores on top. [pause] [smile] Marketing, risk and service — they're all finally looking at the same Mirza.",

  6: "This is where the AI earns its keep. [short pause] The models study Mirza's profile and start recommending. How likely is he to finish the application? Which channel will reach him best? What's the right offer — and when? [pause] But notice the word. [emphasize] Recommend. [slower] The AI never decides on its own. And that distinction really matters.",

  7: "Because now, the humans step in. [short pause] A marketing analyst reviews the retargeting plan. A compliance officer checks it against lending regulations. And a business leader gives the final go-ahead. [pause] [slower] Nothing reaches Mirza until a person has looked at it, and approved it. [short pause] That's accountability, built right into the flow.",

  8: "Approval's in — now watch the platform go to work. [slightly faster] A reminder email with his saved application. A personalised banner the moment he's back on your site. A prescreen offer right inside his mobile feed. [pause] Within a day, Mirza returns… completes those three fields… [smile] and he's approved. [slower] That's an abandoned application, turned into a customer.",

  9: "And the story doesn't stop at approval. [short pause] Mirza activates his card, and the CDP now guides his whole lifecycle. A warm onboarding series. Spend insights. Reward nudges. A credit line increase the moment his behaviour qualifies. [pause] And if his engagement ever dips — the platform spots it early. [slower] Every step AI-recommended. Every step human-approved.",

  10: "So, step back and look at the whole journey. [short pause] A card business that recognises every prospect… respects every preference… recovers every abandoned application… and grows every relationship. [pause] AI for speed. Humans for judgement. [slower] From acquisition, all the way through the lifecycle. [smile] One platform. One customer. One journey.",
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
