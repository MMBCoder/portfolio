"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import PulsingDot from "../shared/PulsingDot";
import { COLORS, STAGGER_CHILDREN, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const IDENTITY_SIGNALS = [
  { label: "Cookie ID", value: "usr_8f3k2m9x", color: COLORS.blue },
  { label: "Email", value: "alex.c@email.com", color: COLORS.purple },
  { label: "Device ID", value: "iOS · Safari", color: COLORS.cyan },
  { label: "CRM ID", value: "CRM-70041822", color: COLORS.green },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.6 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function Scene01Customer(_props: Props) {
  return (
    <SceneWrapper sceneIndex={1} title="Meet the Customer">
      <div style={{ width: "100%", maxWidth: 680, textAlign: "center" }}>

        {/* Scene label */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.18em",
            textTransform: "uppercase", color: COLORS.fgMuted,
            marginBottom: 24,
          }}
        >
          Scene 01 · The Customer
        </motion.p>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
        >
          <div style={{
            width: 96, height: 96, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, boxShadow: `0 0 0 6px rgba(37,99,235,0.08), 0 0 0 12px rgba(37,99,235,0.04)`,
          }}>
            👤
          </div>
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", marginBottom: 8,
          }}
        >
          alex chen.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 15, color: COLORS.fgSecondary,
            marginBottom: 48, lineHeight: 1.6,
          }}
        >
          A real customer with a digital life — across devices, channels, and moments.
        </motion.p>

        {/* Identity signals */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          {IDENTITY_SIGNALS.map((sig) => (
            <motion.div
              key={sig.label}
              variants={item}
              style={{
                background: COLORS.muted,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "12px 16px",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <PulsingDot color={sig.color} size={8} />
              <div>
                <div style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11, color: COLORS.fgMuted,
                  letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3,
                }}>
                  {sig.label}
                </div>
                <div style={{ fontSize: 14, color: COLORS.fg, fontWeight: 600 }}>
                  {sig.value}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            marginTop: 40,
            fontSize: 13, color: COLORS.fgMuted,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            letterSpacing: "0.08em",
          }}
        >
          Multiple identities · One real person
        </motion.p>
      </div>
    </SceneWrapper>
  );
}
