"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/portfolioData";

// CEO Award gets its own hero — the rest go in a standard grid
const ceoAward = achievements.find((a) => a.id === "1")!;
const otherAwards = achievements.filter((a) => a.id !== "1");

// Icon map keyed by achievement id
const ICONS: Record<string, React.ReactNode> = {
  "2": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "3": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "4": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
};

export default function Awards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="awards" ref={ref} style={{ background: "#FFFFFF" }}>

      {/* ── CEO Award Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          background: "linear-gradient(135deg, #111111 0%, #1a1a2e 60%, #16213e 100%)",
          borderBottom: "1px solid #222222",
          padding: "clamp(48px, 7vw, 96px) clamp(24px, 6vw, 96px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative glow */}
        <div style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 64px)", alignItems: "center", position: "relative", zIndex: 1 }}>

          {/* Trophy visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            style={{ flexShrink: 0 }}
          >
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #B45309 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(245,158,11,0.35), 0 0 80px rgba(245,158,11,0.12)",
            }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0012 0V2z" />
              </svg>
            </div>
          </motion.div>

          {/* CEO Award content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ flex: "1 1 300px", minWidth: 0 }}
          >
            <p style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "#F59E0B",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "10px",
              fontWeight: 700,
            }}>
              Highest Honour · Synchrony Financial
            </p>
            <h1 style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              lineHeight: 0.95,
              marginBottom: "16px",
              textTransform: "lowercase",
            }}>
              three-time<br />ceo award.
            </h1>
            <p style={{
              fontSize: "clamp(14px, 1.4vw, 16px)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              maxWidth: "520px",
              marginBottom: "24px",
            }}>
              {ceoAward.description}
            </p>

            {/* Year badges */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["2021", "2023", "2025"].map((year) => (
                <div key={year} style={{
                  padding: "8px 18px",
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.35)",
                  borderRadius: "6px",
                  textAlign: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 900,
                    fontSize: "18px",
                    color: "#F59E0B",
                    letterSpacing: "-0.02em",
                    display: "block",
                    lineHeight: 1,
                  }}>
                    {year}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "8px",
                    color: "rgba(245,158,11,0.55)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    CEO Award
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Page header strip ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 awards-header-grid"
        style={{
          borderBottom: "1px solid #E8E8E8",
          minHeight: "200px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            padding: "clamp(32px, 4vw, 56px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "1px solid #E8E8E8",
          }}
        >
          <h2 className="heading-xl" style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 6vw, 6rem)",
            letterSpacing: "-0.04em",
            color: "#111111",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "16px",
          }}>
            recognition.
          </h2>
          <p style={{ fontSize: "15px", color: "#555555", maxWidth: "320px", lineHeight: 1.7 }}>
            Recognized for measurable AI transformation impact across financial services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            padding: "clamp(32px, 4vw, 56px)",
            display: "flex",
            alignItems: "center",
            background: "#F9F9F9",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px", width: "100%" }}>
            {[
              { value: "3×", label: "CEO Award" },
              { value: "4", label: "Total Awards" },
              { value: "12+", label: "Years Recognised" },
              { value: "2021–2026", label: "Award Span" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  color: "#111111",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}>
                  {value}
                </div>
                <div style={{ fontSize: "12px", color: "#888888", fontFamily: "var(--font-jetbrains-mono), monospace" }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Other awards grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
        gap: "0",
      }}>
        {otherAwards.map((ach, i) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
            style={{
              padding: "clamp(28px, 4vw, 44px)",
              borderBottom: "1px solid #E8E8E8",
              borderRight: "1px solid #E8E8E8",
              background: "#FFFFFF",
              transition: "background 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
          >
            {/* Top color bar */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: ach.color,
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", paddingTop: "8px" }}>
              {/* Icon circle */}
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: `${ach.color}14`,
                border: `1px solid ${ach.color}28`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ach.color,
                flexShrink: 0,
              }}>
                {ICONS[ach.id] ?? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "10px",
                  color: ach.color,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}>
                  {ach.year}
                </span>
                <h3 style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  color: "#111111",
                  letterSpacing: "-0.02em",
                  marginTop: "6px",
                  marginBottom: "4px",
                }}>
                  {ach.title}
                </h3>
                <p style={{ fontSize: "12px", fontWeight: 600, color: ach.color, marginBottom: "10px" }}>
                  {ach.organization}
                </p>
                <p style={{ fontSize: "13px", color: "#555555", lineHeight: 1.65 }}>
                  {ach.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
