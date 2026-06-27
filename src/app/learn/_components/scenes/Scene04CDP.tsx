"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import GlassCard from "../shared/GlassCard";
import PulsingDot from "../shared/PulsingDot";
import { COLORS, STAGGER_CHILDREN, EASE_OUT } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const IDENTIFIERS = [
  { label: "Cookie ID", value: "usr_8f3k2m9x", color: COLORS.blue },
  { label: "CRM ID", value: "CRM-70041822", color: COLORS.purple },
  { label: "Email", value: "alex.c@email.com", color: COLORS.green },
  { label: "Phone", value: "+1 415 ···· 9821", color: COLORS.cyan },
  { label: "Device ID", value: "iOS · Safari", color: COLORS.amber },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.6 } },
};
const row = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export default function Scene04CDP(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={4} title="Customer Data Platform">
      <div style={{ width: "100%", maxWidth: isMobile ? "100%" : 760 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Scene 04 · CDP
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: isMobile ? "1.5rem" : "clamp(1.6rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: 6,
          }}
        >
          identity resolution begins.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ fontSize: isMobile ? 13 : 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: isMobile ? 20 : 32 }}
        >
          BlueConic CDP receives all events and matches fragmented identifiers to a single person.
        </motion.p>

        {isMobile ? (
          /* ── MOBILE: stacked column layout ── */
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Fragmented identifiers */}
            <motion.div variants={container} initial="hidden" animate="show">
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.fgMuted, marginBottom: 10 }}>
                Fragmented Signals
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                {IDENTIFIERS.map((id) => (
                  <motion.div
                    key={id.label}
                    variants={row}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "9px 12px",
                      background: COLORS.muted, border: `1px solid ${COLORS.border}`,
                      borderRadius: 10,
                    }}
                  >
                    <PulsingDot color={id.color} size={7} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: COLORS.fgMuted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 1 }}>{id.label}</div>
                      <div style={{ fontSize: 12, color: COLORS.fg, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{id.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.blue }}>
                Identity Resolution
              </div>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                style={{ fontSize: 20, color: COLORS.blue }}
              >
                ↓
              </motion.div>
            </motion.div>

            {/* Unified profile */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6, ease: EASE_OUT }}
            >
              <GlassCard glow="blue" style={{ padding: "20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 3, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.purple})`, borderRadius: "16px 16px 0 0" }} />
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.blue, marginBottom: 10 }}>
                  ✓ Unified Profile
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 28 }}>👤</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.fg }}>Alex Chen</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
                  {[
                    { k: "Profile ID", v: "ucid_ax92mk" },
                    { k: "Confidence", v: "98.4%" },
                    { k: "Events matched", v: "247" },
                    { k: "Sources merged", v: "5 of 5" },
                  ].map((kv) => (
                    <div key={kv.k} style={{ padding: "5px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12 }}>
                      <div style={{ color: COLORS.fgMuted, fontSize: 10 }}>{kv.k}</div>
                      <div style={{ color: COLORS.fg, fontWeight: 600 }}>{kv.v}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        ) : (
          /* ── DESKTOP: 3-column layout ── */
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>

            {/* Left: raw identifiers */}
            <motion.div variants={container} initial="hidden" animate="show">
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.fgMuted, marginBottom: 12 }}>
                Fragmented Signals
              </div>
              {IDENTIFIERS.map((id) => (
                <motion.div
                  key={id.label}
                  variants={row}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", marginBottom: 8, background: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: 10 }}
                >
                  <PulsingDot color={id.color} size={8} />
                  <div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: COLORS.fgMuted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 1 }}>{id.label}</div>
                    <div style={{ fontSize: 13, color: COLORS.fg, fontWeight: 500 }}>{id.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Center: resolution arrow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.blue, marginBottom: 4 }}>
                Identity
              </div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.blue }}>
                Resolution
              </div>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                style={{ fontSize: 24, color: COLORS.blue, marginTop: 4 }}
              >
                →
              </motion.div>
            </motion.div>

            {/* Right: unified profile */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.7, ease: EASE_OUT }}
            >
              <GlassCard glow="blue" style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 3, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.purple})`, borderRadius: "16px 16px 0 0" }} />
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.blue, marginBottom: 12 }}>
                  ✓ Unified Profile
                </div>
                <div style={{ fontSize: 32, marginBottom: 8 }}>👤</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.fg, marginBottom: 4 }}>Alex Chen</div>
                {[
                  { k: "Profile ID", v: "ucid_ax92mk" },
                  { k: "Confidence", v: "98.4%" },
                  { k: "Events matched", v: "247" },
                  { k: "Sources merged", v: "5 of 5" },
                ].map((kv) => (
                  <div key={kv.k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 13 }}>
                    <span style={{ color: COLORS.fgMuted }}>{kv.k}</span>
                    <span style={{ color: COLORS.fg, fontWeight: 600 }}>{kv.v}</span>
                  </div>
                ))}
              </GlassCard>
            </motion.div>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
