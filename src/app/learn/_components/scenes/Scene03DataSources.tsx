"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const STEPS = [
  {
    id: 1,
    title: "Customer Interaction",
    desc: "Sarah visits your website and sees a product promotion.",
    icon: "👤",
    color: COLORS.blue,
    bg: "#EFF6FF",
    border: COLORS.blueMid,
  },
  {
    id: 2,
    title: "Consent Banner",
    desc: "A clear, compliant consent notice is displayed before any data collection begins.",
    icon: "📋",
    color: COLORS.purple,
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
  {
    id: 3,
    title: "Privacy Preference Centre",
    desc: "Sarah chooses exactly what she permits — marketing, analytics, personalisation. Granular control. Full transparency.",
    icon: "⚙️",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    expanded: true,
    prefs: [
      { label: "Personalised Offers", on: true },
      { label: "Analytics & Insights", on: true },
      { label: "Third-party Sharing", on: false },
    ],
  },
  {
    id: 4,
    title: "Consent Captured",
    desc: "Sarah's preferences are recorded with a timestamp, jurisdiction, and legal basis.",
    icon: "✅",
    color: COLORS.green,
    bg: "#ECFDF5",
    border: "#6EE7B7",
  },
  {
    id: 5,
    title: "Approved Data Enters CDP",
    desc: "Only the data Sarah has explicitly authorised flows into the Customer Data Platform. Nothing else.",
    icon: "🔐",
    color: "#1D4ED8",
    bg: "#DBEAFE",
    border: "#93C5FD",
  },
];

export default function Scene03DataSources(_props: Props) {
  return (
    <SceneWrapper sceneIndex={3} title="Consent First">
      <div style={{ width: "100%", maxWidth: 640 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Scene 04 · Consent Management
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
          consent first.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 36 }}
        >
          Data collection begins only with explicit customer permission.
        </motion.p>

        {/* Vertical flow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={step.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.35, duration: 0.55, ease: EASE_OUT }}
                style={{
                  width: "100%",
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  borderRadius: 14,
                  padding: "18px 20px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                {/* Step number + icon */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: step.color, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>
                    {step.icon}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                    letterSpacing: "0.12em", color: step.color, fontWeight: 700,
                  }}>0{step.id}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                    fontSize: 15, color: COLORS.fg, marginBottom: 4,
                  }}>{step.title}</p>
                  <p style={{ fontSize: 13, color: COLORS.fgSecondary, lineHeight: 1.5 }}>{step.desc}</p>

                  {/* Expanded privacy preferences */}
                  {step.prefs && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.35 + 0.3 }}
                      style={{
                        marginTop: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        padding: "10px 12px",
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.9)",
                      }}
                    >
                      {step.prefs.map(({ label, on }) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 12, color: COLORS.fg }}>{label}</span>
                          <div style={{
                            width: 34, height: 18, borderRadius: 9,
                            background: on ? COLORS.green : "#D1D5DB",
                            position: "relative",
                            transition: "background 0.2s",
                          }}>
                            <div style={{
                              position: "absolute",
                              top: 2, left: on ? 18 : 2,
                              width: 14, height: 14,
                              borderRadius: "50%",
                              background: "#FFFFFF",
                              transition: "left 0.2s",
                            }} />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Connector arrow between steps */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.35 + 0.2 }}
                  style={{
                    alignSelf: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "4px 0",
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

        {/* Compliance note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          style={{
            marginTop: 24,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, color: COLORS.fgMuted, textAlign: "center",
            letterSpacing: "0.08em",
          }}
        >
          GDPR · CCPA · PIPEDA compliant · Full audit trail maintained
        </motion.p>
      </div>
    </SceneWrapper>
  );
}
