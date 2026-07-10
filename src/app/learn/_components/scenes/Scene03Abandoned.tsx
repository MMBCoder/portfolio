"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SceneWrapper from "../shared/SceneWrapper";
import { COLORS, EASE_OUT } from "../constants";

interface Props { isPlaying: boolean; isTransitioning: boolean; }

/* Fields fill one by one; the last three never do */
const FIELDS = [
  { label: "Full Name",        value: "Mirza M. Baig",       done: true,  delay: 1.2 },
  { label: "Annual Income",    value: "₹ ••,••,•••",         done: true,  delay: 2.2 },
  { label: "Employer",         value: "Product Co.",         done: true,  delay: 3.2 },
  { label: "Residential City", value: "Hyderabad",           done: true,  delay: 4.2 },
  { label: "PAN Details",      value: "",                    done: false, delay: 0 },
  { label: "Address Proof",    value: "",                    done: false, delay: 0 },
  { label: "e-Sign Consent",   value: "",                    done: false, delay: 0 },
];

/* Timeline (seconds): 0-5 filling · 5.5 phone rings · 7 card tilts away · 8.5 abandoned badge */
const RING_AT = 5.5;
const TILT_AT = 7.0;
const BADGE_AT = 8.5;

export default function Scene03Abandoned(_props: Props) {
  return (
    <SceneWrapper sceneIndex={3} title="The Lost Opportunity">
      <div style={{ width: "100%", maxWidth: 760 }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: COLORS.fgMuted, marginBottom: 10, textAlign: "center",
          }}
        >
          The Application
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
          three fields from done.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 15, color: COLORS.fgSecondary, textAlign: "center", marginBottom: 40 }}
        >
          Everything is going smoothly — until the phone rings.
        </motion.p>

        {/* ── 3D stage ── */}
        <div style={{ perspective: 1200, position: "relative", maxWidth: 520, margin: "0 auto" }}>

          {/* The application form — fills, then tilts away */}
          <motion.div
            initial={{ rotateX: 8, rotateY: -6, y: 0 }}
            animate={{
              rotateX: [8, 4, 4, 26],
              rotateY: [-6, -3, -3, -14],
              y: [0, 0, 0, 26],
              opacity: [1, 1, 1, 0.55],
              filter: ["grayscale(0)", "grayscale(0)", "grayscale(0)", "grayscale(0.7)"],
            }}
            transition={{ duration: TILT_AT + 2.4, times: [0, 0.4, 0.72, 1], ease: "easeInOut" }}
            style={{
              transformStyle: "preserve-3d",
              background: "#FFFFFF",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 18,
              boxShadow: "0 30px 70px rgba(15,23,42,0.16), 0 8px 24px rgba(37,99,235,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Form header */}
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.muted }}>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 14, color: COLORS.fg }}>
                Travel Rewards Card — Application
              </span>
              <ProgressCounter />
            </div>

            {/* Progress bar → stops at 90% */}
            <div style={{ height: 4, background: COLORS.border }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "90%" }}
                transition={{ duration: 5, ease: "easeInOut", delay: 0.8 }}
                style={{ height: "100%", background: `linear-gradient(90deg, ${COLORS.blue}, #60A5FA)` }}
              />
            </div>

            {/* Fields */}
            <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
              {FIELDS.map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.fgMuted, width: 118, flexShrink: 0 }}>
                    {f.label}
                  </span>
                  <div style={{ flex: 1, height: 30, borderRadius: 7, border: `1px solid ${f.done ? "#BBF7D0" : COLORS.border}`, background: f.done ? "#F0FDF4" : "#FAFAFA", display: "flex", alignItems: "center", padding: "0 12px", position: "relative", overflow: "hidden" }}>
                    {f.done ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: f.delay, duration: 0.4 }}
                        style={{ fontSize: 12.5, color: COLORS.fg, fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {f.value}
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1] }}
                        transition={{ duration: BADGE_AT, times: [0, 0.9, 1] }}
                        style={{ fontSize: 11, color: "#DC2626", fontFamily: "var(--font-jetbrains-mono)", letterSpacing: "0.06em" }}
                      >
                        — never completed
                      </motion.span>
                    )}
                    {f.done && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: f.delay + 0.3, duration: 0.3 }}
                        style={{ marginLeft: "auto", color: "#059669", fontSize: 13, fontWeight: 700 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone-call interruption — pops over the form in 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: [0, 1, 1], scale: [0.7, 1, 1], y: [20, 0, 0] }}
            transition={{ duration: 1.2, delay: RING_AT, ease: EASE_OUT }}
            style={{
              position: "absolute", top: "-8%", right: "-6%",
              transform: "translateZ(80px)",
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 20px",
              background: "#111111",
              borderRadius: 16,
              boxShadow: "0 24px 56px rgba(0,0,0,0.35)",
              zIndex: 5,
            }}
          >
            <motion.div
              animate={{ rotate: [0, -14, 12, -14, 12, 0] }}
              transition={{ duration: 0.9, delay: RING_AT + 0.2, repeat: 3, repeatDelay: 0.6 }}
              style={{ fontSize: 22 }}
            >
              📞
            </motion.div>
            <div>
              <div style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 13, color: "#FFFFFF" }}>Work calling…</div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 9.5, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginTop: 2 }}>production issue · urgent</div>
            </div>
          </motion.div>

          {/* Abandoned badge — lands after the form falls away */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: BADGE_AT, duration: 0.6, ease: EASE_OUT }}
            style={{
              position: "absolute", left: "50%", bottom: "-13%",
              transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 22px",
              background: "#FFF5F5",
              border: "1.5px solid #FCA5A5",
              borderRadius: 30,
              boxShadow: "0 12px 32px rgba(220,38,38,0.15)",
              whiteSpace: "nowrap",
              zIndex: 6,
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: BADGE_AT }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#DC2626" }}
            />
            <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 700, fontSize: 13, color: "#991B1B" }}>
              Application Abandoned
            </span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, color: "#DC2626", letterSpacing: "0.06em" }}>
              90% complete · 3 fields left
            </span>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: BADGE_AT + 1.5, duration: 0.8 }}
          style={{
            marginTop: 76, textAlign: "center",
            fontSize: 14, color: COLORS.fgSecondary, lineHeight: 1.6,
          }}
        >
          <em>&ldquo;I&apos;ll finish it tomorrow.&rdquo;</em>&nbsp; But tomorrow becomes next week —
          and for most banks, <strong>that&apos;s where the journey ends.</strong>
        </motion.p>
      </div>
    </SceneWrapper>
  );
}

/* Live % counter synced to the progress bar */
function ProgressCounter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0 - 800) / 5000, 1);
      if (p >= 0) setN(Math.round(Math.max(p, 0) * 90));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, color: COLORS.blue, fontWeight: 700 }}>
      {n}% complete
    </span>
  );
}
