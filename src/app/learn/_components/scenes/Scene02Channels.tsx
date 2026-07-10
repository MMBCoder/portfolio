"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_FAST } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const SOURCES = [
  { label: "Digital Advertising", icon: "📢", color: "#2563EB" },
  { label: "Partner Marketplace", icon: "🤝", color: "#D97706" },
  { label: "Prescreen Offer", icon: "✉️", color: "#059669" },
  { label: "Bank Website", icon: "🖥️", color: "#7C3AED" },
  { label: "Mobile App", icon: "📱", color: "#0891B2" },
  { label: "Paid Search", icon: "🔍", color: "#DC2626" },
];

const LISTENERS = [
  { label: "JavaScript SDK", tech: "Web events" },
  { label: "Mobile SDK", tech: "iOS · Android" },
  { label: "Event Collector", tech: "Server-side" },
  { label: "REST API", tech: "Real-time push" },
  { label: "Batch Upload", tech: "CRM · data warehouse" },
  { label: "Webhook", tech: "Partner systems" },
];

const EVENTS = [
  { label: "Ad Click", type: "ENGAGE", color: COLORS.blue },
  { label: "Marketplace Compare", type: "BROWSE", color: COLORS.purple },
  { label: "Prescreen Match", type: "SIGNAL", color: "#D97706" },
  { label: "Application Started", type: "CONVERSION", color: COLORS.green },
  { label: "Application Abandoned", type: "SIGNAL", color: "#D97706" },
  { label: "Email Open", type: "ENGAGE", color: COLORS.blue },
  { label: "Site Return Visit", type: "BROWSE", color: COLORS.purple },
  { label: "Support Chat", type: "SERVICE", color: "#DC2626" },
];

export default function Scene02Channels(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={2} title="Every Event Matters">
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
          Event Capture
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
          every event matters.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 32 }}
        >
          As Mirza shops for the right card, listeners capture every signal in real time.
        </motion.p>

        {isMobile ? (
          /* ── Mobile: stacked view ── */
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard title="Event Listeners" delay={0.3}>
              {LISTENERS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, ease: EASE_OUT }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 0", borderBottom: i < LISTENERS.length - 1 ? `1px solid ${COLORS.border}` : "none",
                  }}
                >
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: COLORS.blue, flexShrink: 0,
                  }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: COLORS.fg }}>{l.label}</p>
                    <p style={{ fontSize: 11, color: COLORS.fgMuted, fontFamily: "var(--font-jetbrains-mono)" }}>{l.tech}</p>
                  </div>
                </motion.div>
              ))}
            </SectionCard>

            <SectionCard title="Events Captured" delay={0.8}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {EVENTS.map(({ label, type, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.07 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "5px 10px",
                      background: `${color}0f`,
                      border: `1px solid ${color}28`,
                      borderRadius: 20, fontSize: 11,
                    }}
                  >
                    <span style={{ fontWeight: 600, color }}>{type}</span>
                    <span style={{ color: COLORS.fg }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </SectionCard>
          </div>
        ) : (
          /* ── Desktop: 3-column layout ── */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 1fr", gap: 0, alignItems: "start" }}>

            {/* Left: Sources */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, ease: EASE_OUT }}
              style={{
                background: COLORS.muted,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "16px 0 0 16px",
                padding: "20px 18px",
              }}
            >
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.fgMuted, marginBottom: 14,
              }}>Signal Sources</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SOURCES.map(({ label, icon, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, ease: EASE_OUT }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px",
                      background: "#FFFFFF",
                      border: `1px solid ${color}1a`,
                      borderRadius: 10,
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.fg }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center: live signal stream — packets travelling source → listener */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              paddingTop: 80, gap: 8,
            }}>
              <div style={{ position: "relative", width: 96, height: 60 }}>
                {/* stream rail */}
                <div style={{
                  position: "absolute", top: "50%", left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent 0%, ${COLORS.blue}55 50%, transparent 100%)`,
                }} />
                {/* travelling packets at three depths */}
                {[
                  { c: COLORS.blue,   delay: 0,    dur: 1.6, y: -10, size: 7 },
                  { c: COLORS.purple, delay: 0.55, dur: 1.9, y: 0,   size: 6 },
                  { c: "#D97706",     delay: 1.1,  dur: 1.7, y: 10,  size: 5 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    animate={{ x: [-8, 92], opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.7] }}
                    transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                    style={{
                      position: "absolute", top: `calc(50% + ${p.y}px - ${p.size / 2}px)`, left: 0,
                      width: p.size, height: p.size, borderRadius: "50%",
                      background: p.c,
                      boxShadow: `0 0 10px ${p.c}88`,
                    }}
                  />
                ))}
              </div>
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: COLORS.blue, textAlign: "center",
              }}>real-time</p>
            </div>

            {/* Right: Listener types + events */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, ease: EASE_OUT }}
                style={{
                  background: "#EFF6FF",
                  border: `1px solid ${COLORS.blueMid}`,
                  borderRadius: "0 16px 0 0",
                  padding: "16px 18px",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: COLORS.blue, marginBottom: 12,
                }}>Listeners</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {LISTENERS.map(({ label, tech }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      style={{
                        padding: "5px 10px",
                        background: "#DBEAFE",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#1E40AF" }}>{label}</span>
                      <span style={{ color: "#3B82F6", marginLeft: 4 }}>· {tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, ease: EASE_OUT }}
                style={{
                  background: COLORS.muted,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "0 0 16px 0",
                  padding: "16px 18px",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: COLORS.fgMuted, marginBottom: 12,
                }}>Events Captured</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {EVENTS.map(({ label, type, color }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * STAGGER_FAST, ease: EASE_OUT }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span style={{
                        fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                        letterSpacing: "0.12em", color, fontWeight: 700,
                        width: 78, flexShrink: 0,
                      }}>{type}</span>
                      <span style={{ fontSize: 12, color: COLORS.fg }}>{label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}

function SectionCard({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: EASE_OUT }}
      style={{
        background: COLORS.muted,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14, padding: "16px 14px",
      }}
    >
      <p style={{
        fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: COLORS.fgMuted, marginBottom: 12,
      }}>{title}</p>
      {children}
    </motion.div>
  );
}
