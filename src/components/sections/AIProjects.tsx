"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { aiProjects } from "@/data/portfolioData";

export default function AIProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<string | null>(null);
  const active = aiProjects.find((p) => p.id === selected) ?? null;

  return (
    <section id="projects" ref={ref} style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8" }}>

      {/* ── Section intro: heading LEFT, tagline RIGHT (Adham portfolio page layout) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid #E8E8E8",
          minHeight: "340px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            padding: "clamp(40px, 5vw, 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "1px solid #E8E8E8",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#111111",
              textTransform: "lowercase",
              marginBottom: "28px",
            }}
          >
            portfolio.
          </h2>
          <p style={{ fontSize: "18px", color: "#555555", maxWidth: "400px", lineHeight: 1.7, marginBottom: "16px" }}>
            AI solutions built for enterprise financial services — real problems, measurable impact.
          </p>
          <p style={{ fontSize: "15px", color: "#999999", maxWidth: "380px", lineHeight: 1.7 }}>
            I&apos;ve built Agentic AI systems, RAG pipelines, NLP analytics platforms, and ML models that are used daily by hundreds of business leaders inside regulated banking environments.
          </p>
        </motion.div>

        {/* Right: summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            padding: "clamp(40px, 5vw, 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#F9F9F9",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            {[
              { value: "6+", label: "AI products shipped" },
              { value: "$50M+", label: "revenue influenced" },
              { value: "200+", label: "stakeholders enabled" },
              { value: "96%", label: "time saved on key projects" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  color: "#111111",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "13px", color: "#999999", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Project cards grid ── */}
      <div>
        {aiProjects.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
            onClick={() => setSelected(project.id)}
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "64px 1fr auto",
              alignItems: "center",
              gap: "0",
              padding: "0",
              background: "none",
              border: "none",
              borderBottom: "1px solid #E8E8E8",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
          >
            {/* Color accent bar left */}
            <div style={{ width: "4px", height: "100%", background: project.color, alignSelf: "stretch" }} />

            {/* Content */}
            <div style={{ padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  color: project.color,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}>
                  {project.category}
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "10px",
              }}>
                {project.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#888888", lineHeight: 1.6, maxWidth: "600px" }}>
                {project.problem.slice(0, 120)}…
              </p>
              {/* Metrics */}
              <div style={{ display: "flex", gap: "28px", marginTop: "16px" }}>
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <span style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 900,
                      fontSize: "20px",
                      color: project.color,
                      letterSpacing: "-0.03em",
                    }}>
                      {m.value}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "10px",
                      color: "#BBBBBB",
                      marginLeft: "6px",
                    }}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ padding: "28px 32px", color: "#CCCCCC" }}>
              <ArrowUpRight size={20} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* ── Case study modal ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#FFFFFF",
                maxWidth: "680px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {/* Top color bar */}
              <div style={{ height: "4px", background: active.color }} />

              {/* Header */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "32px 32px 24px",
                borderBottom: "1px solid #E8E8E8",
              }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "11px",
                    color: active.color,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}>
                    {active.category}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 900,
                    fontSize: "28px",
                    color: "#111111",
                    letterSpacing: "-0.03em",
                  }}>
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid #E8E8E8",
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    flexShrink: 0,
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Metrics row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${active.metrics.length}, 1fr)`,
                borderBottom: "1px solid #E8E8E8",
              }}>
                {active.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      borderRight: i < active.metrics.length - 1 ? "1px solid #E8E8E8" : "none",
                    }}
                  >
                    <div style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 900,
                      fontSize: "22px",
                      color: active.color,
                      letterSpacing: "-0.03em",
                    }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#BBBBBB", marginTop: "4px" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div style={{ padding: "32px" }}>
                {[
                  { label: "Problem", text: active.problem },
                  { label: "Solution", text: active.solution },
                  { label: "Architecture", text: active.architecture },
                  { label: "Business Impact", text: active.impact },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: "24px" }}>
                    <div style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "10px",
                      color: active.color,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      fontWeight: 700,
                    }}>
                      {item.label}
                    </div>
                    <p style={{ fontSize: "14px", color: "#555555", lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                ))}

                <div>
                  <div style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "10px",
                    color: active.color,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                    fontWeight: 700,
                  }}>
                    Technologies
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {active.technologies.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          fontSize: "12px",
                          padding: "5px 12px",
                          border: "1px solid #E8E8E8",
                          color: "#666666",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { aiProjects };
