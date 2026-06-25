"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const STEPS = [
  { icon: "📧", label: "Email received", detail: "Tuesday 9:02 AM", color: COLORS.blue, delay: 0.3 },
  { icon: "👆", label: "Email opened", detail: "Open rate recorded · CDP event fired", color: COLORS.blue, delay: 0.9 },
  { icon: "🔗", label: "Link clicked", detail: "CTA: 'Apply Now' · deep-link to app", color: COLORS.purple, delay: 1.5 },
  { icon: "📝", label: "Application started", detail: "Pre-filled form · 2 min completion", color: COLORS.purple, delay: 2.1 },
  { icon: "✅", label: "Approved instantly", detail: "ML credit decision · &lt;3 seconds", color: COLORS.green, delay: 2.7 },
  { icon: "🎉", label: "Customer activated", detail: "Card issued · Profile updated · Journey closed", color: COLORS.green, delay: 3.3 },
];

export default function Scene09Response(_props: Props) {
  const isMobile = useIsMobile();
  return (
    <SceneWrapper sceneIndex={8} title="Customer Response">
      <div style={{ width: "100%", maxWidth: 600 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12, textAlign: "center",
          }}
        >
          Scene 09 · Response
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 36,
          }}
        >
          alex acts.
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: isMobile ? 32 : 40 }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.4, duration: 3.0, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: 15, top: 8, bottom: 8, width: 2,
              background: `linear-gradient(to bottom, ${COLORS.blue}, ${COLORS.green})`,
              borderRadius: 2,
              originY: 0,
            }}
          />

          {STEPS.map((step) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay, duration: 0.45, ease: EASE_OUT }}
              style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18, position: "relative" }}
            >
              {/* Node */}
              <div style={{
                position: "absolute", left: -33, top: 6,
                width: 14, height: 14, borderRadius: "50%",
                background: step.color,
                border: "2px solid #FFFFFF",
                boxShadow: `0 0 0 3px ${step.color}25`,
                flexShrink: 0,
              }} />

              {/* Content */}
              <div style={{
                background: "#FFFFFF",
                border: `1px solid ${step.color}20`,
                borderRadius: 12,
                padding: "12px 16px",
                flex: 1,
                boxShadow: `0 2px 8px ${step.color}0A`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 18 }}>{step.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.fg }}>{step.label}</span>
                </div>
                <div style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 12, color: COLORS.fgMuted,
                }}
                  dangerouslySetInnerHTML={{ __html: step.detail }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}
