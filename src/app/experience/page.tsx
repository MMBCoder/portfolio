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

const SYNC_OUTER = [
  { id: "cid", label: "Customer Identity",  angle: 248, r: 45, color: "#60A5FA" },
  { id: "pu",  label: "Profile Unification",angle: 310, r: 45, color: "#A78BFA" },
  { id: "rta", label: "Real-Time Activation",angle: 20, r: 45, color: "#34D399" },
  { id: "p70", label: "70M+ Profiles",      angle:  80, r: 45, color: "#FBBF24" },
];

const SYNC_TECHS = [
  "BlueConic","Python","PySpark","AWS","Databricks","Snowflake","LangGraph","GenAI","Agentic AI",
];

const AWARDS = [
  { emoji: "🏆", year: "2021", title: "CEO Award",            org: "Synchrony Financial",    desc: "Highest executive recognition for enterprise data platform impact",          color: "#F59E0B" },
  { emoji: "🏆", year: "2023", title: "CEO Award",            org: "Synchrony Financial",    desc: "Recognised for AI transformation leadership and CDP excellence",             color: "#EAB308" },
  { emoji: "🏆", year: "2025", title: "CEO Award",            org: "Synchrony Financial",    desc: "Third recognition for sustained enterprise AI innovation",                   color: "#F59E0B" },
  { emoji: "🚀", year: "2026", title: "LEAP Leadership",      org: "High-Potential Program", desc: "Selected for Synchrony's elite leadership acceleration programme",           color: "#3B82F6" },
  { emoji: "📖", year: "2016 & 2021", title: "Springer Publications", org: "First Author",  desc: "Peer-reviewed research published across engineering and AI domains",         color: "#8B5CF6" },
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
    const dur = 1800;
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

/* ─── Node Ecosystem ──────────────────────────────────────────────────────── */

function NodeEcosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const inner = SYNC_NODES.map(n => ({ ...n, ...pct(n.angle, 31) }));
  const outer = SYNC_OUTER.map(n => ({ ...n, ...pct(n.angle, n.r) }));

  return (
    <div ref={ref} style={{
      position: "relative",
      width: "min(400px, calc(100vw - 48px))",
      aspectRatio: "1 / 1",
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx={50} cy={50} r={45} fill="none" stroke="rgba(99,102,241,0.07)" strokeWidth="0.3" strokeDasharray="1 3.5" />
        <circle cx={50} cy={50} r={31} fill="none" stroke="rgba(99,102,241,0.16)" strokeWidth="0.4" strokeDasharray="1.5 2.5" />
        <circle cx={50} cy={50} r={10} fill="rgba(59,130,246,0.07)" stroke="rgba(59,130,246,0.22)" strokeWidth="0.4" />
        {inner.map((n, i) => (
          <motion.line key={n.id} x1={50} y1={50} x2={n.x} y2={n.y}
            stroke={n.color} strokeOpacity={0.25} strokeWidth="0.35"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
          />
        ))}
        {outer.map((on, oi) => {
          const closest = inner.reduce((prev, cur) => {
            const da = Math.abs(((prev.angle - on.angle) + 360) % 360);
            const db = Math.abs(((cur.angle  - on.angle) + 360) % 360);
            return (da < 180 ? da : 360 - da) < (db < 180 ? db : 360 - db) ? prev : cur;
          });
          return (
            <motion.line key={on.id} x1={closest.x} y1={closest.y} x2={on.x} y2={on.y}
              stroke={on.color} strokeOpacity={0.14} strokeWidth="0.25"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85 + oi * 0.1, duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* CDP centre */}
      <motion.div
        animate={{ boxShadow: ["0 0 12px #3B82F655","0 0 32px #3B82F6aa","0 0 12px #3B82F655"] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          width: "18%", height: "18%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%,#60A5FA,#2563EB 60%,#1E3A8A)",
          border: "1.5px solid rgba(96,165,250,0.5)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 3,
        }}
      >
        <span style={{ fontSize: "clamp(5px,1.5vw,7px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.3, fontFamily: "var(--font-jetbrains-mono),monospace", letterSpacing: "0.05em" }}>CDP<br/>CORE</span>
      </motion.div>

      {/* Inner nodes */}
      {inner.map((n, i) => (
        <motion.div key={n.id}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 220 }}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}
        >
          <motion.div
            animate={{ boxShadow: [`0 0 4px ${n.color}44`,`0 0 14px ${n.color}88`,`0 0 4px ${n.color}44`] }}
            transition={{ duration: 2.2 + i * 0.35, repeat: Infinity }}
            style={{ padding: "3px 8px", borderRadius: 6, background: `linear-gradient(135deg,${n.color}15,${n.color}32)`, border: `1px solid ${n.color}55`, backdropFilter: "blur(8px)" }}
          >
            <span style={{ fontSize: "clamp(6px,1.6vw,8px)", color: "#fff", fontWeight: 600, whiteSpace: "nowrap", fontFamily: "var(--font-jetbrains-mono),monospace" }}>{n.label}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Outer nodes */}
      {outer.map((n, i) => (
        <motion.div key={n.id}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 180 }}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}
        >
          <div style={{ padding: "2px 7px", borderRadius: 4, background: `${n.color}10`, border: `1px solid ${n.color}30` }}>
            <span style={{ fontSize: "clamp(5px,1.3vw,7px)", color: `${n.color}cc`, fontWeight: 500, whiteSpace: "nowrap", fontFamily: "var(--font-jetbrains-mono),monospace" }}>{n.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Neural Network (ML card bg) ────────────────────────────────────────── */

function NeuralNet() {
  const nodes = [[18,22],[18,50],[18,78],[50,12],[50,36],[50,64],[50,88],[82,28],[82,72]];
  const edges = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],[3,7],[4,7],[4,8],[5,7],[5,8],[6,8]];
  return (
    <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }}>
      {edges.map(([a,b],i) => (
        <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#818CF8" strokeWidth="0.5"
          animate={{ strokeOpacity: [0.15,0.65,0.15] }}
          transition={{ duration: 2.2 + i * 0.25, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
      {nodes.map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r="1.8" fill="#818CF8"
          animate={{ opacity: [0.25,0.9,0.25], r: [1.4,2.2,1.4] }}
          transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, delay: i * 0.11 }}
        />
      ))}
    </svg>
  );
}

/* ─── Gold Particles (IIT card bg) ───────────────────────────────────────── */

function Particles() {
  const pts = Array.from({ length: 22 }, (_, i) => ({ x: 8 + (i * 39 % 82), y: 12 + (i * 29 % 74) }));
  return (
    <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }}>
      {pts.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="0.9" fill="#F59E0B"
          animate={{ opacity: [0.08,0.75,0.08], cy: [p.y, p.y - 4, p.y] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.19 }}
        />
      ))}
    </svg>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ExperiencePage() {
  const syncRef    = useRef(null);
  const citiRef    = useRef(null);
  const genpactRef = useRef(null);
  const foundRef   = useRef(null);
  const awardsRef  = useRef(null);

  const syncInView    = useInView(syncRef,    { once: true, margin: "-60px" });
  const citiInView    = useInView(citiRef,    { once: true, margin: "-60px" });
  const genpactInView = useInView(genpactRef, { once: true, margin: "-60px" });
  const foundInView   = useInView(foundRef,   { once: true, margin: "-40px" });
  const awardsInView  = useInView(awardsRef,  { once: true, margin: "-40px" });

  return (
    <>
      <div style={{ background: "#060610", color: "#FFFFFF" }}>

        {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
        <section style={{
          padding: "clamp(80px,12vw,140px) clamp(24px,6vw,100px) clamp(64px,9vw,104px)",
          position: "relative", overflow: "hidden", textAlign: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 60% at 50% 0%,rgba(99,102,241,0.25) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "55%", height: "1px", background: "linear-gradient(to right,transparent,rgba(99,102,241,0.45),transparent)" }} />

          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ position: "relative", zIndex: 1 }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{
              display: "inline-block", fontFamily: "var(--font-jetbrains-mono),monospace",
              fontSize: "clamp(10px,1.2vw,12px)", letterSpacing: "0.38em", textTransform: "uppercase",
              color: "#818CF8", marginBottom: 22,
            }}>
              Career Evolution
            </motion.span>

            <h1 style={{
              fontFamily: "var(--font-space-grotesk),sans-serif",
              fontWeight: 900, fontSize: "clamp(2.6rem,7.5vw,6.8rem)",
              letterSpacing: "-0.045em", lineHeight: 0.92,
              color: "#FFFFFF", textTransform: "lowercase", marginBottom: 28,
            }}>
              from analytics<br />
              <span style={{ background: "linear-gradient(135deg,#818CF8 0%,#06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>practitioner</span><br />
              to ai transformation<br />leader.
            </h1>

            <p style={{ fontSize: "clamp(13px,1.4vw,16px)", color: "rgba(255,255,255,0.38)", maxWidth: 500, margin: "0 auto 52px", lineHeight: 1.75 }}>
              12+ years across financial services — building customer data platforms, enterprise AI systems, and high-impact analytics at scale.
            </p>

            <div style={{ display: "flex", gap: "clamp(10px,2.5vw,20px)", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { num: "01", label: "Synchrony Financial", current: true, color: "#3B82F6" },
                { num: "02", label: "Citibank",            current: false, color: "#60A5FA" },
                { num: "03", label: "Genpact",             current: false, color: "#F87171" },
              ].map((c, i) => (
                <motion.div key={c.num}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.1 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 18px",
                    background: c.current ? `${c.color}18` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${c.current ? c.color + "44" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 40,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: c.color, fontWeight: 700 }}>{c.num}</span>
                  <span style={{ fontSize: 12, color: c.current ? "#E0E7FF" : "rgba(255,255,255,0.45)", fontWeight: c.current ? 600 : 400 }}>{c.label}</span>
                  {c.current && (
                    <motion.span animate={{ opacity: [0.55,1,0.55] }} transition={{ duration: 2, repeat: Infinity }}
                      style={{ fontSize: 7, padding: "2px 8px", background: `${c.color}25`, border: `1px solid ${c.color}55`, color: c.color, borderRadius: 20, fontFamily: "var(--font-jetbrains-mono),monospace", letterSpacing: "0.12em" }}>
                      CURRENT
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── SYNCHRONY ──────────────────────────────────────────────────────── */}
        <section ref={syncRef} style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(160deg,#060B1E 0%,#0C1630 48%,#070F22 100%)",
          borderTop: "1px solid rgba(59,130,246,0.16)",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
        }}>
          <div style={{ position: "absolute", top: "-18%", right: "-4%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 68%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-4%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 68%)", pointerEvents: "none" }} />

          {/* Chapter strip */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 clamp(24px,6vw,96px)", paddingTop: "clamp(44px,6vw,72px)", gap: 16 }}>
            <motion.span initial={{ opacity: 0, x: -14 }} animate={syncInView ? { opacity: 1, x: 0 } : {}} style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#3B82F6", fontWeight: 700, letterSpacing: "0.35em", whiteSpace: "nowrap" }}>CHAPTER 01</motion.span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(59,130,246,0.5),transparent)" }} />
            <motion.span
              animate={{ boxShadow: ["0 0 8px #3B82F644","0 0 24px #3B82F6aa","0 0 8px #3B82F644"] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, padding: "4px 14px", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.45)", color: "#3B82F6", borderRadius: 20, letterSpacing: "0.14em", whiteSpace: "nowrap" }}
            >
              CURRENT ROLE
            </motion.span>
          </div>

          <div style={{ padding: "clamp(32px,5vw,52px) clamp(24px,6vw,96px) clamp(44px,6vw,72px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>

              {/* Text */}
              <motion.div initial={{ opacity: 0, x: -28 }} animate={syncInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }} style={{ flex: "1 1 300px", minWidth: 0 }}>
                <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,5.5vw,5rem)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 0.95, marginBottom: 12, textTransform: "lowercase" }}>
                  synchrony<br />financial.
                </h2>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18, alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#3B82F6", letterSpacing: "0.18em", textTransform: "uppercase" }}>2019 – Present</span>
                  <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10 }}>·</span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Hyderabad, India</span>
                </div>
                <div style={{ display: "inline-flex", padding: "7px 18px", background: "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))", border: "1px solid rgba(99,102,241,0.38)", borderRadius: 8, marginBottom: 24 }}>
                  <span style={{ fontSize: "clamp(11px,1.3vw,14px)", fontWeight: 700, color: "#E0E7FF" }}>AVP – Data Scientist &amp; Data Engineer</span>
                </div>
                <p style={{ fontSize: "clamp(12px,1.35vw,15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.82, maxWidth: 500, marginBottom: 28 }}>
                  Strategic contributor to Synchrony&apos;s enterprise customer data ecosystem. Own end-to-end data integration architecture connecting BlueConic CDP with core digital platforms — enabling unified 360° customer profiles, real-time marketing activation, and personalised engagement across 70M+ customers.
                </p>
                <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 7, padding: "10px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, backdropFilter: "blur(10px)" }}>
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.26)", fontFamily: "var(--font-jetbrains-mono),monospace", letterSpacing: "0.18em", alignSelf: "center" }}>NOW:</span>
                  {["Enterprise AI","CDP Architecture","AI Transformation"].map(f => (
                    <span key={f} style={{ fontSize: 10, color: "#818CF8", fontFamily: "var(--font-jetbrains-mono),monospace", fontWeight: 600 }}>· {f}</span>
                  ))}
                </div>
              </motion.div>

              {/* Ecosystem diagram */}
              <motion.div initial={{ opacity: 0, scale: 0.88, x: 20 }} animate={syncInView ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.3 }} style={{ display: "flex", justifyContent: "center" }}>
                <NodeEcosystem />
              </motion.div>
            </div>

            {/* Counters */}
            <motion.div initial={{ opacity: 0, y: 22 }} animate={syncInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.52 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(10px,2vw,20px)", marginTop: 44, maxWidth: 580 }}
            >
              {[
                { display: <><Counter to={70} />M+</>, label: "Customer Profiles", color: "#3B82F6" },
                { display: <>3×</>,                    label: "CEO Awards",         color: "#F59E0B" },
                { display: <><Counter to={12} />+</>,  label: "Years Experience",  color: "#10B981" },
              ].map((h, i) => (
                <div key={i} style={{ textAlign: "center", padding: "clamp(16px,3vw,26px) clamp(10px,2vw,18px)", background: "rgba(0,0,0,0.3)", border: `1px solid ${h.color}20`, borderRadius: 14, backdropFilter: "blur(10px)" }}>
                  <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: h.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{h.display}</div>
                  <div style={{ fontSize: "clamp(8px,0.95vw,10px)", color: "rgba(255,255,255,0.3)", marginTop: 8, fontFamily: "var(--font-jetbrains-mono),monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech chips */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={syncInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.68 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}
            >
              {SYNC_TECHS.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.76 }} animate={syncInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.75 + i * 0.045 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}
                  style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: "clamp(10px,1vw,12px)", padding: "6px 14px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)", color: "#A5B4FC", borderRadius: 7, letterSpacing: "0.04em", cursor: "default" }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CITIBANK ───────────────────────────────────────────────────────── */}
        <section ref={citiRef} style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(160deg,#030C1E 0%,#040F22 100%)",
          borderBottom: "1px solid rgba(29,78,216,0.1)",
        }}>
          <div style={{ position: "absolute", bottom: "-10%", right: "8%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,78,216,0.08) 0%,transparent 68%)", pointerEvents: "none" }} />

          <div style={{ padding: "clamp(48px,7vw,80px) clamp(24px,6vw,96px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
              <motion.span initial={{ opacity: 0 }} animate={citiInView ? { opacity: 1 } : {}} style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#60A5FA", fontWeight: 700, letterSpacing: "0.35em", whiteSpace: "nowrap" }}>CHAPTER 02</motion.span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(96,165,250,0.38),transparent)" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,60px)", alignItems: "flex-start" }}>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={citiInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ flex: "1 1 290px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
                  <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.8rem)", letterSpacing: "-0.035em", color: "#FFFFFF", lineHeight: 1, textTransform: "lowercase" }}>citibank.</h2>
                  <div style={{ padding: "4px 12px", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.22)", borderRadius: 20 }}>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#60A5FA" }}>2018 – 2019</span>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Analytics Manager · Singapore Retail Banking</p>
                <p style={{ fontSize: "clamp(12px,1.35vw,15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.82, maxWidth: 500, marginBottom: 28 }}>
                  Led data science and analytics for Citi Singapore&apos;s Retail Banking portfolio across Credit Cards, CASA, and Consumer Lending. Delivered predictive analytics, executive dashboards, and automated reporting — saving 1,000+ annual hours through process automation.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Cards Analytics","Consumer Banking","Predictive Modeling","Executive Dashboards","Automation"].map(tag => (
                    <span key={tag} style={{ fontSize: 10, padding: "5px 12px", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.18)", color: "#93C5FD", borderRadius: 6, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{tag}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} animate={citiInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.28 }} style={{ flex: "0 1 270px", minWidth: 200 }}>
                <div style={{ padding: "28px 24px", background: "rgba(4,12,30,0.65)", border: "1px solid rgba(96,165,250,0.14)", borderRadius: 16, backdropFilter: "blur(12px)" }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#60A5FA", letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 20 }}>Banking Analytics Command Center</p>
                  <div style={{ textAlign: "center", padding: "20px 0 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 18 }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.4rem)", color: "#60A5FA", letterSpacing: "-0.04em", lineHeight: 1 }}>1,000+</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", marginTop: 8, fontFamily: "var(--font-jetbrains-mono),monospace", textTransform: "uppercase", letterSpacing: "0.12em" }}>Hours Saved Annually</div>
                  </div>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#60A5FA", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Technology Stack</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Python","SQL","SAS","AWS","Power BI","Tableau"].map(t => (
                      <span key={t} style={{ fontSize: 9, padding: "3px 9px", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.15)", color: "#93C5FD", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── GENPACT ────────────────────────────────────────────────────────── */}
        <section ref={genpactRef} style={{
          position: "relative", overflow: "hidden",
          background: "linear-gradient(160deg,#0D0608 0%,#130A08 100%)",
          borderBottom: "1px solid rgba(220,38,38,0.08)",
        }}>
          <div style={{ position: "absolute", top: "18%", right: "6%", width: 370, height: 370, borderRadius: "50%", background: "radial-gradient(circle,rgba(220,38,38,0.07) 0%,transparent 68%)", pointerEvents: "none" }} />

          <div style={{ padding: "clamp(48px,7vw,80px) clamp(24px,6vw,96px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
              <motion.span initial={{ opacity: 0 }} animate={genpactInView ? { opacity: 1 } : {}} style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#F87171", fontWeight: 700, letterSpacing: "0.35em", whiteSpace: "nowrap" }}>CHAPTER 03 · WHERE IT BEGAN</motion.span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(248,113,113,0.38),transparent)" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,60px)", alignItems: "flex-start" }}>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={genpactInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ flex: "1 1 290px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
                  <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.8rem)", letterSpacing: "-0.035em", color: "#FFFFFF", lineHeight: 1, textTransform: "lowercase" }}>genpact.</h2>
                  <div style={{ padding: "4px 12px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.22)", borderRadius: 20 }}>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#F87171" }}>2014 – 2018</span>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Assistant Manager · Analytics &amp; Automation</p>
                <p style={{ fontSize: "clamp(12px,1.35vw,15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.82, maxWidth: 500, marginBottom: 28 }}>
                  Where everything started. Delivered performance marketing analytics and customer intelligence for US Retail Banking and PLCC portfolios. Built attribution models, campaign measurement frameworks, and customer journey analytics generating multi-million dollar business value.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Customer Intelligence","Marketing Analytics","Journey Analytics","Performance Optimization"].map(tag => (
                    <span key={tag} style={{ fontSize: 10, padding: "5px 12px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.18)", color: "#FCA5A5", borderRadius: 6, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{tag}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} animate={genpactInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.28 }} style={{ flex: "0 1 270px", minWidth: 200 }}>
                <div style={{ padding: "28px 24px", background: "rgba(13,6,8,0.65)", border: "1px solid rgba(248,113,113,0.12)", borderRadius: 16, backdropFilter: "blur(12px)" }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#F87171", letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 18 }}>Foundation Achievements</p>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.1rem,2.2vw,1.5rem)", color: "#FFFFFF", lineHeight: 1.25, marginBottom: 5 }}>Multi-Million Dollar</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-jetbrains-mono),monospace", textTransform: "uppercase", letterSpacing: "0.12em" }}>Business Impact</div>
                  </div>
                  <div style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {["✓ Two Internal Promotions","✓ US PLCC Portfolio","✓ Attribution Modeling","✓ Campaign Measurement"].map(item => (
                      <div key={item} style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.95, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{item}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FOUNDATIONS OF EXCELLENCE ──────────────────────────────────────── */}
        <section ref={foundRef} style={{
          padding: "clamp(64px,9vw,110px) clamp(24px,6vw,96px)",
          background: "#040408",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
        }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: "clamp(10px,1.1vw,11px)", color: "#F59E0B", letterSpacing: "0.38em", textTransform: "uppercase" }}>Foundations of Excellence</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.5rem)", letterSpacing: "-0.035em", color: "#FFFFFF", lineHeight: 0.95, marginTop: 14, marginBottom: 14, textTransform: "lowercase" }}>
              achievements<br /><span style={{ color: "#F59E0B" }}>unlocked.</span>
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", maxWidth: 400, margin: "0 auto", fontFamily: "var(--font-jetbrains-mono),monospace", lineHeight: 1.7 }}>
              Credibility milestones that shaped the AI transformation leader of today.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "clamp(16px,2.5vw,28px)", maxWidth: 1120, margin: "0 auto" }}>

            {/* ─ Card 01: IIT Delhi ─ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.65 }}
              whileHover={{ y: -7, transition: { duration: 0.2 } }}
              style={{
                position: "relative", overflow: "hidden",
                padding: "clamp(28px,3.5vw,44px) clamp(20px,3vw,36px)",
                background: "linear-gradient(145deg,rgba(14,10,0,0.96),rgba(24,17,2,0.96))",
                border: "1px solid rgba(245,158,11,0.38)",
                borderRadius: 20,
                boxShadow: "0 0 0 1px rgba(245,158,11,0.07), 0 24px 64px rgba(0,0,0,0.45)",
              }}
            >
              <Particles />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,transparent,#F59E0B,transparent)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 11, color: "#F59E0B", fontWeight: 700, letterSpacing: "0.25em" }}>01</span>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(245,158,11,0.45),transparent)" }} />
                  <span style={{ fontSize: 20 }}>🎓</span>
                </div>
                <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#F59E0B", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>IIT Delhi</p>
                <h3 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(16px,2vw,22px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>Built the Engineering Mindset</h3>
                <p style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,0.46)", lineHeight: 1.8 }}>
                  Graduated from the Indian Institute of Technology Delhi, one of India&apos;s most prestigious engineering institutions. Developed strong foundations in analytical thinking, research methodologies, complex problem solving, and systems engineering that continue to influence enterprise-scale AI and data platform design today.
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(245,158,11,0.12)" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "rgba(245,158,11,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>M.Tech · Engineering &amp; Technology · 2014</span>
                </div>
              </div>
            </motion.div>

            {/* ─ Card 02: Springer Research ─ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.22, duration: 0.65 }}
              whileHover={{ y: -7, transition: { duration: 0.2 } }}
              style={{
                position: "relative", overflow: "hidden",
                padding: "clamp(28px,3.5vw,44px) clamp(20px,3vw,36px)",
                background: "linear-gradient(145deg,rgba(139,92,246,0.09),rgba(99,102,241,0.06))",
                border: "1px solid rgba(139,92,246,0.32)",
                borderRadius: 20,
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 0 1px rgba(139,92,246,0.06), 0 24px 64px rgba(0,0,0,0.45)",
              }}
            >
              {/* Floating papers */}
              {[0,1,2].map(i => (
                <motion.div key={i}
                  animate={{ y: [0, -6 - i*4, 0], rotate: [-1+i*2.5, 2+i*1.5, -1+i*2.5] }}
                  transition={{ duration: 4 + i * 1.2, repeat: Infinity, delay: i * 0.8 }}
                  style={{
                    position: "absolute",
                    right: `${12 + i * 12}%`, top: `${6 + i * 7}%`,
                    width: "clamp(24px,3.5vw,38px)", height: "clamp(30px,4.5vw,48px)",
                    background: `rgba(139,92,246,${0.06 + i * 0.04})`,
                    border: "1px solid rgba(139,92,246,0.16)", borderRadius: 4,
                    opacity: 0.75 - i * 0.22,
                  }}
                />
              ))}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,transparent,#8B5CF6,transparent)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 11, color: "#8B5CF6", fontWeight: 700, letterSpacing: "0.25em" }}>02</span>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(139,92,246,0.45),transparent)" }} />
                  <span style={{ fontSize: 20 }}>📖</span>
                </div>
                <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#8B5CF6", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>Springer Publications</p>
                <h3 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(16px,2vw,22px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>Published Researcher</h3>
                <p style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,0.46)", lineHeight: 1.8 }}>
                  Published peer-reviewed research in Springer, contributing to academic and engineering innovation through experimental analysis, simulation-driven problem solving, and scientific investigation.
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(139,92,246,0.12)", display: "flex", flexDirection: "column", gap: 7 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "rgba(139,92,246,0.55)", letterSpacing: "0.08em" }}>· First Author · Microfluidics · IIT Delhi · 2016</span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "rgba(139,92,246,0.55)", letterSpacing: "0.08em" }}>· First Author · AI Enterprise Analytics · 2021</span>
                </div>
              </div>
            </motion.div>

            {/* ─ Card 03: ML & AI ─ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.34, duration: 0.65 }}
              whileHover={{ y: -7, transition: { duration: 0.2 } }}
              style={{
                position: "relative", overflow: "hidden",
                padding: "clamp(28px,3.5vw,44px) clamp(20px,3vw,36px)",
                background: "linear-gradient(145deg,rgba(6,182,212,0.07),rgba(99,102,241,0.09))",
                border: "1px solid rgba(99,102,241,0.26)",
                borderRadius: 20,
                boxShadow: "0 0 0 1px rgba(99,102,241,0.05), 0 24px 64px rgba(0,0,0,0.45)",
              }}
            >
              <NeuralNet />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,transparent,#06B6D4,transparent)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 11, color: "#06B6D4", fontWeight: 700, letterSpacing: "0.25em" }}>03</span>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(6,182,212,0.45),transparent)" }} />
                  <span style={{ fontSize: 20 }}>🧠</span>
                </div>
                <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#06B6D4", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>MSc ML &amp; AI · LJMU</p>
                <h3 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(16px,2vw,22px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>Bridging Academia and Industry</h3>
                <p style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,0.46)", lineHeight: 1.8 }}>
                  Completed advanced studies in Machine Learning and Artificial Intelligence while building enterprise-scale solutions in financial services. Combined academic AI knowledge with real-world implementation across customer data platforms, marketing technology, analytics, and AI transformation initiatives.
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(6,182,212,0.12)" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "rgba(6,182,212,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Liverpool John Moores University · 2019–2021</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── EXECUTIVE RECOGNITION ──────────────────────────────────────────── */}
        <section ref={awardsRef} style={{
          padding: "clamp(64px,9vw,110px) clamp(24px,6vw,96px)",
          background: "linear-gradient(180deg,#060610 0%,#040408 100%)",
        }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: "clamp(10px,1.1vw,11px)", color: "#FCD34D", letterSpacing: "0.38em", textTransform: "uppercase" }}>Executive Recognition</span>
            <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.5rem)", letterSpacing: "-0.035em", color: "#FFFFFF", lineHeight: 0.95, marginTop: 14, marginBottom: 14, textTransform: "lowercase" }}>trophy cabinet.</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", maxWidth: 400, margin: "0 auto", fontFamily: "var(--font-jetbrains-mono),monospace", lineHeight: 1.7 }}>
              Recognised by leadership for measurable impact across enterprise AI and data transformation.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "clamp(12px,2vw,20px)", maxWidth: 1100, margin: "0 auto" }}>
            {AWARDS.map((a, i) => (
              <motion.div key={a.title + a.year}
                initial={{ opacity: 0, y: 26 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.09, duration: 0.55 }}
                whileHover={{ y: -8, boxShadow: `0 20px 52px ${a.color}2a`, transition: { duration: 0.22 } }}
                style={{
                  padding: "clamp(22px,3vw,34px) clamp(14px,2vw,22px)", textAlign: "center",
                  background: `linear-gradient(145deg,${a.color}08,${a.color}14)`,
                  border: `1px solid ${a.color}28`, borderRadius: 18,
                  position: "relative", overflow: "hidden", cursor: "default",
                }}
              >
                <motion.div
                  animate={{ x: ["-130%","230%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.65 + 0.5, repeatDelay: 4.5 }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", transform: "skewX(-18deg)", pointerEvents: "none" }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "clamp(26px,4vw,38px)", marginBottom: 14 }}>{a.emoji}</div>
                  <div style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: "clamp(10px,1vw,12px)", color: a.color, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>{a.year}</div>
                  <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 800, fontSize: "clamp(14px,1.6vw,18px)", color: "#FFFFFF", letterSpacing: "-0.01em", marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: "clamp(10px,1vw,12px)", color: `${a.color}aa`, marginBottom: 12, fontWeight: 600 }}>{a.org}</div>
                  <div style={{ fontSize: "clamp(10px,1vw,11px)", color: "rgba(255,255,255,0.3)", lineHeight: 1.65 }}>{a.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={awardsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65, duration: 0.7 }}
            style={{ textAlign: "center", marginTop: "clamp(52px,7vw,88px)", padding: "clamp(32px,4vw,52px) clamp(24px,4vw,48px)", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 22, maxWidth: 700, margin: "clamp(52px,7vw,88px) auto 0" }}
          >
            <p style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem,3.2vw,2.4rem)", color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.22, marginBottom: 18, textTransform: "lowercase" }}>
              not just another<br />
              <span style={{ background: "linear-gradient(135deg,#818CF8 0%,#06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>data scientist.</span>
            </p>
            <p style={{ fontSize: "clamp(12px,1.35vw,15px)", color: "rgba(255,255,255,0.36)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto" }}>
              IIT-level engineering foundations. Published Springer research. Enterprise-scale customer data platforms. AI transformation across 70M+ customers. Three-time CEO Award winner. This is the full picture.
            </p>
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  );
}
