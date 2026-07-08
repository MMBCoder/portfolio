"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_CHILDREN } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const AI_MODELS = [
  {
    model: "Purchase Propensity",
    output: "84%",
    label: "Likely to upgrade card",
    confidence: 84,
    color: COLORS.blue,
    type: "PROPENSITY",
    delay: 0.4,
  },
  {
    model: "Churn Prediction",
    output: "Low Risk",
    label: "8% churn probability",
    confidence: 92,
    color: COLORS.green,
    type: "RISK",
    delay: 0.55,
  },
  {
    model: "Credit Eligibility",
    output: "HIGH",
    label: "Pre-approved for premium tier",
    confidence: 97,
    color: "#059669",
    type: "ELIGIBILITY",
    delay: 0.7,
  },
  {
    model: "Next Best Offer",
    output: "Travel Rewards Card",
    label: "Premium travel benefits",
    confidence: 81,
    color: COLORS.purple,
    type: "RECOMMENDATION",
    delay: 0.85,
  },
  {
    model: "Product Affinity",
    output: "Credit Cards",
    label: "Travel · Rewards categories",
    confidence: 89,
    color: "#0891B2",
    type: "AFFINITY",
    delay: 1.0,
  },
  {
    model: "Risk Signal",
    output: "LOW",
    label: "No anomalous behaviour detected",
    confidence: 95,
    color: COLORS.amber,
    type: "RISK SIGNAL",
    delay: 1.15,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN * 0.8, delayChildren: 0.35 } },
};

export default function Scene06AIAgents(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={6} title="AI Intelligence">
      <div style={{ width: "100%", maxWidth: 860 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          AI Analysis Engine
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
          ai intelligence.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 28 }}
        >
          Six models analyse Mirza's unified profile simultaneously.
        </motion.p>

        {/* Input indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            background: COLORS.muted,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            marginBottom: 24,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue}, #1D4ED8)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>S</span>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: COLORS.fg }}>Input: Mirza's Prospect 360 Profile</p>
            <p style={{ fontSize: 11, color: COLORS.fgMuted }}>9 data dimensions · Real-time enrichment</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            style={{
              marginLeft: "auto",
              width: 18, height: 18,
              border: `2px solid ${COLORS.border}`,
              borderTopColor: COLORS.blue,
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
        </motion.div>

        {/* AI model cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {AI_MODELS.map(({ model, output, label, confidence, color, type }) => (
            <motion.div
              key={model}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.93 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
              }}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}20`,
                borderRadius: 14,
                padding: "16px 14px",
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
                color, marginBottom: 6,
              }}>{type}</p>

              <p style={{
                fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                fontSize: 13, color: COLORS.fg, marginBottom: 2,
              }}>{model}</p>

              <p style={{
                fontFamily: "var(--font-space-grotesk)", fontWeight: 900,
                fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                color, letterSpacing: "-0.02em", marginBottom: 4,
              }}>{output}</p>

              <p style={{ fontSize: 11, color: COLORS.fgMuted, marginBottom: 10 }}>{label}</p>

              {/* Confidence bar */}
              <div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 4, fontSize: 10,
                  color: COLORS.fgMuted,
                  fontFamily: "var(--font-jetbrains-mono)",
                }}>
                  <span>Confidence</span>
                  <span style={{ color }}>{confidence}%</span>
                </div>
                <div style={{
                  height: 4, background: COLORS.muted, borderRadius: 2, overflow: "hidden",
                }}>
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1.0, ease: EASE_OUT }}
                    style={{
                      height: "100%",
                      width: `${confidence}%`,
                      background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Important disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: 12,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.5 }}>
            <strong>AI provides recommendations — not decisions.</strong> Business teams review,
            approve, and remain accountable for every customer interaction. See next scene.
          </p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
