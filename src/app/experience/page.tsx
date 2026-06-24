"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/layout/Footer";

/* ─── Data ────────────────────────────────────────────────────────────────── */

const SYNC_NODES = [
  { id: "bc", label: "BlueConic",   angle: 270, color: "#3B82F6" },
  { id: "mp", label: "Marketplace", angle: 330, color: "#8B5CF6" },
  { id: "vi", label: "Vista",       angle:  30, color: "#06B6D4" },
  { id: "da", label: "DApply",      angle:  90, color: "#10B981" },
  { id: "am", label: "Amplero",     angle: 150, color: "#F59E0B" },
  { id: "sf", label: "SFTP Feeds",  angle: 210, color: "#EC4899" },
];

const SYNC_TECHS = ["BlueConic", "Python", "PySpark", "AWS", "Databricks", "Snowflake", "GenAI", "LangGraph", "Agentic AI"];

const LEVELS = [
  { num: "01", title: "Analytics Explorer",           unlocked: true,  current: false },
  { num: "02", title: "Data Storyteller",             unlocked: true,  current: false },
  { num: "03", title: "Business Problem Solver",      unlocked: true,  current: false },
  { num: "04", title: "People Manager",               unlocked: true,  current: false },
  { num: "05", title: "CDP Leader",                   unlocked: true,  current: false },
  { num: "06", title: "AI Transformation Leader",     unlocked: true,  current: true  },
  { num: "07", title: "VP – AI & Data Strategy",      unlocked: false, current: false },
];

const EDU_NODES = [
  { label: "MS ML & AI",   sub: "LJMU",       orbit: 0, angle:  30, color: "#C41230" },
  { label: "Research",     sub: "Springer",   orbit: 0, angle: 150, color: "#7C3AED" },
  { label: "Leadership",   sub: "LEAP 2026",  orbit: 0, angle: 270, color: "#06B6D4" },
  { label: "M.Tech",       sub: "IIT Delhi",  orbit: 1, angle:  60, color: "#1D4ED8" },
  { label: "Agentic AI",   sub: "Systems",    orbit: 1, angle: 210, color: "#3B82F6" },
  { label: "B.Tech",       sub: "AMU",        orbit: 2, angle:  15, color: "#065F46" },
  { label: "CDP",          sub: "BlueConic",  orbit: 2, angle: 200, color: "#D97706" },
];

const EDU_RADII = [19, 30, 41]; // % in viewBox 0–100

