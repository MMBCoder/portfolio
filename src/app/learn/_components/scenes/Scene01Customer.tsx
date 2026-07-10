"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_CHILDREN } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const CHANNELS = [
  { label: "Digital Advertising", sub: "Display · social · retargeting", icon: "📢", color: "#2563EB" },
  { label: "Partner Marketplace", sub: "Card comparison sites", icon: "🤝", color: "#D97706" },
  { label: "Prescreen Offer", sub: "Pre-approved mail & email", icon: "✉️", color: "#059669" },
  { label: "Bank Website", sub: "Online card application", icon: "🖥️", color: "#7C3AED" },
  { label: "Mobile App", sub: "Apply in-app", icon: "📱", color: "#0891B2" },
  { label: "Paid Search", sub: "Search & affiliate traffic", icon: "🔍", color: "#DC2626" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.5 } },
};
const item = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function Scene01Customer(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={1} title="Mirza's World">
      <div style={{ width: "100%", maxWidth: 860 }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Customer Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 6,
          }}
        >
          meet mirza.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 36 }}
        >
          An in-market credit card prospect, discovered across six acquisition channels.
        </motion.p>

        {/* Mirza's profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 28px",
            background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
            border: `1px solid ${COLORS.blueMid}`,
            borderRadius: 16,
            marginBottom: 28,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
          }}
        >
          {/* 3D floating boarding pass — the trip he's planning */}
          {!isMobile && (
            <div style={{ position: "absolute", top: -64, right: -120, perspective: 800, zIndex: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 12, rotateY: -18 }}
                animate={{ opacity: 1, y: [0, -7, 0], rotateY: [-18, -8, -18], rotateX: [6, 2, 6] }}
                transition={{ opacity: { delay: 1.4, duration: 0.6 }, duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                style={{
                  transformStyle: "preserve-3d",
                  width: 168,
                  background: "#FFFFFF",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  boxShadow: "0 18px 44px rgba(15,23,42,0.16)",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "8px 12px", background: "linear-gradient(90deg, #1D4ED8, #2563EB)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 8, letterSpacing: "0.14em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>Boarding Pass</span>
                  <span style={{ fontSize: 11 }}>✈️</span>
                </div>
                <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 900, fontSize: 17, color: COLORS.fg, letterSpacing: "-0.02em" }}>HYD</div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 7, color: COLORS.fgMuted, letterSpacing: "0.1em" }}>HYDERABAD</div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: COLORS.blue, fontSize: 12 }}
                  >
                    ──✈──
                  </motion.div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 900, fontSize: 17, color: COLORS.fg, letterSpacing: "-0.02em" }}>SIN</div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 7, color: COLORS.fgMuted, letterSpacing: "0.1em" }}>SINGAPORE</div>
                  </div>
                </div>
                <div style={{ padding: "6px 12px 9px", borderTop: `1px dashed ${COLORS.border}`, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 7.5, color: COLORS.fgMuted, letterSpacing: "0.08em" }}>FAMILY · 4 SEATS</span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 7.5, color: "#059669", letterSpacing: "0.08em" }}>BOOKED ✓</span>
                </div>
              </motion.div>
            </div>
          )}
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1D4ED8 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
          }}>
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 22, color: "#fff" }}>M</span>
          </div>
          <div>
            <p style={{
              fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
              fontSize: 18, color: COLORS.fg, marginBottom: 2,
            }}>Mirza</p>
            <p style={{ fontSize: 13, color: COLORS.fgSecondary }}>
              In-market Credit Card Prospect · High Intent · Not Yet a Customer
            </p>
          </div>
          <div style={{
            marginLeft: "auto",
            padding: "5px 12px",
            background: "#DEF7EC",
            border: "1px solid #6EE7B7",
            borderRadius: 20,
            fontSize: 12,
            color: "#065F46",
            fontFamily: "var(--font-jetbrains-mono)",
            whiteSpace: "nowrap",
          }}>
            Prospect
          </div>
        </motion.div>

        {/* Channels grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {CHANNELS.map(({ label, sub, icon, color }) => (
            <motion.div
              key={label}
              variants={item}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}20`,
                borderRadius: 14,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: color,
              }} />
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <p style={{
                  fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                  fontSize: 13, color: COLORS.fg, marginBottom: 2,
                }}>{label}</p>
                <p style={{ fontSize: 11, color: COLORS.fgMuted }}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Insight banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            background: "#FFF7ED",
            border: "1px solid #FED7AA",
            borderRadius: 12,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ fontSize: 13, color: "#9A3412", lineHeight: 1.5 }}>
            <strong>Six acquisition channels. Zero connected views.</strong> Mirza is a different person in every system.
            No team knows they are all chasing the same prospect.
          </p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
