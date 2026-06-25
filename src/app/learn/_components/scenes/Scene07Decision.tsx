"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import GlassCard from "../shared/GlassCard";
import { COLORS, STAGGER_FAST, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const INPUTS = [
  { label: "Browsing History", value: "Travel cards · Rewards", icon: "🔍", score: 92 },
  { label: "Email Engagement", value: "Open rate 68% · 12 clicks", icon: "📧", score: 85 },
  { label: "Purchase History", value: "$18,400 CLV · 3yr tenure", icon: "🛒", score: 90 },
  { label: "Credit Score", value: "Band A+ · Low risk", icon: "📊", score: 95 },
  { label: "Customer Segment", value: "High-Value · Travel Affinity", icon: "🎯", score: 88 },
  { label: "Model Confidence", value: "91.3% propensity score", icon: "🤖", score: 91 },
];

export default function Scene07Decision(_props: Props) {
  return (
    <SceneWrapper sceneIndex={6} title="Decision Engine">
      <div style={{ width: "100%", maxWidth: 840 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12, textAlign: "center",
          }}
        >
          Scene 07 · Decision
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 32,
          }}
        >
          ai evaluates. ai decides.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 20, alignItems: "center" }}>

          {/* Left: inputs */}
          <div>
            <div style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: COLORS.fgMuted, marginBottom: 10,
            }}>
              Model Inputs
            </div>
            {INPUTS.map((inp, i) => (
              <motion.div
                key={inp.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * STAGGER_FAST, duration: 0.4, ease: EASE_OUT }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", marginBottom: 7,
                  background: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 15, flexShrink: 0 }}>{inp.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: COLORS.fg, fontWeight: 600, marginBottom: 1 }}>{inp.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.fgMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inp.value}</div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${inp.score * 0.36}px` }}
                  transition={{ delay: 0.5 + i * STAGGER_FAST, duration: 0.6 }}
                  style={{ height: 3, background: COLORS.blue, borderRadius: 2, flexShrink: 0 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Center: funnel arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
          >
            <div style={{
              width: 1, height: 40,
              background: `linear-gradient(to bottom, transparent, ${COLORS.blue})`,
            }} />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, color: "#FFF",
                boxShadow: `0 0 0 6px rgba(37,99,235,0.1)`,
              }}
            >
              ⚡
            </motion.div>
            <div style={{
              width: 1, height: 40,
              background: `linear-gradient(to bottom, ${COLORS.purple}, transparent)`,
            }} />
          </motion.div>

          {/* Right: recommendation output */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.7, ease: EASE_OUT }}
          >
            <GlassCard glow="purple" style={{ padding: "24px", overflow: "hidden", position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.blue})`,
                borderRadius: "16px 16px 0 0",
              }} />

              <div style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, color: COLORS.purple, letterSpacing: "0.2em",
                textTransform: "uppercase", marginBottom: 14,
              }}>
                ✓ Recommendation
              </div>

              <div style={{ fontSize: 36, marginBottom: 8 }}>💳</div>

              <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.fg, marginBottom: 6 }}>
                Premium Travel Card
              </div>

              {[
                { k: "Offer", v: "0% APR · 12 months" },
                { k: "Bonus", v: "60,000 reward points" },
                { k: "Channel", v: "Email → Mobile" },
                { k: "Send time", v: "Tuesday 9:02 AM" },
                { k: "Confidence", v: "91.3%" },
              ].map((kv) => (
                <div key={kv.k} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`,
                  fontSize: 13,
                }}>
                  <span style={{ color: COLORS.fgMuted }}>{kv.k}</span>
                  <span style={{ color: COLORS.fg, fontWeight: 600 }}>{kv.v}</span>
                </div>
              ))}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}
