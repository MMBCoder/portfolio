"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const PILLARS = [
  {
    icon: "🧩",
    title: "The Problem",
    body: "Customer data is scattered across dozens of systems. A single customer leaves 50+ digital footprints daily — website, email, mobile, POS, support — none connected.",
    color: COLORS.purple,
  },
  {
    icon: "⚡",
    title: "The Solution",
    body: "A Customer Data Platform (CDP) unifies fragmented data into a real-time unified profile — enabling AI-powered personalisation at enterprise scale.",
    color: COLORS.blue,
  },
  {
    icon: "🗺️",
    title: "This Story",
    body: "Follow Alex Chen through a complete CDP journey — from first touchpoint to personalised offer, powered by BlueConic CDP + AI, in under 200ms.",
    color: COLORS.green,
  },
];

export default function Scene00Background(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={0} title="Background">
      <div style={{ width: "100%", maxWidth: 800 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Scene 00 · Background
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 8,
          }}
        >
          why this story matters.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: isMobile ? 13 : 15,
            color: COLORS.fgSecondary,
            textAlign: "center",
            marginBottom: isMobile ? 24 : 36,
            lineHeight: 1.65,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A 12-scene journey through a real Customer Data Platform — how fragmented signals become personalised experiences.
        </motion.p>

        {/* 3 pillars */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 10 : 16,
          marginBottom: isMobile ? 18 : 24,
        }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease: EASE_OUT }}
              style={{
                padding: isMobile ? "14px 14px" : "20px 18px",
                background: `${p.color}08`,
                border: `1px solid ${p.color}25`,
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: isMobile ? 20 : 24, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: p.color, marginBottom: 6 }}>{p.title}</div>
              <p style={{ fontSize: isMobile ? 12 : 13, color: COLORS.fgSecondary, lineHeight: 1.65, margin: 0 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 14 : 28,
            flexWrap: "wrap",
            padding: isMobile ? "12px 14px" : "14px 20px",
            background: COLORS.muted,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
          }}
        >
          {[
            { value: "12", label: "Scenes" },
            { value: "70M+", label: "Profiles" },
            { value: "< 200ms", label: "Activation" },
            { value: "BlueConic", label: "Platform" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 900, fontSize: isMobile ? 15 : 18,
                color: COLORS.fg, letterSpacing: "-0.02em",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 10, color: COLORS.fgMuted,
                textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
