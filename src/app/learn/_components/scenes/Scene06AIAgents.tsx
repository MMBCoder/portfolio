"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import GlassCard from "../shared/GlassCard";
import PulsingDot from "../shared/PulsingDot";
import { COLORS, STAGGER_CHILDREN, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const AGENTS = [
  {
    name: "Journey Agent",
    icon: "🗺️",
    color: COLORS.blue,
    responsibility: "Maps the customer lifecycle stage and next best action",
    status: "Analyzing journey stage...",
    output: "Stage: Active Exploration",
    delay: 0.4,
  },
  {
    name: "Recommendation Agent",
    icon: "🎯",
    color: COLORS.purple,
    responsibility: "Generates personalised product recommendations using ML models",
    status: "Running propensity models...",
    output: "Top match: Premium Travel Card",
    delay: 0.65,
  },
  {
    name: "Offer Agent",
    icon: "💡",
    color: COLORS.green,
    responsibility: "Selects and optimises the best offer based on CLV and risk appetite",
    status: "Pricing offer window...",
    output: "Offer: 0% APR · 60K points",
    delay: 0.9,
  },
  {
    name: "Analytics Agent",
    icon: "📊",
    color: COLORS.cyan,
    responsibility: "Tracks attribution, measures impact, and feeds data back to the model",
    status: "Evaluating model confidence...",
    output: "Confidence: 91.3%",
    delay: 1.15,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.3 } },
};
const card = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function Scene06AIAgents(_props: Props) {
  return (
    <SceneWrapper sceneIndex={6} title="AI Agents">
      <div style={{ width: "100%", maxWidth: 820 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12, textAlign: "center",
          }}
        >
          Scene 06 · AI Decision Engine
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 8,
          }}
        >
          ai agents activate.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 36 }}
        >
          Four specialised agents work in parallel, each with a specific role in the decision pipeline.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}
        >
          {AGENTS.map((agent) => (
            <GlassCard
              key={agent.name}
              variants={card}
              glow="purple"
              style={{ padding: "22px", overflow: "hidden", position: "relative" }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: agent.color,
              }} />

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: `${agent.color}15`,
                  border: `1px solid ${agent.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {agent.icon}
                </div>
                <div>
                  <div style={{
                    fontWeight: 700, fontSize: 13, color: COLORS.fg, marginBottom: 4,
                  }}>
                    {agent.name}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.fgSecondary, lineHeight: 1.5 }}>
                    {agent.responsibility}
                  </div>
                </div>
              </div>

              {/* Processing status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: agent.delay + 0.6 }}
                style={{
                  padding: "8px 12px", borderRadius: 8,
                  background: COLORS.muted, border: `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <PulsingDot color={agent.color} size={6} delay={agent.delay + 0.6} />
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 11, color: COLORS.fgMuted, letterSpacing: "0.1em",
                  }}>
                    {agent.status}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11, color: agent.color, fontWeight: 600, letterSpacing: "0.05em",
                }}>
                  → {agent.output}
                </div>
              </motion.div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
