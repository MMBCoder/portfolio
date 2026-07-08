"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

const PHRASES = [
  { text: "Every ad click.", delay: 0.3 },
  { text: "Every card comparison.", delay: 0.8 },
  { text: "Every abandoned application.", delay: 1.3 },
];

export default function Scene00Background(_props: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 60, damping: 18 });
  const rotateX = useSpring(my, { stiffness: 60, damping: 18 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx * 10);
    my.set(ny * -7);
  };

  return (
    <motion.section
      ref={sectionRef}
      key={0}
      role="region"
      aria-label="The Opportunity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      onMouseMove={handleMouse}
      className="s0-section"
      style={{
        position: "absolute",
        inset: 0,
        background: "#F1F2F4",
        overflow: "hidden",
      }}
    >
      {/* Ambient blue wash */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 60% at 72% 45%, rgba(37,99,235,0.07), transparent 70%)",
      }} />

      <div className="s0-grid" style={{
        position: "relative",
        height: "100%",
        maxWidth: 1240,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "0.9fr 1.25fr",
        alignItems: "center",
        gap: "clamp(20px,3.5vw,56px)",
        padding: "76px clamp(20px,3.5vw,44px) 96px",
      }}>

        {/* ── Left: copy ── */}
        <div className="s0-copy">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "clamp(9px,0.9vw,11px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#2563EB",
              marginBottom: "clamp(14px,2vw,24px)",
              fontWeight: 700,
            }}
          >
            Customer Data Platform · Credit Cards
          </motion.p>

          <div style={{ marginBottom: "clamp(16px,2vw,24px)" }}>
            {PHRASES.map(({ text, delay }) => (
              <motion.p
                key={text}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration: 0.65, ease: EASE_OUT }}
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 2.1rem)",
                  color: "#111111",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}
              >
                {text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.65, ease: EASE_OUT }}
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1.25rem, 2.5vw, 2.1rem)",
                color: "#8A8F98",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              Each one is a customer waiting to be won.
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.9, duration: 0.9 }}
            style={{
              height: 1,
              background: "linear-gradient(90deg, #C9CDD4 0%, transparent 100%)",
              marginBottom: "clamp(14px,1.8vw,22px)",
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 1.0 }}
            style={{
              fontSize: "clamp(0.82rem, 1.2vw, 0.98rem)",
              color: "#555555",
              lineHeight: 1.7,
              maxWidth: 430,
              marginBottom: "clamp(18px,2.4vw,30px)",
            }}
          >
            Inside most card issuers, these acquisition signals sit scattered across
            dozens of disconnected systems — unheard and unrealised.
            What if every abandoned application could become an acquired customer,
            and every card holder a lifelong relationship?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.4, duration: 0.7, ease: EASE_OUT }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              border: "1px solid rgba(37,99,235,0.3)",
              borderRadius: 100,
              background: "rgba(37,99,235,0.07)",
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB", flexShrink: 0 }}
            />
            <span style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.76rem, 1.2vw, 0.9rem)",
              color: "#2563EB",
            }}>
              A Customer Data Platform changes that
            </span>
          </motion.div>
        </div>

        {/* ── Right: 3D-tilted journey infographic ── */}
        <motion.div
          className="s0-visual"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE_OUT }}
          style={{ perspective: 1400 }}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              rotateX, rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: "clamp(12px,1.4vw,18px)",
              overflow: "hidden",
              boxShadow: "0 32px 64px rgba(15,23,42,0.22), 0 10px 28px rgba(37,99,235,0.12), 0 2px 6px rgba(15,23,42,0.08)",
              border: "1px solid rgba(255,255,255,0.85)",
              background: "#FFFFFF",
            }}>
              <Image
                src="/images/customer-journey.png"
                alt="Credit card customer journey — acquisition, onboarding, activation, growth, and lifecycle & loyalty, enabled by a Customer Data Platform, AI & analytics, personalization, omnichannel communication, and compliance"
                fill
                sizes="(max-width: 900px) 92vw, 56vw"
                priority
                style={{ objectFit: "cover" }}
              />
              {/* soft sheen for the 3D glass feel */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, transparent 30%, transparent 72%, rgba(37,99,235,0.06) 100%)",
              }} />
            </div>

            {/* floor shadow glow */}
            <div style={{
              width: "76%", height: 20, margin: "22px auto 0",
              background: "radial-gradient(ellipse, rgba(15,23,42,0.16), transparent 70%)",
              filter: "blur(8px)",
            }} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .s0-section { overflow-y: auto !important; }
          .s0-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            align-content: start !important;
            height: auto !important;
            min-height: 100%;
            padding: 128px 20px 140px !important;
            gap: 28px !important;
          }
          .s0-copy { text-align: left; }
          .s0-visual { max-width: 560px; margin: 0 auto; width: 100%; }
        }
      `}</style>
    </motion.section>
  );
}
