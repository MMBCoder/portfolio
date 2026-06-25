"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, STAGGER_CHILDREN, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const KPIS = [
  { label: "Revenue Impact", prefix: "$", value: 4.2, suffix: "M", unit: "incremental", color: COLORS.green, delay: 0.4 },
  { label: "Conversion Rate", prefix: "", value: 3.1, suffix: "×", unit: "vs control group", color: COLORS.blue, delay: 0.65 },
  { label: "Campaign Time", prefix: "", value: 80, suffix: "%", unit: "faster to market", color: COLORS.purple, delay: 0.9 },
  { label: "Customer Satisfaction", prefix: "+", value: 22, suffix: "pts", unit: "NPS improvement", color: COLORS.cyan, delay: 1.15 },
  { label: "Marketing Efficiency", prefix: "", value: 40, suffix: "%", unit: "cost reduction", color: COLORS.amber, delay: 1.4 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.3 } },
};

export default function Scene10Outcomes(_props: Props) {
  return (
    <SceneWrapper sceneIndex={9} title="Business Outcomes">
      <div style={{ width: "100%", maxWidth: 840 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 12, textAlign: "center",
          }}
        >
          Scene 10 · Business Outcomes
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 8,
          }}
        >
          value is generated.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 40 }}
        >
          One intelligent journey. Measurable results across the enterprise.
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
          {KPIS.slice(0, 3).map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} />
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
            marginTop: 14,
            maxWidth: 560,
            margin: "14px auto 0",
          }}
        >
          {KPIS.slice(3).map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          style={{
            marginTop: 32, textAlign: "center",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12, color: COLORS.fgMuted, letterSpacing: "0.1em",
          }}
        >
          Measured across Synchrony&apos;s 70M+ customer base · Real enterprise outcomes
        </motion.div>
      </div>
    </SceneWrapper>
  );
}

function KPICard({ kpi }: { kpi: typeof KPIS[number] }) {
  const decimals = kpi.value % 1 !== 0 ? 1 : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.92 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
      }}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${kpi.color}20`,
        borderRadius: 16,
        padding: "24px 20px",
        textAlign: "center",
        boxShadow: `0 4px 20px ${kpi.color}0A`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: kpi.color,
      }} />

      <div style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        letterSpacing: "-0.03em",
        color: kpi.color,
        lineHeight: 1,
        marginBottom: 4,
      }}>
        {kpi.prefix}
        <CountUp
          end={kpi.value}
          duration={1.8}
          delay={kpi.delay}
          decimals={decimals}
          separator=","
        />
        {kpi.suffix}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.fg, marginBottom: 2 }}>
        {kpi.label}
      </div>
      <div style={{
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 11, color: COLORS.fgMuted, letterSpacing: "0.1em",
      }}>
        {kpi.unit}
      </div>
    </motion.div>
  );
}
