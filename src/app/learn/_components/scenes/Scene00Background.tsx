"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const PHRASES = [
  { text: "Every login.", weight: 700, delay: 0.3 },
  { text: "Every payment.", weight: 700, delay: 0.85 },
  { text: "Every abandoned application.", weight: 700, delay: 1.4 },
  { text: "Each one tells a story.", weight: 400, delay: 2.1 },
];

export default function Scene00Background(_props: Props) {
  return (
    <motion.section
      key={0}
      role="region"
      aria-label="Scene 01: The Opportunity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(150deg, #070c1d 0%, #0b1640 40%, #112467 75%, #1a3a8f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 28px",
      }}
    >
      {/* Ambient glow orb */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        height: 500,
        background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 760, width: "100%", position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(147,197,253,0.55)",
            marginBottom: 32,
          }}
        >
          Customer Data Platform · Financial Services
        </motion.p>

        {/* Dramatic phrases */}
        <div style={{ marginBottom: 52 }}>
          {PHRASES.map(({ text, weight, delay }) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay, duration: 0.65, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: weight,
                fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)",
                color: weight === 700 ? "#FFFFFF" : "rgba(255,255,255,0.58)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: text === "Each one tells a story." ? 0 : 4,
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.0, duration: 0.9 }}
          style={{
            height: 1,
            background: "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
            marginBottom: 40,
          }}
        />

        {/* Supporting statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.7, duration: 1.0 }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.95rem, 2vw, 1.3rem)",
            color: "rgba(191,219,254,0.75)",
            lineHeight: 1.7,
            maxWidth: 640,
            marginBottom: 52,
          }}
        >
          Inside most financial institutions, these signals remain scattered across
          dozens of disconnected systems — unheard and unrealised.
          What if every customer interaction could become an opportunity to serve
          customers better, in real time?
        </motion.p>

        {/* Signal badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.2, duration: 0.7, ease: EASE_OUT }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 26px",
            border: "1px solid rgba(59,130,246,0.38)",
            borderRadius: 100,
            background: "rgba(37,99,235,0.13)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#60A5FA",
              flexShrink: 0,
            }}
          />
          <span style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
            color: "#93C5FD",
            letterSpacing: "0.01em",
          }}>
            A Customer Data Platform changes that
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
