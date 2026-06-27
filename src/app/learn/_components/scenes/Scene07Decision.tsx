"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const STEPS = [
  {
    id: 1,
    role: "AI Engine",
    action: "Recommendation Generated",
    detail: "Travel Rewards Card · 84% purchase propensity · Low risk signal",
    icon: "🤖",
    color: COLORS.blue,
    bg: "#EFF6FF",
    border: COLORS.blueMid,
    tag: "AUTOMATED",
    tagBg: "#DBEAFE",
    tagColor: "#1E40AF",
  },
  {
    id: 2,
    role: "Marketing Analyst",
    action: "Campaign Logic Reviewed",
    detail: "Validates offer eligibility, audience segment, and messaging strategy against brand guidelines.",
    icon: "👩‍💼",
    color: COLORS.purple,
    bg: "#F5F3FF",
    border: "#DDD6FE",
    tag: "HUMAN REVIEW",
    tagBg: "#EDE9FE",
    tagColor: "#5B21B6",
  },
  {
    id: 3,
    role: "Compliance Officer",
    action: "Regulatory Check Passed",
    detail: "Confirms compliance with FCRA, ECOA, and applicable financial marketing regulations.",
    icon: "⚖️",
    color: "#0891B2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
    tag: "COMPLIANCE",
    tagBg: "#CFFAFE",
    tagColor: "#0E7490",
  },
  {
    id: 4,
    role: "Business Leader",
    action: "Activation Approved",
    detail: "Senior business stakeholder grants final approval. Budget, reach, and timing confirmed.",
    icon: "👔",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    tag: "BUSINESS APPROVAL",
    tagBg: "#FEF3C7",
    tagColor: "#92400E",
  },
  {
    id: 5,
    role: "Campaign Published",
    action: "CDP Activates in Real Time",
    detail: "Sarah's personalised experience is now live across email, web, and mobile.",
    icon: "✅",
    color: COLORS.green,
    bg: "#ECFDF5",
    border: "#6EE7B7",
    tag: "LIVE",
    tagBg: "#D1FAE5",
    tagColor: "#065F46",
  },
];

export default function Scene07Decision(_props: Props) {
  return (
    <SceneWrapper sceneIndex={7} title="Human Accountability">
      <div style={{ width: "100%", maxWidth: 680 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Scene 08 · Human-in-the-Loop Governance
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
          human accountability.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 32 }}
        >
          AI accelerates analysis. Humans remain accountable for every decision.
        </motion.p>

        {/* Governance flow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={step.id}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.4, duration: 0.6, ease: EASE_OUT }}
                style={{
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                {/* Icon + step number */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 4, flexShrink: 0,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: step.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                    boxShadow: `0 4px 12px ${step.color}30`,
                  }}>
                    {step.icon}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                    letterSpacing: "0.12em", color: step.color, fontWeight: 700,
                  }}>STEP 0{step.id}</span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <p style={{
                      fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                      fontSize: 14, color: step.color,
                    }}>{step.role}</p>
                    <span style={{
                      padding: "2px 8px",
                      background: step.tagBg, color: step.tagColor,
                      borderRadius: 20, fontSize: 10,
                      fontFamily: "var(--font-jetbrains-mono)",
                      letterSpacing: "0.1em",
                    }}>{step.tag}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-space-grotesk)", fontWeight: 600,
                    fontSize: 15, color: COLORS.fg, marginBottom: 4,
                  }}>{step.action}</p>
                  <p style={{ fontSize: 12, color: COLORS.fgSecondary, lineHeight: 1.5 }}>
                    {step.detail}
                  </p>
                </div>
              </motion.div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.4 + 0.3 }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", margin: "4px 0",
                  }}
                >
                  <div style={{ width: 1, height: 14, background: COLORS.border }} />
                  <svg width="10" height="6" viewBox="0 0 10 6">
                    <polygon points="5,6 0,0 10,0" fill={COLORS.border} />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Principle statement */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          style={{
            marginTop: 24,
            padding: "14px 20px",
            background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)",
            border: `1px solid ${COLORS.blueMid}`,
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: "#1E40AF", lineHeight: 1.6 }}>
            <strong>Responsible AI in financial services:</strong> Artificial intelligence accelerates
            analysis and recommends the next best action — but business teams remain accountable
            for campaign strategy, customer fairness, compliance, and regulatory approval.
          </p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
