"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_CHILDREN } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const PROFILE_SECTIONS = [
  {
    category: "Demographics",
    color: COLORS.blue,
    items: ["Mirza M. · Age 34", "Hyderabad, IN", "Senior Product Manager"],
  },
  {
    category: "Products Owned",
    color: COLORS.purple,
    items: ["Premium Rewards Card", "Savings Account", "Home Equity Loan"],
  },
  {
    category: "Browsing Behaviour",
    color: "#0891B2",
    items: ["Credit card comparison: 4×", "Travel rewards pages: 7×", "Balance transfer info: 2×"],
  },
  {
    category: "Transaction History",
    color: COLORS.green,
    items: ["Avg. monthly spend: $3,200", "On-time payments: 100%", "7-year relationship"],
  },
  {
    category: "Email Engagement",
    color: "#D97706",
    items: ["Open rate: 68%", "Click-through: 24%", "Last opened: 2 days ago"],
  },
  {
    category: "App Activity",
    color: "#7C3AED",
    items: ["Sessions this month: 14", "Avg. session: 4.2 min", "Feature: Balance check, transfers"],
  },
  {
    category: "Support History",
    color: "#DC2626",
    items: ["Last contact: 6 months ago", "CSAT score: 4.8/5", "Channel: Mobile chat"],
  },
  {
    category: "Consent Status",
    color: COLORS.green,
    items: ["Marketing: ✓ Permitted", "Analytics: ✓ Permitted", "Third-party: ✗ Declined"],
  },
  {
    category: "AI Propensity Scores",
    color: "#1D4ED8",
    items: ["Premium upgrade: 84%", "Churn risk: Low (8%)", "Next best offer: Travel Card"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.4 } },
};

const card = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function Scene05Profile(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={5} title="Customer 360">
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
          Prospect 360
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
          customer 360.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 24 }}
        >
          A single, comprehensive view that no individual system could ever provide alone.
        </motion.p>

        {/* Mirza header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: EASE_OUT }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 22px",
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            border: `1.5px solid ${COLORS.blue}`,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue} 0%, #1D4ED8 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, boxShadow: "0 4px 12px rgba(37,99,235,0.28)",
          }}>
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 20, color: "#fff" }}>M</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 17, color: COLORS.fg }}>
              Mirza — Unified Prospect Profile
            </p>
            <p style={{ fontSize: 12, color: COLORS.blue }}>
              ACC-00291847 · 9 data dimensions · Updated in real time
            </p>
          </div>
          <div style={{
            padding: "5px 12px", background: "#DEF7EC",
            border: "1px solid #6EE7B7", borderRadius: 20,
            fontSize: 11, color: "#065F46",
            fontFamily: "var(--font-jetbrains-mono)", flexShrink: 0,
          }}>
            LIVE PROFILE
          </div>
        </motion.div>

        {/* Profile section cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {PROFILE_SECTIONS.map(({ category, color, items }) => (
            <motion.div
              key={category}
              variants={card}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}1e`,
                borderRadius: 12,
                padding: "14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: color,
              }} />
              <p style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: 9,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color, marginBottom: 8,
              }}>{category}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {items.map(item => (
                  <p key={item} style={{ fontSize: 11, color: COLORS.fg, lineHeight: 1.4 }}>
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Orbit: four teams circling the one profile — everyone sees the same Mirza */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            style={{ display: "flex", justifyContent: "center", marginTop: 28, perspective: 900 }}
          >
            <div style={{ position: "relative", width: 300, height: 190, transform: "rotateX(38deg)", transformStyle: "preserve-3d" }}>
              {/* orbit ring */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: `1.5px dashed ${COLORS.blue}45`,
              }} />
              {/* centre profile */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%) rotateX(-38deg)",
                width: 54, height: 54, borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.blue}, #1D4ED8)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 10px 28px rgba(37,99,235,0.35)",
                zIndex: 2,
              }}>
                <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 22, color: "#fff" }}>M</span>
              </div>
              {/* orbiting team badges */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", inset: 0 }}
              >
                {[
                  { label: "Marketing", color: COLORS.blue,   angle: 0 },
                  { label: "Sales",     color: COLORS.green,  angle: 90 },
                  { label: "Risk",      color: "#D97706",     angle: 180 },
                  { label: "Service",   color: COLORS.purple, angle: 270 },
                ].map(t => (
                  <div
                    key={t.label}
                    style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: `rotate(${t.angle}deg) translateX(132px)`,
                    }}
                  >
                    {/* counter-rotate: cancels both the fixed angle and the orbit spin */}
                    <motion.div
                      animate={{ rotate: [-t.angle, -t.angle - 360] }}
                      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                      style={{ marginLeft: -34, marginTop: -13 }}
                    >
                      <div style={{
                        transform: "rotateX(-38deg)",
                        padding: "6px 13px",
                        background: "#FFFFFF",
                        border: `1.5px solid ${t.color}`,
                        borderRadius: 20,
                        fontFamily: "var(--font-space-grotesk)",
                        fontWeight: 700,
                        fontSize: 11,
                        color: t.color,
                        whiteSpace: "nowrap",
                        boxShadow: "0 8px 20px rgba(15,23,42,0.12)",
                      }}>
                        {t.label}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          style={{
            marginTop: isMobile ? 20 : 10,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, color: COLORS.fgMuted, textAlign: "center", letterSpacing: "0.08em",
          }}
        >
          Every team · Marketing, Service, Risk, Sales · now sees the same Mirza
        </motion.p>
      </div>
    </SceneWrapper>
  );
}
