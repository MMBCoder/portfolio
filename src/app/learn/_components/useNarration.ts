"use client";

import { useEffect, useRef } from "react";

// ── Narration scripts ─────────────────────────────────────────────────────────
// Written to sound like a CDP expert presenting to an executive audience.
// Length is calibrated to roughly match each scene's auto-advance duration.

export const NARRATIONS: Record<number, string> = {
  0: "Most companies collect customer data from everywhere — but store it in silos. A Customer Data Platform changes that, connecting every signal into one single source of truth.",

  1: "Meet Alex Chen — a real customer leaving digital footprints across every channel your company owns.",

  2: "Every time Alex browses your site, opens an email, or visits a store, a signal is created. Most companies collect these signals — but very few actually connect them.",

  3: "Seven enterprise systems are streaming data right now — your CRM, website, mobile app, email platform, and point of sale. The CDP is the layer that brings all of it together.",

  4: "This is where BlueConic steps in. It receives every event and resolves fragmented identifiers — cookie ID, email address, CRM record, device — into a single unified profile. In real time.",

  5: "Alex is no longer just a cookie or an email address. She is now one complete, trusted golden record that the entire enterprise can confidently act on.",

  6: "With a unified profile live, AI agents activate — scoring segments, predicting next best actions, and queuing personalised recommendations, all happening silently in the background.",

  7: "The decision engine ingests six data signals simultaneously — browsing behaviour, email engagement, purchase history, credit band — and surfaces a single recommendation with ninety-one percent confidence.",

  8: "The decision has been made. Now it is delivered across email, mobile push, and web personalisation simultaneously — the right offer, to the right person, at exactly the right moment.",

  9: "Alex opens the email, recognises the offer as genuinely relevant, and applies for the card. AI-powered conversion — not by chance, but by design.",

  10: "One connected customer journey. Measurable business outcomes — higher conversion, stronger lifetime value, and intelligent decisions that scale across seventy million customer profiles.",

  11: "This is the complete enterprise architecture — eight interconnected layers running from customer touchpoints through identity resolution and AI agents, all the way to omnichannel activation.",

  12: "This is what a modern Customer Data Platform makes possible — not just better data management, but genuinely intelligent customer experiences, powered by unified data and AI, delivered at enterprise scale across every channel your business owns.",
};

// ── Voice selection ───────────────────────────────────────────────────────────
// Priority order: prefer voices that sound natural and professional in English.

const PREFERRED_VOICES = [
  "Daniel",                  // macOS / iOS — warm UK English, most natural
  "Arthur",                  // Windows 11 UK English
  "Google UK English Male",  // Chrome desktop
  "Alex",                    // macOS US English (classic)
  "Aaron",                   // macOS / iOS US English
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

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useNarration(
  scene: number,
  isPlaying: boolean,
  muted: boolean,
) {
  const synthRef    = useRef<SpeechSynthesis | null>(null);
  const voiceRef    = useRef<SpeechSynthesisVoice | null>(null);
  const pendingRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Initialise synth and load voices ───────────────────────────────────────
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
      synth.cancel();
    };
  }, []);

  // ── React to scene / play / mute changes ───────────────────────────────────
  useEffect(() => {
    const synth = synthRef.current;

    // Cancel any in-flight speech or pending speak
    if (pendingRef.current) {
      clearTimeout(pendingRef.current);
      pendingRef.current = null;
    }
    synth?.cancel();

    if (!synth || !isPlaying || muted) return;

    const text = NARRATIONS[scene];
    if (!text) return;

    // Delay slightly so:
    //  1. The scene transition animation has time to start visually
    //  2. Chrome's cancel() settles before the next speak() call
    pendingRef.current = setTimeout(() => {
      pendingRef.current = null;
      const s = synthRef.current;
      if (!s || !isPlaying) return;

      const u = new SpeechSynthesisUtterance(text);
      u.rate   = 0.9;   // Slightly slower than default — deliberate, expert pacing
      u.pitch  = 0.95;  // Slightly deeper — more authoritative
      u.volume = 0.9;

      if (voiceRef.current) u.voice = voiceRef.current;

      u.onerror = () => {
        // Silently swallow — browser may block autoplay speech
      };

      s.speak(u);
    }, 420); // 420ms covers the 400ms scene transition (SCENE_TRANSITION_MS + 50ms)

    return () => {
      if (pendingRef.current) {
        clearTimeout(pendingRef.current);
        pendingRef.current = null;
      }
      synthRef.current?.cancel();
    };
  }, [scene, isPlaying, muted]);
}
