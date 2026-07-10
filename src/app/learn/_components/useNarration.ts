"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Narration scripts — one continuous executive storytelling arc ─────────────
// Written in the voice of a Senior VP of Digital Transformation explaining to
// leadership. Calm. Confident. Thoughtful. Each scene picks up from the last.

// Voice-directed narration — written as spoken by a warm, confident Indian English
// narrator (30s, management-consultant tone). Markers: [pause] [short pause] become
// real pauses at synthesis time; [smile] [slower] [slightly faster] [emphasize] are
// direction cues and are stripped before speaking.
// A relatable customer story — one person, one card, one journey.
// Each script is word-counted to finish comfortably inside its scene duration.
// Boardroom narration — business-first customer story.
// Ellipses (...) create natural pauses at synthesis time.
export const NARRATIONS: Record<number, string> = {
  0: "Every ad click. Every credit card comparison. Every eligibility check. Every abandoned application. Each one represents a customer waiting to begin a relationship. Yet inside most card issuers... these acquisition signals remain scattered across dozens of disconnected systems. Marketing sees a click. Digital sees an abandoned application. Sales sees a lead. Risk sees an applicant. But no one sees the customer. Now imagine... if every abandoned application could become an acquired customer... and every card holder could become a lifelong relationship. That's the opportunity a Customer Data Platform unlocks.",

  1: "Meet Mirza. He's thirty-four. A product manager. He's planning his family's first trip to Singapore. Flights are booked. Hotels are reserved. Now he wants a travel rewards credit card... to earn miles... save on foreign transactions... and enjoy airport lounge access. Like every customer... he begins researching. Not knowing... his digital journey has already begun.",

  2: "Mirza doesn't visit one bank. He visits several. He compares annual fees. Reward points. Airport lounge benefits. Travel insurance. He clicks an Instagram advertisement. Reads comparison websites. Visits your bank's website. Downloads your mobile app. To Mirza... it's one shopping journey. To the bank... it's six disconnected events. Six different systems. Six different customer IDs. Six strangers.",

  3: "Eventually... Mirza chooses your travel credit card. The application begins. Name. Income. Employer. Everything is going smoothly. Then... his phone rings. A production issue at work. He closes the laptop. I'll finish it tomorrow. But tomorrow becomes next week. For most banks... that's where the journey ends.",

  4: "But before any of this... something important happened. The first time Mirza visited your website... you asked one simple question. What are you comfortable sharing? He agreed to personalized experiences. He agreed to analytics. He declined third-party marketing. The platform remembered every preference. Nothing more. Nothing less. Because trust... always comes before personalization.",

  5: "Now... the Customer Data Platform gets to work. To Instagram... Mirza is a cookie. To Google... a click. To your mobile app... a device. To your website... a half-finished application. To your CRM... an email address. Five identities. One person. Identity Resolution connects every signal... creating one trusted customer profile. One Mirza. One journey.",

  6: "For the first time... every team sees the same customer. Marketing sees his interests. Sales sees his application. Risk sees his eligibility. Service sees his preferences. No duplicate records. No conflicting information. Just one complete Customer 360. Everyone is finally reading the same story.",

  7: "Now AI analyzes the journey. It understands what Mirza actually needs... a travel card. Lounge access. No foreign transaction fees. It predicts when he's most likely to respond. Which channel he prefers. Which offer fits him best. Hundreds of possibilities... evaluated in seconds. Personalized communication... automated at scale. And the AI recommends... send a saved application reminder... on Saturday morning.",

  8: "But one thing is important. The AI never presses Send. Every recommendation passes through people. Marketing reviews the message. Compliance validates the lending rules. Business approves the campaign. Only then... does anything reach Mirza. AI provides intelligence. People make decisions. That's responsible AI... in a regulated bank.",

  9: "Saturday morning. Coffee in hand. Mirza receives a simple message. Your application is waiting. He clicks. The website remembers him. No repeating forms. No starting over. Just three remaining fields. Thirty seconds later... his application is submitted. Moments later... approved. One abandoned application... becomes one new customer. Not by chance. By design.",

  10: "For most systems... approval is the finish line. For a Customer Data Platform... it's only the beginning. Mirza receives personalized onboarding. Travel benefit reminders. Airport lounge access before departure. Real-time reward point updates. Personalized spending insights. Months later... after responsible card usage... he receives a credit limit increase. Every interaction... makes the next one smarter.",

  11: "Mirza never saw the technology. He simply experienced a bank... that remembered him. Understood him. Respected his choices. And was there... at exactly the right moment. Behind the scenes... thousands of customer signals... became one trusted identity. One intelligent journey. One lasting relationship. That's what a Customer Data Platform delivers. It doesn't just connect data. It connects people... to experiences... that build trust... and create customers for life.",
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
