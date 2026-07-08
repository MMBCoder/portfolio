"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const LOOP_STEPS = [
  {
    id: 1, label: "Mirza Opens Email", icon: "✉️",
    detail: "10:14 AM · Travel Rewards Card offer",
    color: COLORS.blue, delay: 0.3,
  },
  {
    id: 2, label: "Returns to Website", icon: "🖥️",
    detail: "Clicks personalised banner · Resumes application",
    color: COLORS.purple, delay: 0.6,
  },
  {
    id: 3, label: "Completes Application", icon: "✅",
    detail: "10:19 AM · Application submitted successfully",
    color: COLORS.green, delay: 0.9,
  },
  {
    id: 4, label: "CDP Captures Event", icon: "⚡",
    detail: "Conversion event ingested · Real-time processing",
    color: "#0891B2", delay: 1.2,
  },
  {
    id: 5, label: "Profile Updated", icon: "🔄",
    detail: "Status: Applicant · New segment: New Card Holder",
    color: "#D97706", delay: 1.5,
  },
  {
    id: 6, label: "AI Recalculates", icon: "🤖",
    detail: "Churn risk drops · Upsell models refresh · Suppression applied",
    color: COLORS.purple, delay: 1.8,
  },
  {
    id: 7, label: "Segments Refresh", icon: "📊",
    detail: "Moved to onboarding journey · Welcome campaign triggered",
    color: "#7C3AED", delay: 2.1,
  },
  {
    id: 8, label: "Better Future Campaigns", icon: "🎯",
    detail: "Every future Mirza interaction informed by this conversion",
    color: COLORS.green, delay: 2.4,
  },
];

export default function Scene09Response(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={9} title="Continuous Learning">
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
          Feedback Loop
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
          continuous learning.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 32 }}
        >
          Every interaction Mirza has makes the next one smarter.
        </motion.p>

        {/* Feedback loop steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 8,
          marginBottom: 28,
        }}>
          {LOOP_STEPS.map(({ id, label, icon, detail, color, delay }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: id % 2 === 0 ? 12 : -12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay, duration: 0.5, ease: EASE_OUT }}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}20`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
                background: color,
              }} />
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
              }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                    color, letterSpacing: "0.12em",
                  }}>{String(id).padStart(2, "0")}</span>
                  <p style={{
                    fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                    fontSize: 13, color: COLORS.fg,
                  }}>{label}</p>
                </div>
                <p style={{ fontSize: 11, color: COLORS.fgMuted, lineHeight: 1.45 }}>{detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loop completion badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            padding: "20px",
            background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
            border: `1.5px solid ${COLORS.green}`,
            borderRadius: 16,
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                border: `2px solid ${COLORS.green}`,
                borderTopColor: "transparent",
                borderRightColor: "transparent",
              }}
            />
            <p style={{
              fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
              fontSize: 16, color: "#065F46",
            }}>
              The loop never stops
            </p>
          </div>
          <p style={{
            fontSize: 13, color: "#047857", textAlign: "center", lineHeight: 1.55,
            maxWidth: 540,
          }}>
            Every future interaction with Mirza — every swipe, every payment, every support call —
            is now informed by what happened today. The CDP continuously refines her profile,
            her segments, and the AI models that serve her. Each cycle makes the next one more accurate.
          </p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
