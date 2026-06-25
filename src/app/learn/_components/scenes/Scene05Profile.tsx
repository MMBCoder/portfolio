"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import GlassCard from "../shared/GlassCard";
import { COLORS, STAGGER_CHILDREN, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const PROFILE_SECTIONS = [
  {
    label: "Demographics",
    color: COLORS.blue,
    fields: [
      { k: "Age", v: "34" },
      { k: "Location", v: "San Francisco, CA" },
      { k: "Preferred Channel", v: "Email · Mobile" },
    ],
  },
  {
    label: "Financial",
    color: COLORS.purple,
    fields: [
      { k: "CLV", v: "$18,400" },
      { k: "Credit Score Band", v: "A+" },
      { k: "Products Held", v: "2 Cards · 1 Loan" },
    ],
  },
  {
    label: "Behaviour",
    color: COLORS.cyan,
    fields: [
      { k: "Last Active", v: "2 hours ago" },
      { k: "Avg. Session", v: "7m 42s" },
      { k: "Open Rate", v: "68%" },
    ],
  },
  {
    label: "AI Segments",
    color: COLORS.green,
    fields: [
      { k: "Propensity", v: "High — Travel Card" },
      { k: "Churn Risk", v: "Low (4%)" },
      { k: "Loyalty Tier", v: "Gold" },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.5 } },
};
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function Scene05Profile(_props: Props) {
  return (
    <SceneWrapper sceneIndex={4} title="Unified Customer Profile">
      <div style={{ width: "100%", maxWidth: 800 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12, textAlign: "center",
          }}
        >
          Scene 05 · Unified Profile
        </motion.p>

        {/* Header with avatar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: EASE_OUT }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, justifyContent: "center" }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, flexShrink: 0,
          }}>
            👤
          </div>
          <div>
            <h2 style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              letterSpacing: "-0.04em", color: COLORS.fg,
              textTransform: "lowercase", margin: 0,
            }}>
              alex chen.
            </h2>
            <div style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12, color: COLORS.blue, letterSpacing: "0.15em",
              textTransform: "uppercase", marginTop: 2,
            }}>
              ucid_ax92mk · 360° Profile Active
            </div>
          </div>
        </motion.div>

        {/* Profile grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}
        >
          {PROFILE_SECTIONS.map((section) => (
            <GlassCard
              key={section.label}
              variants={card}
              glow="none"
              style={{ padding: "20px", overflow: "hidden", position: "relative" }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: section.color, borderRadius: "16px 16px 0 0",
              }} />
              <div style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                color: section.color, marginBottom: 14,
              }}>
                {section.label}
              </div>
              {section.fields.map((f) => (
                <div key={f.k} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "7px 0", borderBottom: `1px solid ${COLORS.border}`,
                  fontSize: 13,
                }}>
                  <span style={{ color: COLORS.fgMuted }}>{f.k}</span>
                  <span style={{ color: COLORS.fg, fontWeight: 600 }}>{f.v}</span>
                </div>
              ))}
            </GlassCard>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            marginTop: 24, textAlign: "center",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12, color: COLORS.fgMuted, letterSpacing: "0.1em",
          }}
        >
          Real-time · Consent-aware · 70M+ profiles at scale
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
