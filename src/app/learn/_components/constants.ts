// Scene durations in milliseconds — calibrated to narration length + visual absorption time
export const SCENE_DURATIONS: Record<number, number> = {
  0:  27000,  // The Opportunity
  1:  22000,  // Meet Mirza
  2:  24000,  // Every Signal Matters
  3:  24000,  // Consent First
  4:  23000,  // One Identity
  5:  26000,  // Prospect 360
  6:  26000,  // AI Recommends
  7:  26000,  // Human in the Loop
  8:  27000,  // Winning Mirza Back
  9:  27000,  // Lifecycle Begins
  10: 0,      // The Promise — no auto-advance on final scene
};

export const TOTAL_SCENES = 11;

// Transition duration between scenes
export const SCENE_TRANSITION_MS = 350;

// Animation easing (matches Framer Motion spring feel)
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

// Stagger delay between child elements
export const STAGGER_CHILDREN = 0.12;
export const STAGGER_FAST = 0.07;

// Design tokens — reference existing CSS variables where possible.
// These are used for inline SVG and canvas elements that cannot use CSS vars.
export const COLORS = {
  bg: "#FFFFFF",
  fg: "#111111",
  fgSecondary: "#444444",
  fgMuted: "#888888",
  border: "#E5E5E5",
  muted: "#F7F7F7",
  blue: "#2563EB",
  blueLight: "#EFF6FF",
  blueMid: "#BFDBFE",
  purple: "#7C3AED",
  purpleLight: "#F5F3FF",
  purpleMid: "#DDD6FE",
  cyan: "#06B6D4",
  cyanLight: "#ECFEFF",
  green: "#10B981",
  greenLight: "#ECFDF5",
  amber: "#F59E0B",
  amberLight: "#FFFBEB",
} as const;

// Scene metadata (used by ProgressBar, SceneLabel, aria-labels)
export const SCENE_META: Array<{ title: string; subtitle: string }> = [
  { title: "The Opportunity", subtitle: "Every signal is a customer waiting to be won" },
  { title: "Meet Mirza", subtitle: "An in-market prospect across six acquisition channels" },
  { title: "Every Signal Matters", subtitle: "Ad clicks, comparisons, an abandoned application" },
  { title: "Consent First", subtitle: "Data collection begins with permission" },
  { title: "One Identity", subtitle: "Fragments resolved into a single prospect" },
  { title: "Prospect 360", subtitle: "The complete picture, finally" },
  { title: "AI Recommends", subtitle: "Models that recommend, never decide" },
  { title: "Human in the Loop", subtitle: "Reviewed and approved before activation" },
  { title: "Winning Mirza Back", subtitle: "Retargeting that completes the application" },
  { title: "Lifecycle Begins", subtitle: "From activation to lifetime growth" },
  { title: "The Promise", subtitle: "Acquisition to lifecycle on one platform" },
];
