"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import PulsingDot from "../shared/PulsingDot";
import { COLORS, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const CHANNELS = [
  { icon: "📧", label: "Email", detail: "Personalised HTML · Tuesday 9AM", color: COLORS.blue, delay: 0.6 },
  { icon: "💬", label: "SMS", detail: "Short-form · opt-in confirmed", color: COLORS.green, delay: 0.8 },
  { icon: "🔔", label: "Push Notification", detail: "Mobile · deep-link to apply", color: COLORS.purple, delay: 1.0 },
  { icon: "🌐", label: "Website Personalisation", detail: "Hero banner swap · BlueConic listener", color: COLORS.cyan, delay: 1.2 },
  { icon: "🛒", label: "Marketplace", detail: "Sponsored placement · Travel category", color: COLORS.amber, delay: 1.4 },
  { icon: "🎧", label: "Call Center", detail: "Agent script updated · CRM flag set", color: "#EF4444", delay: 1.6 },
];

export default function Scene08Activation(_props: Props) {
  return (
    <SceneWrapper sceneIndex={7} title="Omnichannel Activation">
      <div style={{ width: "100%", maxWidth: 760 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12, textAlign: "center",
          }}
        >
          Scene 08 · Activation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 8,
          }}
        >
          delivering the decision.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 36 }}
        >
          The recommendation is pushed simultaneously to every active channel.
        </motion.p>

        {/* Center source */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55, ease: EASE_OUT }}
            style={{
              width: 72, height: 72, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, color: "#FFF",
              boxShadow: `0 0 0 8px rgba(37,99,235,0.08), 0 0 0 16px rgba(37,99,235,0.04)`,
            }}
          >
            ⚡
          </motion.div>

          {/* Channel grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12, width: "100%",
          }}>
            {CHANNELS.map((ch) => (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0, y: 16, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: ch.delay, duration: 0.5, ease: EASE_OUT }}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${ch.color}25`,
                  borderRadius: 14,
                  padding: "16px",
                  boxShadow: `0 2px 12px ${ch.color}0D`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{ch.icon}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <PulsingDot color={ch.color} size={6} delay={ch.delay + 0.3} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.fg }}>{ch.label}</span>
                  </div>
                </div>
                <div style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11, color: COLORS.fgMuted, lineHeight: 1.6,
                }}>
                  {ch.detail}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12, color: COLORS.fgMuted, letterSpacing: "0.1em", textAlign: "center",
            }}
          >
            Triggered in &lt;200ms · Consent-gated · Frequency-capped
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}
