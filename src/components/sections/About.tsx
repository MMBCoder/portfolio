"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const consultantList = [
  "Agentic AI systems & LLM orchestration",
  "RAG architectures & prompt engineering",
  "AI strategy & enterprise governance",
  "Human-in-the-loop workflow design",
  "Executive stakeholder enablement",
  "AI transformation leadership",
];

const scientistList = [
  "Machine learning & deep learning",
  "Python, PySpark, SQL at scale",
  "Customer data platforms (CDP)",
  "Feature engineering & MLOps",
  "Power BI & conversational analytics",
  "Data pipeline architecture",
];

const skillBars = [
  { label: "Agentic AI & LLM Engineering", pct: 95 },
  { label: "Machine Learning & Data Science", pct: 88 },
  { label: "Data Engineering & Platforms", pct: 90 },
  { label: "AI Strategy & Consulting", pct: 92 },
  { label: "People Leadership & Mentoring", pct: 88 },
  { label: "Python, PySpark & SQL", pct: 95 },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" ref={ref} style={{ background: "#FFFFFF" }}>

      {/* ─── Row 1: Text LEFT + Photo RIGHT ─── */}
      <div style={{ borderBottom: "1px solid #E5E5E5" }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>

          {/* LEFT — heading + text (takes full width on mobile, 50% on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              width: "100%",
              padding: "clamp(40px, 5vw, 80px) clamp(20px, 5vw, 96px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className="about-text-half"
          >
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                letterSpacing: "-0.04em",
                color: "#111111",
                textTransform: "lowercase",
                lineHeight: 0.95,
                marginBottom: "28px",
              }}
            >
              about.
            </h2>

            <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "#555555", maxWidth: "440px", lineHeight: 1.65, marginBottom: "16px" }}>
              I&apos;m an AI Consultant and Data Scientist based in Hyderabad, India.
            </p>

            <p style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "#888888", maxWidth: "440px", lineHeight: 1.7 }}>
              Since 2012, I&apos;ve enjoyed turning complex enterprise problems into intelligent AI solutions. When I&apos;m not building RAG pipelines or agentic workflows, you&apos;ll find me mentoring teams, exploring research, or reading about the next frontier in AI.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "28px" }}>
              {["AI Consultant", "Data Scientist", "Data Engineer", "Researcher", "People Leader"].map((r) => (
                <span
                  key={r}
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "11px",
                    padding: "5px 12px",
                    border: "1px solid #E5E5E5",
                    color: "#888888",
                  }}
                >
                  {r}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{ position: "relative", width: "100%" }}
            className="about-photo-half"
          >
            <Image
              src="/images/mirza_about.png"
              alt="Mirza Minhaz Baig — AI Consultant & Data Scientist"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
              priority
            />
          </motion.div>

        </div>
      </div>

      {/* ─── Row 2: Part AI Consultant + Part Data Scientist ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: "1px solid #E5E5E5" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-8 md:px-16 lg:px-24 py-12"
          style={{ borderRight: "1px solid #E5E5E5" }}
        >
          <h3
            className="font-heading font-black lowercase mb-8 leading-tight"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
          >
            part ai consultant.
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {consultantList.map((s) => (
              <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <span style={{ marginTop: "8px", width: "5px", height: "5px", borderRadius: "50%", background: "#111111", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6 }}>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-8 md:px-16 lg:px-24 py-12"
        >
          <h3
            className="font-heading font-black lowercase mb-8 leading-tight"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
          >
            part data scientist.
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {scientistList.map((s) => (
              <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <span style={{ marginTop: "8px", width: "5px", height: "5px", borderRadius: "50%", background: "#111111", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6 }}>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ─── Row 3: Skills ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-8 md:px-16 lg:px-24 py-12"
        style={{ borderBottom: "1px solid #E5E5E5", background: "#F9F9F9" }}
      >
        <h3
          className="font-heading font-black lowercase mb-10 leading-tight"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
        >
          my skills.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 max-w-4xl">
          {skillBars.map((s, i) => (
            <div key={s.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", color: "#444444" }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11px", color: "#999999" }}>{s.pct}%</span>
              </div>
              <div style={{ height: "3px", background: "#E5E5E5", borderRadius: "2px" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.pct}%` } : {}}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: "2px", background: "#111111" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── Row 4: Quick facts ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-8 md:px-16 lg:px-24 py-12"
        style={{ borderBottom: "1px solid #E5E5E5" }}
      >
        <h3
          className="font-heading font-black lowercase mb-8 leading-tight"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
        >
          quick facts.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 max-w-3xl">
          {[
            "Three-time Synchrony CEO Award winner",
            "LEAP leadership program — high-potential leader",
            "First-author published in Springer",
            "IIT Delhi M.Tech. graduate",
            "12+ years in financial services AI",
            "Led 20+ engineers, scientists & analysts",
            "Built AI systems used by 200+ stakeholders",
            "Based in Hyderabad, India",
          ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ marginTop: "8px", width: "5px", height: "5px", borderRadius: "50%", background: "#BBBBBB", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#666666", lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
