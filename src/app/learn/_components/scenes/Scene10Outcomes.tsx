"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_CHILDREN } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const CAPABILITIES = [
  {
    num: "01",
    title: "Real-Time Signal Capture",
    desc: "Every customer interaction captured across every channel, in real time.",
    color: COLORS.blue,
  },
  {
    num: "02",
    title: "Privacy-First Design",
    desc: "Consent management ensures every action respects customer preference and regulatory requirement.",
    color: "#0891B2",
  },
  {
    num: "03",
    title: "Unified Identity",
    desc: "Fragmented identifiers resolved into one trusted profile — across every system, every team.",
    color: COLORS.purple,
  },
  {
    num: "04",
    title: "AI-Powered Recommendations",
    desc: "Propensity models, churn prediction, and next best offer — generated from unified data.",
    color: "#D97706",
  },
  {
    num: "05",
    title: "Human Accountability",
    desc: "Every AI recommendation reviewed by a human before activation. Governance built in by design.",
    color: COLORS.green,
  },
  {
    num: "06",
    title: "Continuous Learning",
    desc: "Every customer interaction improves the model. Every cycle makes the next experience more accurate.",
    color: "#7C3AED",
  },
];

const STATS = [
  { value: "< 200ms", label: "Activation latency" },
  { value: "70M+", label: "Customer profiles" },
  { value: "100%", label: "Consent-governed" },
  { value: "6 channels", label: "Simultaneous delivery" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN * 0.9, delayChildren: 0.4 } },
};

export default function Scene10Outcomes(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={10} title="The Promise">
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
          Scene 11 · Enterprise Capability
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
          the promise.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 28 }}
        >
          A financial institution that listens, respects, and acts — intelligently, at scale.
        </motion.p>

        {/* Capability cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {CAPABILITIES.map(({ num, title, desc, color }) => (
            <motion.div
              key={num}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
              }}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${color}18`,
                borderRadius: 14,
                padding: "18px 18px",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
                background: color,
              }} />
              <span style={{
                fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700,
                fontSize: 18, color: `${color}40`, flexShrink: 0,
                minWidth: 32,
              }}>{num}</span>
              <div>
                <p style={{
                  fontFamily: "var(--font-space-grotesk)", fontWeight: 700,
                  fontSize: 14, color, marginBottom: 4,
                }}>{title}</p>
                <p style={{ fontSize: 13, color: COLORS.fgSecondary, lineHeight: 1.55 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            padding: "20px",
            background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
            border: `1px solid ${COLORS.blueMid}`,
            borderRadius: 16,
            marginBottom: 24,
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-space-grotesk)", fontWeight: 900,
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                color: COLORS.blue, letterSpacing: "-0.02em", marginBottom: 3,
              }}>{value}</p>
              <p style={{ fontSize: 11, color: COLORS.fgSecondary }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          style={{
            padding: "20px 24px",
            background: "linear-gradient(135deg, #0b1640, #1a3a8f)",
            borderRadius: 16,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <p style={{
            fontFamily: "var(--font-space-grotesk)", fontWeight: 600,
            fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
            color: "#FFFFFF",
            lineHeight: 1.65,
          }}>
            Not a technology demonstration.
            <span style={{ color: "#93C5FD" }}> A genuine enterprise capability</span>,
            ready to serve millions of customers the way they deserve to be served.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0 }}
          style={{ textAlign: "center" }}
        >
          <p style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12,
          }}>
            Ready to build this for your organisation?
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              background: COLORS.blue,
              color: "#FFFFFF",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: 8,
            }}
          >
            start the conversation →
          </Link>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
