"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_CHILDREN } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const PROFILE_SECTIONS = [
  {
    category: "Demographics",
    color: COLORS.blue,
    items: ["Sarah M. · Age 34", "Chicago, IL", "Senior Marketing Manager"],
  },
  {
    category: "Products Owned",
    color: COLORS.purple,
    items: ["Premium Rewards Card", "Savings Account", "Home Equity Loan"],
  },
  {
    category: "Browsing Behaviour",
    color: "#0891B2",
    items: ["Credit card comparison: 4×", "Travel rewards pages: 7×", "Balance transfer info: 2×"],
  },
  {
    category: "Transaction History",
    color: COLORS.green,
    items: ["Avg. monthly spend: $3,200", "On-time payments: 100%", "7-year relationship"],
  },
  {
    category: "Email Engagement",
    color: "#D97706",
    items: ["Open rate: 68%", "Click-through: 24%", "Last opened: 2 days ago"],
  },
  {
    category: "App Activity",
    color: "#7C3AED",
    items: ["Sessions this month: 14", "Avg. session: 4.2 min", "Feature: Balance check, transfers"],
  },
  {
    category: "Support History",
    color: "#DC2626",
    items: ["Last contact: 6 months ago", "CSAT score: 4.8/5", "Channel: Mobile chat"],
  },
  {
    category: "Consent Status",
    color: COLORS.green,
    items: ["Marketing: ✓ Permitted", "Analytics: ✓ Permitted", "Third-party: ✗ Declined"],
  },
  {
    category: "AI Propensity Scores",
    color: "#1D4ED8",
    items: ["Premium upgrade: 84%", "Churn risk: Low (8%)", "Next best offer: Travel Card"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.4 } },
};

const card = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function Scene05Profile(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={5} title="Customer 360">
      <div style={{ width: "100%", maxWidth: 900 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Scene 06 · Customer 360
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 6,
          }}
        >
          customer 360.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 24 }}
        >
          A single, comprehensive view that no individual system could ever provide alone.
        </motion.p>

        {/* Sarah header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: EASE_OUT }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 22px",
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            border: `1.5px solid ${COLORS.blue}`,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1D4ED8 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 12px rgba(37,99,235,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 20, color: "#fff" }}>S</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 17, color: COLORS.fg }}>
              Sarah — Unified Customer Profile
            </p>
            <p style={{ fontSize: 12, color: COLORS.blue }}>
              ACC-00291847 · 9 data dimensions · Updated in real time
            </p>
          </div>
          <div style={{
            padding: "5px 12px", background: "#DEF7EC",
            border: "1px solid #6EE7B7", borderRadius: 20,
            fontSize: 11, color: "#065F46",
            fontFamily: "var(--font-jetbrains-mono)", flexShrink: 0,
          }}>
            LIVE PROFILE
          </div>
        </motion.div>

        {/* Profile section cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {PROFILE_SECTIONS.map(({ category, color, items }) => (
            <motion.div
              key={category}
              variants={card}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}1e`,
                borderRadius: 12,
                padding: "14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: color,
              }} />
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color, marginBottom: 8,
              }}>{category}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {items.map(item => (
                  <p key={item} style={{ fontSize: 11, color: COLORS.fg, lineHeight: 1.4 }}>
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          style={{
            marginTop: 20,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, color: COLORS.fgMuted, textAlign: "center", letterSpacing: "0.08em",
          }}
        >
          Every team · Marketing, Service, Risk, Sales · now sees the same Sarah
        </motion.p>
      </div>
    </SceneWrapper>
  );
}
