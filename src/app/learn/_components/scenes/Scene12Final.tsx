"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";

interface Props {
  isPlaying: boolean;
  isTransitioning: boolean;
}

export default function Scene12Final(_props: Props) {
  return (
    <SceneWrapper sceneIndex={11} title="Intelligent Experiences">
      <div style={{ width: "100%", maxWidth: 640, textAlign: "center" }}>

        {/* Gradient orb */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          style={{
            width: 120, height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, ${COLORS.blue}, ${COLORS.purple})`,
            margin: "0 auto 32px",
            boxShadow: `0 0 0 12px rgba(37,99,235,0.07), 0 0 0 24px rgba(37,99,235,0.03)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 48,
          }}
        >
          ✦
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            letterSpacing: "-0.04em",
            color: COLORS.fg,
            textTransform: "lowercase",
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          turning customer data into intelligent experiences.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, lineHeight: 1.7, marginBottom: 8 }}
        >
          Designed and engineered by
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.3rem, 3vw, 2rem)",
            letterSpacing: "-0.03em", color: COLORS.fg,
            marginBottom: 48,
          }}
        >
          Mirza Minhaz Baig
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EASE_OUT }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          {/* Reload to replay */}
          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Replay the experience from the beginning"
            style={{
              padding: "12px 24px",
              background: COLORS.fg,
              color: "#FFFFFF",
              border: "none",
              borderRadius: 10,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 14, fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            ↺ Replay
          </motion.button>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/portfolio"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px",
                background: "transparent",
                color: COLORS.fg,
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 14, fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Explore Projects →
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px",
                background: "transparent",
                color: COLORS.fgMuted,
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10,
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 14, fontWeight: 500,
                textDecoration: "none",
              }}
            >
              ← Back to Portfolio
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            marginTop: 48,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12, color: "#CCCCCC", letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          CDP · Identity Resolution · AI Agents · Omnichannel · Enterprise Architecture
        </motion.p>
      </div>
    </SceneWrapper>
  );
}