const AWARDS = [
  { emoji: "🏆", year: "2021",       title: "CEO Award",           org: "Synchrony Financial",   color: "#F59E0B" },
  { emoji: "🏆", year: "2023",       title: "CEO Award",           org: "Synchrony Financial",   color: "#F59E0B" },
  { emoji: "🏆", year: "2025",       title: "CEO Award",           org: "Synchrony Financial",   color: "#EAB308" },
  { emoji: "🚀", year: "2026",       title: "LEAP Leadership",     org: "High-Potential Program", color: "#3B82F6" },
  { emoji: "📖", year: "2016 & 2021", title: "Springer Publications", org: "First Author",        color: "#8B5CF6" },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function pct(angle: number, r: number) {
  return {
    x: 50 + r * Math.cos((angle * Math.PI) / 180),
    y: 50 + r * Math.sin((angle * Math.PI) / 180),
  };
}

/* ─── Animated Counter ────────────────────────────────────────────────────── */

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t0 = 0;
    const dur = 1600;
    const raf = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

/* ─── Synchrony Ecosystem ─────────────────────────────────────────────────── */

function NodeEcosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const R = 38;
  const nodes = SYNC_NODES.map((n, i) => ({ ...n, ...pct(n.angle, R), i }));

  return (
    <div ref={ref} style={{
      position: "relative",
      width: "min(300px, calc(100vw - 56px))",
      aspectRatio: "1 / 1",
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx={50} cy={50} r={R} fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
        <circle cx={50} cy={50} r={12} fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
        {nodes.map(n => (
          <motion.line key={n.id}
            x1={50} y1={50} x2={n.x} y2={n.y}
            stroke={n.color} strokeOpacity={0.3} strokeWidth="0.4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 + n.i * 0.09, duration: 0.5 }}
          />
        ))}
      </svg>

      {/* CDP Centre */}
      <motion.div
        animate={{ boxShadow: ["0 0 10px #3B82F655","0 0 28px #3B82F6aa","0 0 10px #3B82F655"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: "22%", height: "22%", minWidth: 42, minHeight: 42,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #60A5FA, #2563EB 60%, #1E3A8A)",
          border: "1.5px solid rgba(96,165,250,0.6)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: "clamp(6px,2vw,8px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>CDP<br/>CORE</span>
      </motion.div>

      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <motion.div key={n.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.45 + i * 0.11, type: "spring", stiffness: 220 }}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 2 }}
        >
          <motion.div
            animate={{ boxShadow: [`0 0 4px ${n.color}44`,`0 0 14px ${n.color}88`,`0 0 4px ${n.color}44`] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
            style={{
              minWidth: 38, minHeight: 28, borderRadius: 8,
              background: `linear-gradient(135deg,${n.color}18,${n.color}35)`,
              border: `1px solid ${n.color}66`,
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 5px",
            }}
          >
            <span style={{ fontSize: "clamp(7px,2vw,9px)", color: "#fff", fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{n.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Knowledge Galaxy ────────────────────────────────────────────────────── */

function KnowledgeGalaxy() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const nodes = EDU_NODES.map(n => ({ ...n, ...pct(n.angle, EDU_RADII[n.orbit]) }));

  return (
    <div ref={ref} style={{
      position: "relative",
      width: "min(540px, calc(100vw - 48px))",
      aspectRatio: "1 / 1",
      margin: "0 auto",
    }}>
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {EDU_RADII.map((r, i) => (
          <motion.circle key={i} cx={50} cy={50} r={r}
            fill="none" stroke={`rgba(255,255,255,${0.07 + i * 0.02})`} strokeWidth="0.4"
            strokeDasharray={i === 0 ? "1.5 3" : i === 1 ? "2.5 4.5" : "4 6"}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.3, duration: 1 }}
          />
        ))}
        {nodes.map(n => (
          <motion.line key={n.label + "l"}
            x1={50} y1={50} x2={n.x} y2={n.y}
            stroke={n.color} strokeOpacity={0.1} strokeWidth="0.3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        ))}
      </svg>

      {/* Centre sphere */}
      <motion.div
        animate={{ scale: [1,1.06,1], boxShadow: ["0 0 14px #6366F155","0 0 36px #6366F1aa","0 0 14px #6366F155"] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: "18%", height: "18%", minWidth: 54, minHeight: 54,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #A78BFA, #4F46E5 55%, #1E1B4B)",
          border: "1px solid rgba(167,139,250,0.5)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 5,
        }}
      >
        <span style={{ fontSize: "clamp(6px,1.6vw,9px)", color: "#fff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", lineHeight: 1.4 }}>
          Continuous<br/>Learning
        </span>
      </motion.div>

      {/* Orbit nodes */}
      {nodes.map((n, i) => (
        <motion.div key={n.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 + i * 0.14, type: "spring", stiffness: 180 }}
          onClick={() => setActive(active === n.label ? null : n.label)}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 4, cursor: "pointer" }}
        >
          <motion.div
            whileHover={{ scale: 1.12 }}
            style={{
              minWidth: active === n.label ? 74 : 52,
              minHeight: 40, borderRadius: 10,
              background: active === n.label
                ? `linear-gradient(135deg,${n.color}35,${n.color}55)`
                : `linear-gradient(135deg,${n.color}12,${n.color}28)`,
              border: `1px solid ${n.color}${active === n.label ? "bb" : "44"}`,
              backdropFilter: "blur(10px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "6px 7px",
              boxShadow: active === n.label ? `0 0 22px ${n.color}66` : `0 0 6px ${n.color}22`,
              transition: "all 0.22s ease",
            }}
          >
            <span style={{ fontSize: "clamp(7px,1.8vw,10px)", color: "#fff", fontWeight: 700, textAlign: "center", lineHeight: 1.3, whiteSpace: "nowrap" }}>{n.label}</span>
            <span style={{ fontSize: "clamp(6px,1.5vw,9px)", color: `${n.color}cc`, textAlign: "center", marginTop: 2, whiteSpace: "nowrap" }}>{n.sub}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ExperiencePage() {
  const syncRef    = useRef(null);
  const citiRef    = useRef(null);
  const genpactRef = useRef(null);
  const levelsRef  = useRef(null);
  const galaxyRef  = useRef(null);
  const awardsRef  = useRef(null);

  const syncInView    = useInView(syncRef,    { once: true, margin: "-60px" });
  const citiInView    = useInView(citiRef,    { once: true, margin: "-60px" });
  const genpactInView = useInView(genpactRef, { once: true, margin: "-60px" });
  const levelsInView  = useInView(levelsRef,  { once: true, margin: "-40px" });
  const galaxyInView  = useInView(galaxyRef,  { once: true, margin: "-40px" });
  const awardsInView  = useInView(awardsRef,  { once: true, margin: "-40px" });

  return (
    <>
      <div style={{ background: "#060610", color: "#FFFFFF" }}>

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <section style={{
          padding: "clamp(72px,12vw,130px) clamp(24px,6vw,100px) clamp(56px,8vw,96px)",
          position: "relative", overflow: "hidden", textAlign: "center",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(99,102,241,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: "relative", zIndex: 1 }}>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "clamp(10px,1.2vw,12px)",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#818CF8", marginBottom: 20,
              }}
            >
              Career Evolution
            </motion.span>

            <h1 style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.6rem,7vw,6rem)",
              letterSpacing: "-0.04em", lineHeight: 0.95,
              color: "#FFFFFF", textTransform: "lowercase", marginBottom: 24,
            }}>
              12+ years<br />
              <span style={{ color: "#818CF8" }}>transforming data</span><br />
              into business impact.
            </h1>

            <p style={{ fontSize: "clamp(13px,1.4vw,16px)", color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 48px" }}>
              From enterprise analytics to Agentic AI — a journey across financial services, data platforms, and AI transformation.
            </p>

            {/* Chapter nav */}
            <div style={{ display: "flex", gap: "clamp(20px,4vw,40px)", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { num: "01", name: "Synchrony Financial", color: "#3B82F6", current: true },
                { num: "02", name: "Citibank",            color: "#60A5FA" },
                { num: "03", name: "Genpact",             color: "#F87171" },
              ].map((c, i) => (
                <motion.div key={c.num}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: c.color, fontWeight: 700, letterSpacing: "0.15em" }}>{c.num}</span>
                  <div style={{ width: c.current ? 32 : 16, height: 1, background: c.color, opacity: 0.4 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>{c.name}</span>
                  {c.current && (
                    <span style={{
                      fontSize: 8, padding: "2px 8px",
                      background: `${c.color}22`, border: `1px solid ${c.color}55`,
                      color: c.color, borderRadius: 4,
                      fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.12em",
                    }}>CURRENT</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Chapter 01: Synchrony ────────────────────────────────────────── */}
        <section ref={syncRef} style={{
          position: "relative", overflow: "hidden",
          padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)",
          background: "linear-gradient(135deg,#070B1A 0%,#0D1629 55%,#050A14 100%)",
          borderTop: "1px solid rgba(99,102,241,0.18)",
          borderBottom: "1px solid rgba(99,102,241,0.12)",
        }}>
          {/* Glow orb */}
          <div style={{ position: "absolute", top: "-15%", right: "8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />

          <motion.div initial={{ opacity: 0 }} animate={syncInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} style={{ position: "relative", zIndex: 1 }}>

            {/* Chapter label row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#3B82F6", fontWeight: 700, letterSpacing: "0.3em" }}>CHAPTER 01</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.4),transparent)", minWidth: 24 }} />
              <motion.span
                animate={{ boxShadow: ["0 0 8px #3B82F644","0 0 20px #3B82F6aa","0 0 8px #3B82F644"] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, padding: "4px 12px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.5)", color: "#3B82F6", borderRadius: 20, letterSpacing: "0.15em" }}
              >
                CURRENT ROLE
              </motion.span>
            </div>

            {/* Content + ecosystem */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,60px)", alignItems: "center" }}>

              {/* Left: copy */}
              <motion.div
                initial={{ opacity: 0, x: -24 }} animate={syncInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
                style={{ flex: "1 1 280px", minWidth: 0 }}
              >
                <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.9rem,5vw,4rem)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 1, marginBottom: 10 }}>
                  Synchrony<br />Financial
                </h2>
                <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#3B82F6", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
                  2019 – Present · Hyderabad, India
                </p>
                <div style={{ display: "inline-block", padding: "6px 16px", background: "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))", border: "1px solid rgba(99,102,241,0.4)", borderRadius: 6, marginBottom: 20 }}>
                  <span style={{ fontSize: "clamp(11px,1.4vw,14px)", fontWeight: 700, color: "#E0E7FF" }}>AVP – Data Scientist &amp; Data Engineer</span>
                </div>
                <p style={{ fontSize: "clamp(12px,1.3vw,14px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.78, maxWidth: 480, marginBottom: 24 }}>
                  Strategic contributor to Synchrony&apos;s enterprise customer data ecosystem. Own end-to-end data integration architecture connecting BlueConic CDP with core digital platforms — enabling unified 360° customer profiles, real-time marketing activation, and personalised engagement across 70M+ customers.
                </p>

                {/* Current focus badge */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "10px 14px", background: "rgba(0,0,0,0.28)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, backdropFilter: "blur(10px)", width: "fit-content" }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.15em" }}>CURRENT FOCUS</span>
                  {["Enterprise AI", "Customer Data Platforms", "AI Transformation"].map(f => (
                    <span key={f} style={{ fontSize: 9, color: "#818CF8", fontFamily: "var(--font-jetbrains-mono), monospace" }}>· {f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Right: ecosystem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }} animate={syncInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.35 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <NodeEcosystem />
              </motion.div>
            </div>

            {/* Counters */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={syncInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: "flex", gap: "clamp(12px,3vw,24px)", flexWrap: "wrap", marginTop: 40 }}
            >
              {[
                { label: "Customer Profiles", display: <><Counter to={70} />M+</>, color: "#3B82F6" },
                { label: "CEO Awards",         display: <>3×</>,                    color: "#F59E0B" },
                { label: "Years Experience",   display: <><Counter to={12} />+</>,  color: "#10B981" },
              ].map(h => (
                <div key={h.label} style={{
                  flex: "1 1 100px", textAlign: "center", padding: "20px 16px",
                  background: "rgba(0,0,0,0.28)", border: `1px solid ${h.color}28`,
                  borderRadius: 12, backdropFilter: "blur(10px)",
                }}>
                  <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,3.5vw,2.8rem)", color: h.color, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {h.display}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 6, fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={syncInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.65 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}
            >
              {SYNC_TECHS.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.8 }} animate={syncInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.7 + i * 0.04 }}
                  style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, padding: "5px 12px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)", color: "#A5B4FC", borderRadius: 6, letterSpacing: "0.04em" }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Chapter 02: Citibank ──────────────────────────────────────────── */}
        <section ref={citiRef} style={{
          position: "relative", overflow: "hidden",
          padding: "clamp(48px,7vw,80px) clamp(24px,6vw,96px)",
          background: "linear-gradient(135deg,#050C1C 0%,#071320 100%)",
          borderBottom: "1px solid rgba(29,78,216,0.12)",
        }}>
          <div style={{ position: "absolute", bottom: "-12%", left: "4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,78,216,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

          <motion.div initial={{ opacity: 0, y: 26 }} animate={citiInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#60A5FA", fontWeight: 700, letterSpacing: "0.3em" }}>CHAPTER 02</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(96,165,250,0.3),transparent)", minWidth: 24 }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,52px)", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,4vw,3rem)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 1, marginBottom: 10 }}>Citibank</h2>
                <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#60A5FA", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>2018 – 2019 · Bengaluru, India</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 18 }}>Analytics Manager – Cards &amp; Consumer Banking</p>
                <p style={{ fontSize: "clamp(12px,1.3vw,14px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.78, maxWidth: 500, marginBottom: 28 }}>
                  Led data science and analytics for Citi Singapore&apos;s Retail Banking portfolio across Credit Cards, CASA, and Consumer Lending. Delivered predictive analytics, executive dashboards, and automated reporting — saving 1,000+ annual hours through process automation.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[
                    { label: "Hours Saved",  value: "1,000+", color: "#60A5FA" },
                    { label: "Verticals",    value: "3",      color: "#818CF8" },
                    { label: "Automation",   value: "Annual", color: "#06B6D4" },
                  ].map(c => (
                    <div key={c.label} style={{ flex: "1 1 72px", textAlign: "center", padding: "14px 12px", background: `${c.color}0D`, border: `1px solid ${c.color}2A`, borderRadius: 10 }}>
                      <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1rem,2.2vw,1.5rem)", color: c.color, letterSpacing: "-0.02em" }}>{c.value}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 5, fontFamily: "var(--font-jetbrains-mono), monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={citiInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
                style={{ flex: "0 1 240px", minWidth: 200 }}
              >
                <div style={{ padding: "22px 20px", background: "rgba(0,0,0,0.28)", border: "1px solid rgba(96,165,250,0.14)", borderRadius: 14, backdropFilter: "blur(10px)" }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#60A5FA", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Technology Stack</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {["Python","SQL","SAS","AWS","Power BI","Tableau"].map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "4px 9px", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.18)", color: "#93C5FD", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono), monospace" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-jetbrains-mono), monospace", lineHeight: 1.7 }}>Consumer Banking Analytics · Cards Analytics · Retail Banking Intelligence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Chapter 03: Genpact ──────────────────────────────────────────── */}
        <section ref={genpactRef} style={{
          position: "relative", overflow: "hidden",
          padding: "clamp(48px,7vw,80px) clamp(24px,6vw,96px)",
          background: "linear-gradient(135deg,#0D0608 0%,#150A08 100%)",
          borderBottom: "1px solid rgba(227,24,55,0.1)",
        }}>
          <div style={{ position: "absolute", top: "15%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(227,24,55,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

          <motion.div initial={{ opacity: 0, y: 26 }} animate={genpactInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#F87171", fontWeight: 700, letterSpacing: "0.3em" }}>CHAPTER 03 · WHERE IT BEGAN</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(248,113,113,0.3),transparent)", minWidth: 24 }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,52px)", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,4vw,3rem)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 1, marginBottom: 10 }}>Genpact</h2>
                <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#F87171", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>2014 – 2018 · Bengaluru, India</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 18 }}>Assistant Manager – Analytics &amp; Automation</p>
                <p style={{ fontSize: "clamp(12px,1.3vw,14px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.78, maxWidth: 500, marginBottom: 28 }}>
                  Where everything started. Delivered performance marketing analytics and customer intelligence for US Retail Banking and PLCC portfolios. Built attribution models, campaign measurement frameworks, and customer journey analytics generating multi-million dollar business value.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 0 }}>
                  {["Promotion 1 — Unlocked ✓", "Promotion 2 — Unlocked ✓"].map((p, i) => (
                    <motion.div key={p}
                      initial={{ opacity: 0, x: -10 }} animate={genpactInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.2 }}
                      style={{ padding: "8px 14px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.28)", borderRadius: 8, fontSize: 11, color: "#4ADE80", fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.04em" }}
                    >
                      {p}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={genpactInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
                style={{ flex: "0 1 240px", minWidth: 200 }}
              >
                <div style={{ padding: "22px 20px", background: "rgba(0,0,0,0.28)", border: "1px solid rgba(248,113,113,0.14)", borderRadius: 14, backdropFilter: "blur(10px)" }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#F87171", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Impact</p>
                  {["Multi-million Dollar Business Value","Customer Acquisition Optimisation","Marketing Effectiveness","Journey Analytics"].map(item => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 9 }}>
                      <span style={{ color: "#F87171", fontSize: 12, marginTop: 1, flexShrink: 0 }}>›</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Python","SQL","SAS","Power BI","A/B Testing"].map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "3px 8px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.18)", color: "#FCA5A5", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono), monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Leadership Evolution ──────────────────────────────────────────── */}
        <section ref={levelsRef} style={{
          padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)",
          background: "#080812",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={levelsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#818CF8", letterSpacing: "0.3em", textTransform: "uppercase" }}>Leadership Evolution</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,4vw,3rem)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 0.95, marginTop: 12, textTransform: "lowercase" }}>career progression.</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,148px),1fr))", gap: 10 }}>
            {LEVELS.map((lv, i) => (
              <motion.div key={lv.num}
                initial={{ opacity: 0, y: 18 }} animate={levelsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  padding: "20px 14px", textAlign: "center",
                  background: lv.current ? "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))" : lv.unlocked ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)",
                  border: lv.current ? "1px solid rgba(129,140,248,0.5)" : lv.unlocked ? "1px solid rgba(255,255,255,0.07)" : "1px dashed rgba(255,255,255,0.05)",
                  borderRadius: 12, position: "relative", overflow: "hidden",
                }}
              >
                {lv.current && (
                  <motion.div animate={{ opacity: [0.3,0.7,0.3] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(99,102,241,0.14) 0%,transparent 70%)", pointerEvents: "none" }} />
                )}
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 22, fontWeight: 900, lineHeight: 1, marginBottom: 10, color: lv.current ? "#818CF8" : lv.unlocked ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)" }}>{lv.num}</div>
                <div style={{ fontSize: "clamp(10px,1.1vw,12px)", lineHeight: 1.4, marginBottom: 10, fontWeight: lv.current ? 700 : 400, color: lv.current ? "#E0E7FF" : lv.unlocked ? "rgba(255,255,255,0.48)" : "rgba(255,255,255,0.18)" }}>{lv.title}</div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.15em", color: lv.current ? "#818CF8" : lv.unlocked ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)" }}>
                  {lv.current ? "◉ Active" : lv.unlocked ? "✓ Unlocked" : "⊗ Future"}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Knowledge Galaxy ─────────────────────────────────────────────── */}
        <section ref={galaxyRef} style={{
          padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)",
          background: "#040408",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          overflow: "hidden",
        }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={galaxyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#A78BFA", letterSpacing: "0.3em", textTransform: "uppercase" }}>Education &amp; Learning</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,4vw,3rem)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 0.95, marginTop: 12, textTransform: "lowercase" }}>knowledge galaxy.</h2>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 10, fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.1em" }}>tap nodes to explore</p>
          </motion.div>
          <KnowledgeGalaxy />
        </section>

        {/* ── Awards Showcase ───────────────────────────────────────────────── */}
        <section ref={awardsRef} style={{
          padding: "clamp(56px,8vw,96px) clamp(24px,6vw,96px)",
          background: "#060610",
        }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#FCD34D", letterSpacing: "0.3em", textTransform: "uppercase" }}>Awards &amp; Recognition</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,4vw,3rem)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 0.95, marginTop: 12, textTransform: "lowercase" }}>trophy showcase.</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,190px),1fr))", gap: 14, maxWidth: 1100, margin: "0 auto" }}>
            {AWARDS.map((a, i) => (
              <motion.div key={a.title + a.year}
                initial={{ opacity: 0, y: 22 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  padding: "28px 18px", textAlign: "center",
                  background: `linear-gradient(135deg,${a.color}0A,${a.color}16)`,
                  border: `1px solid ${a.color}2E`,
                  borderRadius: 16, cursor: "default",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Shine sweep */}
                <motion.div
                  animate={{ x: ["-120%","220%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.55, repeatDelay: 3.5 }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.05) 50%,transparent 100%)", transform: "skewX(-18deg)", pointerEvents: "none" }}
                />
                <div style={{ fontSize: 30, marginBottom: 12 }}>{a.emoji}</div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: a.color, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{a.year}</div>
                <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 800, fontSize: "clamp(13px,1.6vw,16px)", color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: 6 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{a.org}</div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
