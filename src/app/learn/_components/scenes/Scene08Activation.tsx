"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const CHANNELS = [
  { label: "Personalised Email", time: "1.2s", icon: "✉️", color: COLORS.blue, detail: "Subject: \"Mirza, your card application is 3 fields from done\"" },
  { label: "Website Banner", time: "0.8s", icon: "🖥️", color: COLORS.purple, detail: "Dynamic hero banner · 3-click application flow" },
  { label: "Mobile Notification", time: "1.5s", icon: "📱", color: "#0891B2", detail: "Push · \"Complete your Premium Card application\"" },
  { label: "Call Centre Context", time: "2.1s", icon: "🎧", color: COLORS.green, detail: "Agent briefed with Mirza's profile and offer details" },
  { label: "Ad Suppression", time: "0.5s", icon: "🚫", color: "#D97706", detail: "Retargeting paused — organic journey in progress" },
  { label: "Chat Trigger", time: "1.8s", icon: "💬", color: "#DC2626", detail: "Proactive chat offer on return visit · 72-hour window" },
];

export default function Scene08Activation(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={8} title="Activated in Real Time">
      <div style={{ width: "100%", maxWidth: 880 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Real-Time Activation
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
          activated in real time.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 24 }}
        >
          The CDP re-engages Mirza across every channel simultaneously.
        </motion.p>

        {/* Trigger event */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, ease: EASE_OUT }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px",
            background: "#FFF7ED",
            border: "1.5px solid #FED7AA",
            borderRadius: 14,
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 24 }}>⚡</div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
              letterSpacing: "0.16em", color: "#D97706", marginBottom: 2,
            }}>TRIGGER EVENT · 09:42 AM</p>
            <p style={{
              fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
              fontSize: 15, color: COLORS.fg,
            }}>
              Mirza abandoned his Premier Card application — 3 fields from completion
            </p>
          </div>
          <div style={{
            padding: "5px 12px", background: "#FEF3C7",
            border: "1px solid #FDE68A", borderRadius: 20,
            fontSize: 10, color: "#92400E",
            fontFamily: "var(--font-jetbrains-mono)", flexShrink: 0,
          }}>
            HIGH INTENT
          </div>
        </motion.div>

        {/* CDP hub + channel cards */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}>
          {/* CDP hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 24px",
              background: `linear-gradient(135deg, ${COLORS.blue}10, ${COLORS.blue}1a)`,
              border: `2px solid ${COLORS.blue}`,
              borderRadius: 14,
              boxShadow: `0 0 0 4px ${COLORS.blue}10`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 10, height: 10, borderRadius: "50%",
                background: COLORS.blue,
                boxShadow: `0 0 12px ${COLORS.blue}`,
              }}
            />
            <span style={{
              fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
              fontSize: 16, color: COLORS.blue,
            }}>CDP Activation Engine</span>
            <span style={{
              fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
              color: COLORS.blue, letterSpacing: "0.12em",
            }}>· LIVE</span>
          </motion.div>

          {/* Activation channels */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 8,
            width: "100%",
          }}>
            {CHANNELS.map(({ label, time, icon, color, detail }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.18, duration: 0.5, ease: EASE_OUT }}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${color}20`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
                  background: color,
                }} />
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <p style={{
                      fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                      fontSize: 13, color: COLORS.fg,
                    }}>{label}</p>
                    <span style={{
                      fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
                      color, fontWeight: 700, letterSpacing: "0.06em",
                    }}>↗ {time}</span>
                  </div>
                  <p style={{ fontSize: 11, color: COLORS.fgMuted, lineHeight: 1.4 }}>{detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timing summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Activation Latency", value: "< 200ms" },
            { label: "Channels Activated", value: "6 simultaneously" },
            { label: "Personalisation Signals", value: "9 dimensions" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-space-grotesk)", fontWeight: 900,
                fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                color: COLORS.blue, letterSpacing: "-0.02em", marginBottom: 2,
              }}>{value}</p>
              <p style={{ fontSize: 11, color: COLORS.fgMuted }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
