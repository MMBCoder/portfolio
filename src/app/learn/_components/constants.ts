// Scene durations in milliseconds — extended to give narration room to breathe
export const SCENE_DURATIONS: Record<number, number> = {
  0: 14000,
  1: 11000,
  2: 14000,
  3: 15000,
  4: 17000,
  5: 15000,
  6: 15000,
  7: 17000,
  8: 14000,
  9: 13000,
  10: 15000,
  11: 17000,
  12: 0, // No auto-advance on final scene
};

export const TOTAL_SCENES = 13;

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
  { title: "Background", subtitle: "The context behind the story" },
  { title: "Meet the Customer", subtitle: "A customer enters the ecosystem" },
  { title: "Digital Touchpoints", subtitle: "Every interaction becomes an event" },
  { title: "Enterprise Data Sources", subtitle: "Data flows from every system" },
  { title: "Customer Data Platform", subtitle: "Identity resolution begins" },
  { title: "Unified Customer Profile", subtitle: "A single view of the customer" },
  { title: "AI Agents", subtitle: "Intelligent agents begin working" },
  { title: "Decision Engine", subtitle: "AI evaluates and recommends" },
  { title: "Omnichannel Activation", subtitle: "Delivering the decision" },
  { title: "Customer Response", subtitle: "The customer acts" },
  { title: "Business Outcomes", subtitle: "Value is generated" },
  { title: "Enterprise Architecture", subtitle: "The complete picture" },
  { title: "Intelligent Experiences", subtitle: "Turning data into decisions" },
];
