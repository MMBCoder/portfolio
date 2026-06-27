// Scene durations in milliseconds — calibrated to narration length + visual absorption time
export const SCENE_DURATIONS: Record<number, number> = {
  0:  20000,  // The Opportunity — opening hook needs time to land
  1:  19000,  // Sarah's World
  2:  20000,  // Every Event Matters
  3:  18000,  // Consent First
  4:  18000,  // One Identity
  5:  22000,  // Customer 360 — rich profile takes time to absorb
  6:  19000,  // AI Intelligence
  7:  24000,  // Human Accountability — governance flow has 5 steps
  8:  20000,  // Activated in Real Time
  9:  20000,  // Continuous Learning
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
  { title: "The Opportunity", subtitle: "A different way to hear your customers" },
  { title: "Sarah's World", subtitle: "A customer across six channels, unrecognised" },
  { title: "Every Event Matters", subtitle: "Capturing signals in real time" },
  { title: "Consent First", subtitle: "Data collection begins with permission" },
  { title: "One Identity", subtitle: "Resolving fragments into a unified view" },
  { title: "Customer 360", subtitle: "A complete profile, finally" },
  { title: "AI Intelligence", subtitle: "Models that recommend, not decide" },
  { title: "Human Accountability", subtitle: "Governance at every step" },
  { title: "Activated in Real Time", subtitle: "Delivering the right experience instantly" },
  { title: "Continuous Learning", subtitle: "The loop that makes tomorrow better" },
  { title: "The Promise", subtitle: "Enterprise capability at scale" },
];
