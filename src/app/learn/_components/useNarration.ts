"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Narration scripts — one continuous executive storytelling arc ─────────────
// Written in the voice of a Senior VP of Digital Transformation explaining to
// leadership. Calm. Confident. Thoughtful. Each scene picks up from the last.

export const NARRATIONS: Record<number, string> = {
  0: "Every login. Every payment. Every abandoned application. Each one tells a story your organisation has never fully heard. Inside most financial institutions, these signals remain scattered, disconnected, unread. A Customer Data Platform is what finally connects them.",

  1: "Meet Sarah — an existing credit card customer. She engages across your mobile app, banking website, credit card portal, email, partner marketplace, and customer support. Six channels. Not a single connected view of who she actually is.",

  2: "As Sarah moves through your ecosystem, she generates a continuous stream of events. A login. A product search. A credit card application started — and then abandoned. An email opened six hours later. Event listeners, embedded across every touchpoint, capture each of these moments in real time.",

  3: "Before a single event reaches the CDP, Sarah must give her consent. A Consent Management Platform presents her privacy choices clearly. She decides what she is willing to share. Only the data she has explicitly approved enters the platform. In regulated industries like financial services, consent is not optional. It is foundational.",

  4: "Sarah appears differently in every system. A cookie in your analytics platform. An email address in your marketing stack. A CRM identifier. A mobile device fingerprint. Identity resolution stitches every fragment together — resolving four separate records into one trusted, unified customer identity.",

  5: "The result is a Customer 360 profile — a single, comprehensive view that no individual system could ever provide alone. Demographics. Products she owns. Browsing behaviour. Transaction history. Email engagement. App activity. Support interactions. Her consent status. And AI-generated propensity scores. Every team, from marketing to service, now sees the same Sarah.",

  6: "With a complete profile, AI models begin their analysis. Purchase propensity. Churn risk. Credit eligibility. Next best offer. Product affinity. Risk signals. Each model generates a recommendation for Sarah based on her actual behaviour and demonstrated intent. These are recommendations — not decisions. That distinction is important.",

  7: "This is where responsible AI separates genuinely mature organisations from the rest. Artificial intelligence accelerates analysis and surfaces the next best recommendation — but a marketing analyst reviews the campaign logic, a compliance officer confirms regulatory alignment, and a business leader approves activation. Every campaign is reviewed and approved by a human before it reaches a customer. Accountability stays with your team.",

  8: "Approval granted. The CDP now activates Sarah's experience in real time. She abandoned a credit card application this morning. Within seconds of returning to the website, a personalised banner appears. A reminder email is triggered. Her mobile app surfaces a contextual prompt. The call centre receives her profile. Every channel — simultaneously, seamlessly — in real time.",

  9: "Sarah opens the email. She returns to the website. She completes the application. The moment she does, the CDP captures the event, updates her profile, and the AI models recalculate. Every future interaction with Sarah is now informed by what just happened. This is how the system continuously learns — and continuously improves.",

  10: "This is the complete picture. A financial institution that listens to every signal, respects every preference, unifies every identity, and acts intelligently — with AI acceleration and human accountability at every step. Not a technology demonstration. A genuine enterprise capability, ready to serve millions of customers the way they deserve to be served.",
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
