"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import PulsingDot from "../shared/PulsingDot";
import { COLORS, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const SOURCES = [
  { label: "Website",     tech: "JavaScript SDK",           icon: "🌐", color: COLORS.blue },
  { label: "CRM",         tech: "Salesforce · REST API",    icon: "🗂️", color: COLORS.purple },
  { label: "POS",         tech: "In-store · Batch SFTP",    icon: "🏪", color: COLORS.amber },
  { label: "Email",       tech: "Salesforce Mktg Cloud",    icon: "📧", color: COLORS.green },
  { label: "Marketplace", tech: "Event Stream · Kafka",     icon: "🛒", color: COLORS.cyan },
  { label: "Mobile",      tech: "iOS · Android SDK",        icon: "📱", color: "#8B5CF6" },
  { label: "Support",     tech: "Zendesk · Webhook",        icon: "🎧", color: "#EF4444" },
];

const FLOW_DOTS = [0, 1, 2, 3, 4];

export default function Scene03DataSources(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={2} title="Enterprise Data Sources">
      <div style={{ width: "100%", maxWidth: isMobile ? "100%" : 920 }}>

        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.18em",
            textTransform: "uppercase", color: COLORS.fgMuted,
            marginBottom: 8, textAlign: "center",
          }}
        >
          Scene 03 · Data Sources
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: isMobile ? "1.5rem" : "clamp(1.7rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 4,
          }}
        >
          data flows from every system.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: isMobile ? 13 : 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: isMobile ? 20 : 28 }}
        >
          Seven enterprise systems continuously stream events into the CDP.
        </motion.p>

        {isMobile ? (
          /* ── MOBILE: CDP box on top, sources grid below ── */
          <>
            {/* CDP node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.55, ease: EASE_OUT }}
              style={{
                background: `linear-gradient(145deg, ${COLORS.blue}, ${COLORS.purple})`,
                borderRadius: 16,
                padding: "20px 16px",
                color: "#FFFFFF",
                boxShadow: `0 0 0 6px rgba(37,99,235,0.08), 0 6px 24px rgba(37,99,235,0.2)`,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                style={{ fontSize: 32, marginBottom: 8 }}
              >
                ⚡
              </motion.div>
              <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                BlueConic CDP
              </div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                Customer Data Platform
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
                {[
                  { k: "Streams", v: "7 / 7" },
                  { k: "Events/sec", v: "14,200" },
                  { k: "Profiles", v: "70M+" },
                  { k: "Latency", v: "< 200ms" },
                ].map((row) => (
                  <div key={row.k} style={{ textAlign: "left", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", fontSize: 12 }}>
                    <div style={{ opacity: 0.7, fontSize: 10 }}>{row.k}</div>
                    <div style={{ fontWeight: 700 }}>{row.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <PulsingDot color="#FFFFFF" size={6} delay={1.0} />
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, opacity: 0.8 }}>Ingesting live</span>
              </div>
            </motion.div>

            {/* Down arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ textAlign: "center", fontSize: 18, color: COLORS.blue, marginBottom: 12 }}
            >
              ↑ streams from
            </motion.div>

            {/* Source cards 2-col grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {SOURCES.map((src, i) => (
                <motion.div
                  key={src.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.08, duration: 0.4, ease: EASE_OUT }}
                  style={{
                    gridColumn: i === SOURCES.length - 1 ? "1 / -1" : undefined,
                    background: "#FFFFFF",
                    border: `1.5px solid ${src.color}30`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: `0 2px 8px ${src.color}10`,
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{src.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.fg, marginBottom: 1 }}>{src.label}</div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: COLORS.fgMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{src.tech}</div>
                  </div>
                  <PulsingDot color={src.color} size={7} delay={1.0 + i * 0.08} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* ── DESKTOP: Sources | Connector | CDP ── */
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 72px 280px",
              gap: 0,
              alignItems: "center",
            }}>
              {/* LEFT: Source cards 2-column grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {SOURCES.map((src, i) => (
                  <motion.div
                    key={src.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.45, ease: EASE_OUT }}
                    style={{
                      gridColumn: i === SOURCES.length - 1 ? "1 / -1" : undefined,
                      background: "#FFFFFF",
                      border: `1.5px solid ${src.color}30`,
                      borderRadius: 12,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      boxShadow: `0 2px 10px ${src.color}10`,
                    }}
                  >
                    <span style={{ fontSize: 26, flexShrink: 0 }}>{src.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.fg, marginBottom: 3 }}>{src.label}</div>
                      <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: COLORS.fgMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{src.tech}</div>
                    </div>
                    <PulsingDot color={src.color} size={8} delay={0.5 + i * 0.12} />
                  </motion.div>
                ))}
              </div>

              {/* CENTER: Animated flow connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, height: "100%", padding: "0 8px" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: COLORS.fgMuted, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", marginBottom: 8 }}
                >
                  Stream
                </motion.div>
                {FLOW_DOTS.map((dotIdx) => (
                  <motion.div
                    key={dotIdx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: [0, 0.9, 0], x: [-6, 6, 18] }}
                    transition={{ delay: 1.5 + dotIdx * 0.25, duration: 1.0, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                    style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.blue, flexShrink: 0 }}
                  />
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  style={{ fontSize: 20, color: COLORS.blue, marginTop: 4 }}
                >
                  →
                </motion.div>
              </div>

              {/* RIGHT: CDP node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.65, ease: EASE_OUT }}
                style={{
                  background: `linear-gradient(145deg, ${COLORS.blue}, ${COLORS.purple})`,
                  borderRadius: 20,
                  padding: "28px 24px",
                  color: "#FFFFFF",
                  boxShadow: `0 0 0 8px rgba(37,99,235,0.08), 0 8px 32px rgba(37,99,235,0.2)`,
                  textAlign: "center",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  style={{ fontSize: 44, marginBottom: 12 }}
                >
                  ⚡
                </motion.div>
                <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 4 }}>
                  BlueConic CDP
                </div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, opacity: 0.75, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                  Customer Data Platform
                </div>
                {[
                  { k: "Streams active", v: "7 / 7" },
                  { k: "Events / sec",   v: "14,200" },
                  { k: "Profiles",       v: "70M+" },
                  { k: "Latency",        v: "< 200ms" },
                ].map((row) => (
                  <div key={row.k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", fontSize: 13 }}>
                    <span style={{ opacity: 0.7 }}>{row.k}</span>
                    <span style={{ fontWeight: 700 }}>{row.v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <PulsingDot color="#FFFFFF" size={7} delay={2.0} />
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, opacity: 0.8 }}>Ingesting live</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom: source tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 20 }}
            >
              {SOURCES.map((src) => (
                <span
                  key={src.label}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: COLORS.muted, border: `1px solid ${COLORS.border}`, fontSize: 12, color: COLORS.fgSecondary, fontWeight: 500 }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: src.color, flexShrink: 0 }} />
                  {src.label}
                </span>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </SceneWrapper>
  );
}
