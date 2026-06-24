"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/portfolioData";

export default function Awards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="awards" ref={ref} style={{ background: "#FFFFFF" }}>

      {/* Header */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 awards-header-grid"
        style={{
          borderBottom: "1px solid #E8E8E8",
          minHeight: "240px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            padding: "clamp(40px, 5vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "1px solid #E8E8E8",
          }}
        >
          <h1 className="heading-xl" style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 7vw, 7rem)",
            letterSpacing: "-0.04em",
            color: "#111111",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "20px",
          }}>
            awards.
          </h1>
          <p style={{ fontSize: "16px", color: "#888888", maxWidth: "320px", lineHeight: 1.7 }}>
            Recognized for measurable AI transformation impact across financial services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            padding: "clamp(40px, 5vw, 72px)",
            display: "flex",
            alignItems: "center",
            background: "#F9F9F9",
          }}
        >
          <div style={{
            padding: "24px 32px",
            borderLeft: "4px solid #111111",
          }}>
            <p style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
              color: "#111111",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: "10px",
            }}>
              Three-Time CEO Award Winner
            </p>
            <p style={{ fontSize: "14px", color: "#888888", lineHeight: 1.6 }}>
              Synchrony Financial&apos;s highest honour — awarded three times (2021, 2023, 2025) for enterprise AI transformation leadership.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Awards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
        gap: "0",
      }}>
        {achievements.map((ach, i) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            style={{
              padding: "clamp(28px, 4vw, 48px)",
              borderBottom: "1px solid #E8E8E8",
              borderRight: "1px solid #E8E8E8",
              background: "#FFFFFF",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              {/* Color accent dot */}
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: ach.color,
                flexShrink: 0,
                marginTop: "6px",
              }} />
              <div>
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  color: ach.color,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}>
                  {ach.year}
                </span>
                <h3 style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(17px, 1.8vw, 21px)",
                  color: "#111111",
                  letterSpacing: "-0.02em",
                  marginTop: "6px",
                  marginBottom: "6px",
                }}>
                  {ach.title}
                </h3>
                <p style={{ fontSize: "13px", fontWeight: 600, color: ach.color, marginBottom: "10px" }}>
                  {ach.organization}
                </p>
                <p style={{ fontSize: "13px", color: "#666666", lineHeight: 1.6 }}>
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
