/* Light "editorial lab" theme — matches the site's design language:
   light grey page (#F1F2F4 like /learn), white panels, #E8E8E8-family borders,
   Space Grotesk display + JetBrains Mono labels, blue #2563EB accent. */

export const T = {
  bg: "#F1F2F4",
  bgRaised: "#FFFFFF",
  panel: "#FFFFFF",
  panelHover: "#F7F8FA",
  inset: "#F5F6F8",            // inner wells: snippets, inputs, code
  border: "#E4E6EB",
  borderStrong: "#D3D7DE",
  fg: "#111111",
  fgSec: "#3F4754",
  fgMuted: "#69707D",
  blue: "#2563EB",
  violet: "#7C3AED",
  green: "#059669",
  amber: "#D97706",
  red: "#DC2626",
  cyan: "#0891B2",
  grad: "linear-gradient(135deg, #2563EB, #7C3AED)",
  gradText: { background: "linear-gradient(90deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const },
  mono: "var(--font-jetbrains-mono), monospace",
  disp: "var(--font-space-grotesk), sans-serif",
  cardShadow: "0 2px 10px rgba(15,23,42,0.05)",
  glass: {
    background: "#FFFFFF",
    border: "1px solid #E4E6EB",
    borderRadius: 14,
  },
};

export const eyebrow: React.CSSProperties = {
  fontFamily: T.mono, fontSize: 12, letterSpacing: "0.16em",
  textTransform: "uppercase", color: T.fgMuted,
};
