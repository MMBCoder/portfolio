"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

/* ─── Data ────────────────────────────────────────────────────────────────── */

const SYNC_NODES = [
  { id: "bc", label: "BlueConic",   angle: 270, color: "#2563EB" },
  { id: "mp", label: "Marketplace", angle: 330, color: "#7C3AED" },
  { id: "vi", label: "Vista",       angle:  30, color: "#0891B2" },
  { id: "da", label: "DApply",      angle:  90, color: "#059669" },
  { id: "am", label: "Amplero",     angle: 150, color: "#D97706" },
  { id: "sf", label: "SFTP Feeds",  angle: 210, color: "#DB2777" },
];

const SYNC_OUTER = [
  { id: "cid", label: "Customer Identity",   angle: 248, r: 45, color: "#3B82F6" },
  { id: "pu",  label: "Profile Unification", angle: 312, r: 45, color: "#8B5CF6" },
  { id: "rta", label: "Real-Time Activation",angle:  18, r: 45, color: "#10B981" },
  { id: "p70", label: "70M+ Profiles",       angle:  80, r: 45, color: "#F59E0B" },
];

const SYNC_TECHS = ["BlueConic","Python","PySpark","AWS","Databricks","Snowflake","LangGraph","GenAI","Agentic AI"];


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

/* ─── Node Ecosystem (dark panel, light page) ────────────────────────────── */

function NodeEcosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const inner = SYNC_NODES.map(n => ({ ...n, ...pct(n.angle, 31) }));
  const outer = SYNC_OUTER.map(n => ({ ...n, ...pct(n.angle, n.r) }));

  return (
    <div ref={ref} style={{
      position: "relative",
      width: "min(360px, calc(100vw - 56px))",
      aspectRatio: "1 / 1",
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx={50} cy={50} r={45} fill="none" stroke="rgba(37,99,235,0.12)" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx={50} cy={50} r={31} fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
        <circle cx={50} cy={50} r={10} fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.25)" strokeWidth="0.5" />
        {inner.map((n, i) => (
          <motion.line key={n.id} x1={50} y1={50} x2={n.x} y2={n.y}
            stroke={n.color} strokeOpacity={0.35} strokeWidth="0.4"
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
              stroke={on.color} strokeOpacity={0.2} strokeWidth="0.3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85 + oi * 0.1, duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* CDP centre */}
      <motion.div
        animate={{ boxShadow: ["0 0 8px rgba(37,99,235,0.3)","0 0 22px rgba(37,99,235,0.55)","0 0 8px rgba(37,99,235,0.3)"] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          width: "17%", height: "17%",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
          border: "2px solid #BFDBFE",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 3,
        }}
      >
        <span style={{ fontSize: "clamp(5px,1.5vw,7px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.3, fontFamily: "var(--font-jetbrains-mono),monospace" }}>CDP<br/>CORE</span>
      </motion.div>

      {inner.map((n, i) => (
        <motion.div key={n.id}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 220 }}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}
        >
          <div style={{ padding: "3px 8px", borderRadius: 5, background: "#FFFFFF", border: `1.5px solid ${n.color}`, boxShadow: `0 2px 8px ${n.color}22` }}>
            <span style={{ fontSize: "clamp(6px,1.5vw,8px)", color: n.color, fontWeight: 700, whiteSpace: "nowrap", fontFamily: "var(--font-jetbrains-mono),monospace" }}>{n.label}</span>
          </div>
        </motion.div>
      ))}

      {outer.map((n, i) => (
        <motion.div key={n.id}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 180 }}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 3 }}
        >
          <div style={{ padding: "2px 6px", borderRadius: 4, background: `${n.color}0D`, border: `1px solid ${n.color}40` }}>
            <span style={{ fontSize: "clamp(5px,1.3vw,7px)", color: n.color, fontWeight: 500, whiteSpace: "nowrap", fontFamily: "var(--font-jetbrains-mono),monospace" }}>{n.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Neural Network SVG ─────────────────────────────────────────────────── */

function NeuralNet() {
  const nodes = [[18,22],[18,50],[18,78],[50,12],[50,36],[50,64],[50,88],[82,28],[82,72]];
  const edges = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],[3,7],[4,7],[4,8],[5,7],[5,8],[6,8]];
  return (
    <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}>
      {edges.map(([a,b],i) => (
        <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#7C3AED" strokeWidth="0.6"
          animate={{ strokeOpacity: [0.15,0.7,0.15] }}
          transition={{ duration: 2.2 + i * 0.25, repeat: Infinity, delay: i * 0.14 }}
        />
      ))}
      {nodes.map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r="2" fill="#7C3AED"
          animate={{ opacity: [0.2,0.85,0.2] }}
          transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, delay: i * 0.11 }}
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

  const syncInView    = useInView(syncRef,    { once: true, margin: "-60px" });
  const citiInView    = useInView(citiRef,    { once: true, margin: "-60px" });
  const genpactInView = useInView(genpactRef, { once: true, margin: "-60px" });
  const foundInView   = useInView(foundRef,   { once: true, margin: "-40px" });

  return (
    <>
      <div style={{ background: "#FFFFFF" }}>

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div style={{ borderBottom: "1px solid #E5E5E5" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ padding: "clamp(48px,8vw,100px) clamp(24px,6vw,96px) clamp(40px,6vw,72px)" }}
          >
            <h1
              className="heading-xl"
              style={{
                fontFamily: "var(--font-space-grotesk),sans-serif",
                fontWeight: 900, fontSize: "clamp(3.5rem,8vw,7.5rem)",
                letterSpacing: "-0.04em", lineHeight: 0.95,
                color: "#111111", textTransform: "lowercase",
                marginBottom: 24,
              }}
            >
              career<br />evolution.
            </h1>
            <p style={{ fontSize: "clamp(15px,1.5vw,18px)", color: "#555555", maxWidth: 520, lineHeight: 1.65 }}>
              From Analytics Practitioner to AI Transformation Leader — 12+ years building customer data platforms and enterprise AI systems across financial services.
            </p>

            {/* Chapter pills */}
            <div style={{ display: "flex", gap: "clamp(10px,2vw,20px)", marginTop: 32, flexWrap: "wrap" }}>
              {[
                { num: "01", label: "Synchrony Financial", current: true },
                { num: "02", label: "Citibank" },
                { num: "03", label: "Genpact" },
              ].map((c, i) => (
                <motion.div key={c.num}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.09 }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 16px", background: c.current ? "#111111" : "#F3F3F3", borderRadius: 40 }}
                >
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: c.current ? "#999" : "#888", fontWeight: 700 }}>{c.num}</span>
                  <span style={{ fontSize: 12, color: c.current ? "#FFFFFF" : "#666666", fontWeight: c.current ? 600 : 400 }}>{c.label}</span>
                  {c.current && <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 8, color: "#888", letterSpacing: "0.1em" }}>CURRENT</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── SYNCHRONY FINANCIAL ─────────────────────────────────────────── */}
        <section ref={syncRef} style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E5E5" }}>

          {/* Company header strip */}
          <div style={{ padding: "clamp(32px,5vw,56px) clamp(24px,6vw,96px) 0", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <motion.span initial={{ opacity: 0 }} animate={syncInView ? { opacity: 1 } : {}} style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#888888", letterSpacing: "0.3em", textTransform: "uppercase" }}>Chapter 01</motion.span>
            <div style={{ flex: 1, height: 1, background: "#E5E5E5", minWidth: 24 }} />
            <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, padding: "4px 12px", background: "#111111", color: "#FFFFFF", borderRadius: 20, letterSpacing: "0.12em" }}>CURRENT ROLE</span>
          </div>

          <div style={{ padding: "clamp(28px,4vw,44px) clamp(24px,6vw,96px) clamp(40px,5vw,64px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,64px)", alignItems: "flex-start" }}>

              {/* Left: company info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={syncInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ flex: "1 1 300px", minWidth: 0 }}>

                {/* Logo + name row */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: "#F3F3F3", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 6 }}>
                    <Image src="/images/icons/Synchrony Financial.png" alt="Synchrony Financial" width={40} height={40} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", letterSpacing: "-0.03em", color: "#111111", lineHeight: 1, textTransform: "lowercase" }}>Synchrony Financial</h2>
                    <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#888888", letterSpacing: "0.06em", marginTop: 6 }}>2019 – Present · Hyderabad, India</p>
                  </div>
                </div>

                <div style={{ display: "inline-block", padding: "6px 14px", background: "#F3F3F3", border: "1px solid #E5E5E5", borderRadius: 6, marginBottom: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#444444" }}>AVP – Data Scientist &amp; Data Engineer</span>
                </div>

                <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "#555555", lineHeight: 1.75, maxWidth: 500, marginBottom: 28 }}>
                  Strategic contributor to Synchrony&apos;s enterprise customer data ecosystem. Own end-to-end data integration architecture connecting BlueConic CDP with core digital platforms — enabling unified 360° customer profiles, real-time marketing activation, and personalised engagement across 70M+ customers.
                </p>

                {/* Counters */}
                <div style={{ display: "flex", gap: "clamp(10px,2vw,20px)", flexWrap: "wrap", marginBottom: 28 }}>
                  {[
                    { display: <><Counter to={70} />M+</>, label: "Customer Profiles" },
                    { display: <>3×</>,                    label: "CEO Awards"         },
                    { display: <><Counter to={6} />+</>,   label: "Years Experience"   },
                  ].map((h, i) => (
                    <div key={i} style={{ textAlign: "center", padding: "16px 20px", background: "#F9F9F9", border: "1px solid #E5E5E5", borderRadius: 10, minWidth: 80 }}>
                      <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.4rem)", color: "#111111", letterSpacing: "-0.03em", lineHeight: 1 }}>{h.display}</div>
                      <div style={{ fontSize: 10, color: "#888888", marginTop: 6, fontFamily: "var(--font-jetbrains-mono),monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {SYNC_TECHS.map((t, i) => (
                    <motion.span key={t}
                      initial={{ opacity: 0, scale: 0.8 }} animate={syncInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.04 }}
                      style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: "11px", padding: "5px 12px", background: "#F3F3F3", border: "1px solid #E5E5E5", color: "#444444", borderRadius: 5 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Right: ecosystem diagram in a contained panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={syncInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
                style={{ flex: "0 1 auto", display: "flex", justifyContent: "center", alignSelf: "center" }}
              >
                <div style={{ padding: "clamp(20px,3vw,32px)", background: "#F9F9F9", border: "1px solid #E5E5E5", borderRadius: 16 }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#AAAAAA", letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "center", marginBottom: 12 }}>CDP Ecosystem Architecture</p>
                  <NodeEcosystem />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CITIBANK ─────────────────────────────────────────────────────── */}
        <section ref={citiRef} style={{ background: "#F9F9F9", borderBottom: "1px solid #E5E5E5" }}>
          <div style={{ padding: "clamp(32px,5vw,56px) clamp(24px,6vw,96px) 0", display: "flex", alignItems: "center", gap: 16 }}>
            <motion.span initial={{ opacity: 0 }} animate={citiInView ? { opacity: 1 } : {}} style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#888888", letterSpacing: "0.3em", textTransform: "uppercase" }}>Chapter 02</motion.span>
            <div style={{ flex: 1, height: 1, background: "#E5E5E5" }} />
          </div>

          <div style={{ padding: "clamp(28px,4vw,44px) clamp(24px,6vw,96px) clamp(40px,5vw,64px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,60px)", alignItems: "flex-start" }}>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={citiInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ flex: "1 1 300px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: "#FFFFFF", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 6 }}>
                    <Image src="/images/icons/Citi Bank.png" alt="Citibank" width={40} height={40} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", letterSpacing: "-0.03em", color: "#111111", lineHeight: 1, textTransform: "lowercase" }}>Citibank</h2>
                    <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#888888", letterSpacing: "0.06em", marginTop: 6 }}>2018 – 2019 · Bengaluru, India</p>
                  </div>
                </div>
                <div style={{ display: "inline-block", padding: "6px 14px", background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 6, marginBottom: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#444444" }}>Analytics Manager – Cards &amp; Consumer Banking</span>
                </div>
                <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "#555555", lineHeight: 1.75, maxWidth: 540, marginBottom: 28 }}>
                  Led data science and analytics for Citi Singapore&apos;s Retail Banking portfolio across Credit Cards, CASA, and Consumer Lending. Delivered predictive analytics, executive dashboards, and automated reporting — saving 1,000+ annual hours through process automation.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {["Cards Analytics","Consumer Banking","Predictive Modeling","Executive Dashboards","Automation"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: "4px 11px", background: "#FFFFFF", border: "1px solid #E5E5E5", color: "#666666", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {["Python","SQL","SAS","AWS","Power BI","Tableau"].map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "4px 11px", background: "#FFFFFF", border: "1px solid #E5E5E5", color: "#444444", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Metric card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={citiInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.28 }} style={{ flex: "0 1 220px", minWidth: 180 }}>
                <div style={{ padding: "28px 24px", background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 14 }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#AAAAAA", letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 16 }}>Impact Highlight</p>
                  <div style={{ textAlign: "center", paddingBottom: 20, borderBottom: "1px solid #E5E5E5", marginBottom: 18 }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3rem)", color: "#111111", letterSpacing: "-0.04em", lineHeight: 1 }}>1,000+</div>
                    <div style={{ fontSize: 10, color: "#888888", marginTop: 8, fontFamily: "var(--font-jetbrains-mono),monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Hours Saved Annually</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {["Singapore Retail Banking","Credit Cards · CASA","Consumer Lending"].map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#BBBBBB", fontSize: 12, marginTop: 1, flexShrink: 0 }}>›</span>
                        <span style={{ fontSize: 12, color: "#666666", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── GENPACT ──────────────────────────────────────────────────────── */}
        <section ref={genpactRef} style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E5E5" }}>
          <div style={{ padding: "clamp(32px,5vw,56px) clamp(24px,6vw,96px) 0", display: "flex", alignItems: "center", gap: 16 }}>
            <motion.span initial={{ opacity: 0 }} animate={genpactInView ? { opacity: 1 } : {}} style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "#888888", letterSpacing: "0.3em", textTransform: "uppercase" }}>Chapter 03 · Where It Began</motion.span>
            <div style={{ flex: 1, height: 1, background: "#E5E5E5", minWidth: 24 }} />
          </div>

          <div style={{ padding: "clamp(28px,4vw,44px) clamp(24px,6vw,96px) clamp(40px,5vw,64px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,60px)", alignItems: "flex-start" }}>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={genpactInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ flex: "1 1 300px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: "#F3F3F3", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 6 }}>
                    <Image src="/images/icons/Genpact.png" alt="Genpact" width={40} height={40} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem,3.5vw,2.8rem)", letterSpacing: "-0.03em", color: "#111111", lineHeight: 1, textTransform: "lowercase" }}>Genpact</h2>
                    <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#888888", letterSpacing: "0.06em", marginTop: 6 }}>2014 – 2018 · Bengaluru, India</p>
                  </div>
                </div>
                <div style={{ display: "inline-block", padding: "6px 14px", background: "#F3F3F3", border: "1px solid #E5E5E5", borderRadius: 6, marginBottom: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#444444" }}>Assistant Manager – Analytics &amp; Automation</span>
                </div>
                <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "#555555", lineHeight: 1.75, maxWidth: 540, marginBottom: 28 }}>
                  Where everything started. Delivered performance marketing analytics and customer intelligence for US Retail Banking and PLCC portfolios. Built attribution models, campaign measurement frameworks, and customer journey analytics generating multi-million dollar business value.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {["Customer Intelligence","Marketing Analytics","Journey Analytics","Performance Optimization"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: "4px 11px", background: "#F3F3F3", border: "1px solid #E5E5E5", color: "#666666", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono),monospace" }}>{tag}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={genpactInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.28 }} style={{ flex: "0 1 220px", minWidth: 180 }}>
                <div style={{ padding: "28px 24px", background: "#F9F9F9", border: "1px solid #E5E5E5", borderRadius: 14 }}>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 9, color: "#AAAAAA", letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 16 }}>Foundation Achievements</p>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(1rem,2vw,1.4rem)", color: "#111111", lineHeight: 1.2, marginBottom: 4 }}>Multi-Million Dollar</div>
                    <div style={{ fontSize: 10, color: "#888888", fontFamily: "var(--font-jetbrains-mono),monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Business Impact</div>
                  </div>
                  <div style={{ paddingTop: 14, borderTop: "1px solid #E5E5E5", display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Two Internal Promotions","US PLCC Portfolio","Attribution Modeling","Campaign Measurement"].map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: "#BBBBBB", fontSize: 12, marginTop: 1, flexShrink: 0 }}>›</span>
                        <span style={{ fontSize: 12, color: "#666666", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FOUNDATIONS OF EXCELLENCE ────────────────────────────────────── */}
        <section ref={foundRef} style={{ background: "#F9F9F9", borderBottom: "1px solid #E5E5E5" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ padding: "clamp(40px,6vw,72px) clamp(24px,6vw,96px) 0" }}
          >
            <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#888888" }}>Foundations of Excellence</span>
            <h2 className="heading-xl" style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,4.5rem)", letterSpacing: "-0.04em", color: "#111111", textTransform: "lowercase", lineHeight: 0.95, marginTop: 12, marginBottom: 8 }}>
              achievements unlocked.
            </h2>
            <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "#888888", marginBottom: 40, maxWidth: 460, lineHeight: 1.65 }}>
              Credibility milestones that shaped the AI transformation leader of today.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 0, padding: "0", borderTop: "1px solid #E5E5E5" }}>

            {/* ─ IIT Delhi ─ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ background: "#FFFFFF" }}
              style={{ padding: "clamp(28px,4vw,48px) clamp(20px,3vw,40px)", background: "#F9F9F9", borderRight: "1px solid #E5E5E5", transition: "background 0.2s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "#FFFFFF", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 6 }}>
                  <Image src="/images/icons/IIT Delhi.png" alt="IIT Delhi" width={36} height={36} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#555555", fontWeight: 700, marginBottom: 3 }}>IIT Delhi</p>
                  <p style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-jetbrains-mono),monospace" }}>M.Tech · 2012–2014</p>
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 800, fontSize: "clamp(16px,2vw,22px)", color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 14 }}>Built the Engineering Mindset</h3>
              <p style={{ fontSize: "clamp(13px,1.2vw,14px)", color: "#666666", lineHeight: 1.75 }}>
                Graduated from the Indian Institute of Technology Delhi, one of India&apos;s most prestigious engineering institutions. Developed strong foundations in analytical thinking, research methodologies, complex problem solving, and systems engineering that continue to influence enterprise-scale AI and data platform design today.
              </p>
            </motion.div>

            {/* ─ Springer Research ─ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.18, duration: 0.6 }}
              whileHover={{ background: "#FFFFFF" }}
              style={{ padding: "clamp(28px,4vw,48px) clamp(20px,3vw,40px)", background: "#F9F9F9", position: "relative", overflow: "hidden", borderRight: "1px solid #E5E5E5", transition: "background 0.2s" }}
            >
              {/* Floating paper decoration */}
              {[0,1,2].map(i => (
                <motion.div key={i}
                  animate={{ y: [0,-5-i*3,0], rotate: [-1+i*2,2+i,  -1+i*2] }}
                  transition={{ duration: 4+i*1.2, repeat: Infinity, delay: i*0.8 }}
                  style={{ position: "absolute", right: `${10+i*10}%`, top: `${6+i*7}%`, width: 28, height: 36, background: "#EEEEEE", border: "1px solid #DDDDDD", borderRadius: 3, opacity: 0.7-i*0.2 }}
                />
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, position: "relative", zIndex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "#FFFFFF", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>📖</div>
                <div>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#555555", fontWeight: 700, marginBottom: 3 }}>Springer Publications</p>
                  <p style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-jetbrains-mono),monospace" }}>First Author · 2016 &amp; 2021</p>
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 800, fontSize: "clamp(16px,2vw,22px)", color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 14, position: "relative", zIndex: 1 }}>Published Researcher</h3>
              <p style={{ fontSize: "clamp(13px,1.2vw,14px)", color: "#666666", lineHeight: 1.75, position: "relative", zIndex: 1 }}>
                Published peer-reviewed research in Springer, contributing to academic and engineering innovation through experimental analysis, simulation-driven problem solving, and scientific investigation.
              </p>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #E5E5E5", position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: 11, color: "#888888", lineHeight: 1.7 }}>Engineering droplet navigation through tertiary-junction microchannels</p>
                <p style={{ fontSize: 11, color: "#888888", lineHeight: 1.7 }}>AI-Driven Data Analytics for Enterprise Systems</p>
              </div>
            </motion.div>

            {/* ─ ML & AI ─ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28, duration: 0.6 }}
              whileHover={{ background: "#FFFFFF" }}
              style={{ padding: "clamp(28px,4vw,48px) clamp(20px,3vw,40px)", background: "#F9F9F9", position: "relative", overflow: "hidden", transition: "background 0.2s" }}
            >
              <NeuralNet />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, position: "relative", zIndex: 1 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "#FFFFFF", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 4 }}>
                  <Image src="/images/icons/LJMU.jpg" alt="LJMU" width={36} height={36} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#555555", fontWeight: 700, marginBottom: 3 }}>LJMU</p>
                  <p style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-jetbrains-mono),monospace" }}>MSc ML &amp; AI · 2019–2021</p>
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-space-grotesk),sans-serif", fontWeight: 800, fontSize: "clamp(16px,2vw,22px)", color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 14, position: "relative", zIndex: 1 }}>Bridging Academia and Industry</h3>
              <p style={{ fontSize: "clamp(13px,1.2vw,14px)", color: "#666666", lineHeight: 1.75, position: "relative", zIndex: 1 }}>
                Completed advanced studies in Machine Learning and Artificial Intelligence while building enterprise-scale solutions in financial services. Combined academic AI knowledge with real-world implementation across customer data platforms, marketing technology, and AI transformation initiatives.
              </p>
            </motion.div>
          </div>

          {/* AMU row — below the 3 cards */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={foundInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.38, duration: 0.6 }}
            style={{ padding: "clamp(24px,4vw,40px) clamp(24px,6vw,96px)", borderTop: "1px solid #E5E5E5", display: "flex", alignItems: "center", gap: "clamp(16px,3vw,32px)", flexWrap: "wrap" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "#FFFFFF", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 4 }}>
                <Image src="/images/icons/AMU.png" alt="AMU" width={32} height={32} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 13, color: "#555555", fontWeight: 700 }}>Aligarh Muslim University</p>
                <p style={{ fontSize: 13, color: "#888888" }}>B.Tech – Engineering &amp; Technology · 2008–2012</p>
              </div>
            </div>
            <div style={{ flex: 1, height: 1, background: "#E5E5E5", minWidth: 24 }} />
            <p style={{ fontSize: 13, color: "#888888", maxWidth: 420, lineHeight: 1.6 }}>
              Engineering foundation in process systems, thermodynamics, and chemical engineering. Capstone project on industrial polyethylene plant design.
            </p>
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  );
}
