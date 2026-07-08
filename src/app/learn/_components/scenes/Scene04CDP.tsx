"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const FRAGMENTS = [
  { label: "Cookie", value: "abc_7f3k9d", system: "Analytics Platform", color: COLORS.blue, delay: 0.3 },
  { label: "Email Address", value: "mirza@example.com", system: "Marketing Stack", color: COLORS.purple, delay: 0.5 },
  { label: "CRM ID", value: "CRM-4829-XK", system: "Salesforce CRM", color: "#0891B2", delay: 0.7 },
  { label: "Device Fingerprint", value: "iPhone 15 · iOS 17", system: "Mobile SDK", color: "#059669", delay: 0.9 },
  { label: "Customer Number", value: "ACC-00291847", system: "Core Banking", color: "#D97706", delay: 1.1 },
  { label: "Email Hash", value: "SHA256 · masked", system: "Ad Platform", color: "#7C3AED", delay: 1.3 },
];

export default function Scene04CDP(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={4} title="One Identity">
      <div style={{ width: "100%", maxWidth: 800 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Identity Resolution
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
          one identity.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 32 }}
        >
          Six fragmented records — resolved into one trusted customer identity.
        </motion.p>

        {/* Fragments grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 24,
        }}>
          {FRAGMENTS.map(({ label, value, system, color, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay, duration: 0.5, ease: EASE_OUT }}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}22`,
                borderRadius: 12,
                padding: "14px 14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: color,
              }} />
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color, marginBottom: 4,
              }}>{label}</p>
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: 11,
                color: COLORS.fg, marginBottom: 4, wordBreak: "break-all",
              }}>{value}</p>
              <p style={{ fontSize: 10, color: COLORS.fgMuted }}>{system}</p>
            </motion.div>
          ))}
        </div>

        {/* Resolution arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginBottom: 24,
          }}
        >
          <motion.div
            animate={{ scaleY: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <div style={{ width: 1, height: 20, background: COLORS.blue, opacity: 0.4 }} />
            <svg width="14" height="8" viewBox="0 0 14 8">
              <polygon points="7,8 0,0 14,0" fill={COLORS.blue} opacity="0.6" />
            </svg>
          </motion.div>
          <span style={{
            fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: COLORS.blue,
          }}>identity resolution</span>
        </motion.div>

        {/* Unified identity card */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.7, ease: EASE_OUT }}
          style={{
            background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
            border: `2px solid ${COLORS.blue}`,
            borderRadius: 18,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 8px 32px rgba(37,99,235,0.12)",
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1D4ED8 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
          }}>
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 24, color: "#fff" }}>S</span>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: COLORS.blue, marginBottom: 4,
            }}>Unified Customer Identity</p>
            <p style={{
              fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
              fontSize: 20, color: COLORS.fg, marginBottom: 2,
            }}>Mirza — PRS-00291847</p>
            <p style={{ fontSize: 12, color: COLORS.fgSecondary }}>
              6 identifiers resolved · Trust score: 97% · Last updated: real-time
            </p>
          </div>

          <div style={{
            padding: "8px 14px",
            background: "#DEF7EC",
            border: "1px solid #6EE7B7",
            borderRadius: 20,
            flexShrink: 0,
          }}>
            <p style={{
              fontFamily: "var(--font-jetbrains-mono)", fontSize: 10,
              letterSpacing: "0.12em", color: "#065F46", fontWeight: 700,
            }}>RESOLVED ✓</p>
          </div>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
