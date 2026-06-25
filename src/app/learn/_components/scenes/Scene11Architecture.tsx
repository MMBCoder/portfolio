"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT, STAGGER_FAST } from "../constants";
import { useIsMobile } from "../shared/useIsMobile";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const LAYERS = [
  { label: "Customer Touchpoints", items: ["Web", "Mobile", "Email", "POS", "Support"], color: COLORS.cyan, icon: "📱", delay: 0.3 },
  { label: "Enterprise Systems", items: ["CRM", "Salesforce MC", "Zendesk", "POS System"], color: COLORS.blue, icon: "🗂️", delay: 0.55 },
  { label: "Customer Data Platform", items: ["BlueConic CDP", "Event Collection", "Data Lake"], color: COLORS.purple, icon: "⚡", delay: 0.8 },
  { label: "Identity Resolution", items: ["Match Engine", "Golden Record", "Consent Layer"], color: COLORS.purple, icon: "🔗", delay: 1.05 },
  { label: "Unified Profile", items: ["360° View", "Real-time", "70M+ Profiles"], color: COLORS.blue, icon: "👤", delay: 1.3 },
  { label: "AI Agents", items: ["Journey", "Recommendation", "Offer", "Analytics"], color: "#8B5CF6", icon: "🤖", delay: 1.55 },
  { label: "Decision Engine", items: ["ML Models", "Business Rules", "Propensity Score"], color: COLORS.purple, icon: "🧠", delay: 1.8 },
  { label: "Marketing Channels", items: ["Email", "SMS", "Push", "Web", "Call Center"], color: COLORS.green, icon: "📡", delay: 2.05 },
];

export default function Scene11Architecture(_props: Props) {
  const isMobile = useIsMobile();

  return (
    <SceneWrapper sceneIndex={10} title="Enterprise Architecture">
      <div style={{ width: "100%", maxWidth: 860 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          Scene 11 · Architecture
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900, fontSize: isMobile ? "1.4rem" : "clamp(1.4rem, 3vw, 2.2rem)",
            letterSpacing: "-0.04em", color: COLORS.fg,
            textTransform: "lowercase", textAlign: "center", marginBottom: isMobile ? 16 : 24,
          }}
        >
          the complete picture.
        </motion.h2>

        {/* Architecture stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 5 : 7 }}>
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: layer.delay, duration: 0.5, ease: EASE_OUT }}
            >
              {isMobile ? (
                /* Mobile: compact single row with label + chips inline */
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 10px",
                  background: `${layer.color}08`,
                  border: `1px solid ${layer.color}20`,
                  borderRadius: 8,
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{layer.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: layer.color, flexShrink: 0, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 120 }}>
                    {layer.label}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, flex: 1 }}>
                    {layer.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: layer.delay + 0.1 + j * STAGGER_FAST, duration: 0.25 }}
                        style={{ padding: "2px 7px", background: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: 20, fontSize: 10, color: COLORS.fgSecondary, fontWeight: 500, whiteSpace: "nowrap" }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ) : (
                /* Desktop: 180px label + 1fr items */
                <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: `${layer.color}10`, border: `1px solid ${layer.color}25`, borderRadius: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 14 }}>{layer.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: layer.color, lineHeight: 1.3 }}>{layer.label}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
                    {i < LAYERS.length - 1 && (
                      <motion.div
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, delay: layer.delay }}
                        style={{ width: 16, height: 1, background: `linear-gradient(90deg, ${layer.color}, transparent)`, flexShrink: 0 }}
                      />
                    )}
                    {layer.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: layer.delay + 0.1 + j * STAGGER_FAST, duration: 0.3 }}
                        style={{ padding: "3px 10px", background: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: 20, fontSize: 12, color: COLORS.fgSecondary, fontWeight: 500 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Flow summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          style={{
            marginTop: isMobile ? 14 : 20, textAlign: "center",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12, color: COLORS.fgMuted, letterSpacing: "0.1em",
          }}
        >
          Data → Identity → Intelligence → Action → Value
        </motion.div>
      </div>
    </SceneWrapper>
  );
}
