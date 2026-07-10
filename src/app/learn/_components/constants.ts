// Scene durations in milliseconds — calibrated to narration length + visual absorption time
export const SCENE_DURATIONS: Record<number, number> = {
  0:  46000,  // The Opportunity (93 words)
  1:  29000,  // Meet Mirza (55)
  2:  30000,  // One Customer, Many Signals (57)
  3:  26000,  // The Lost Opportunity (47)
  4:  28000,  // Trust Starts with Consent (53)
  5:  29000,  // Identity Resolution (55)
  6:  24000,  // Customer 360 (44)
  7:  30000,  // AI Recommends (59)
  8:  26000,  // Humans Decide (48)
  9:  28000,  // Winning Mirza Back (52)
  10: 29000,  // Beyond Acquisition (55)
  11: 0,      // The Promise — final scene, no auto-advance
};

export const TOTAL_SCENES = 12;

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
  { title: "The Opportunity", subtitle: "Signals scattered, customers unseen" },
  { title: "Meet Mirza", subtitle: "Planning a first family trip to Singapore" },
  { title: "One Customer, Many Signals", subtitle: "One journey, six disconnected events" },
  { title: "The Lost Opportunity", subtitle: "Abandoned, three fields from the finish" },
  { title: "Trust Starts with Consent", subtitle: "Trust comes before personalization" },
  { title: "Identity Resolution", subtitle: "Five identities become one person" },
  { title: "Customer 360", subtitle: "Every team reads the same story" },
  { title: "AI Recommends", subtitle: "Understanding needs, personalizing at scale" },
  { title: "Humans Decide", subtitle: "Intelligence from AI, decisions from people" },
  { title: "Winning Mirza Back", subtitle: "One click, thirty seconds, approved" },
  { title: "Beyond Acquisition", subtitle: "Approval is only the beginning" },
  { title: "The Promise", subtitle: "Customers for life" },
];
