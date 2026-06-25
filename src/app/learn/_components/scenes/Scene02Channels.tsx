"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import PulsingDot from "../shared/PulsingDot";
import { COLORS, STAGGER_CHILDREN, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const CHANNELS = [
  { icon: "🌐", label: "Website", event: "page_view · product_browse", color: COLORS.blue },
  { icon: "📱", label: "Mobile App", event: "app_open · add_to_cart", color: COLORS.purple },
  { icon: "🛒", label: "Marketplace", event: "search · wishlist_add", color: COLORS.cyan },
  { icon: "📧", label: "Email", event: "open · click · unsubscribe", color: COLORS.green },
  { icon: "🏪", label: "Offline Store", event: "pos_transaction · visit", color: COLORS.amber },
  { icon: "🎧", label: "Support Center", event: "call · chat · ticket", color: "#EF4444" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.4 } },
};
const card = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function Scene02Channels(_props: Props) {
  return (
    <SceneWrapper sceneIndex={1} title="Digital Touchpoints">
      <div style={{ width: "100%", maxWidth: 760, textAlign: "center" }}>

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em",
            textTransform: "uppercase", color: COLORS.fgMuted, marginBottom: 16,
          }}
        >
          Scene 02 · Touchpoints
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", marginBottom: 8,
          }}
        >
          every interaction is an event.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, marginBottom: 40 }}
        >
          Alex moves across six touchpoints. Each generates a real-time data event.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {CHANNELS.map((ch) => (
            <motion.div
              key={ch.label}
              variants={card}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: "20px 16px",
                textAlign: "left",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{ch.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <PulsingDot color={ch.color} size={7} />
                <span style={{
                  fontWeight: 600, fontSize: 14, color: COLORS.fg,
                }}>
                  {ch.label}
                </span>
              </div>
              <div style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, color: COLORS.fgMuted,
                letterSpacing: "0.1em", lineHeight: 1.6,
              }}>
                {ch.event}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            marginTop: 32,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <PulsingDot color={COLORS.blue} size={7} />
          <span style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12, color: COLORS.fgMuted, letterSpacing: "0.12em",
          }}>
            Events streaming in real time
          </span>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
