"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSplit() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#111111",
      }}
    >
      {/* Full-screen background image */}
      <Image
        src="/images/mirza_home.png"
        alt="Mirza Minhaz Baig"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center top" }}
        priority
      />

      {/* Gradient overlay — darkens edges, keeps center bright */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 38%, rgba(0,0,0,0.04) 62%, rgba(0,0,0,0.42) 100%)",
        zIndex: 1,
      }} />

      {/* LEFT — AI Consultant → /about */}
      <Link
        href="/about"
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(24px, 4vw, 64px)",
          background: hovered === "left" ? "rgba(0,0,0,0.18)" : "transparent",
          transition: "background 0.35s ease",
          textDecoration: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            click to explore
          </p>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4.5vw, 5.5rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "12px",
          }}>
            ai<br />consultant.
          </h2>
          <p className="hero-label-text" style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "240px",
            lineHeight: 1.6,
          }}>
            AI strategy, Agentic AI systems &amp; enterprise transformation
          </p>
        </motion.div>
      </Link>

      {/* Thin vertical divider */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "8%",
        bottom: "8%",
        width: "1px",
        background: "rgba(255,255,255,0.15)",
        zIndex: 3,
      }} />

      {/* RIGHT — Data Scientist → /experience */}
      <Link
        href="/experience"
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: "clamp(24px, 4vw, 64px)",
          background: hovered === "right" ? "rgba(0,0,0,0.18)" : "transparent",
          transition: "background 0.35s ease",
          textDecoration: "none",
          textAlign: "right",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
        >
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            click to explore
          </p>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4.5vw, 5.5rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "8px",
          }}>
            customer<br />data platform.
          </h2>
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 0.85vw, 11px)",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            Data Scientist &amp; Data Engineer
          </p>
          <p className="hero-label-text" style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "240px",
            lineHeight: 1.6,
          }}>
            BlueConic CDP · customer identity · real-time marketing activation
          </p>
        </motion.div>
      </Link>

      {/* Mobile bottom bar — tap targets on small screens */}
      <div className="hero-mobile-bar" style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        display: "none",
        overflow: "hidden",
      }}>
        <Link href="/about" style={{
          display: "inline-block",
          width: "50%",
          padding: "18px 12px",
          background: "rgba(0,0,0,0.78)",
          color: "#FFFFFF",
          textAlign: "center",
          textDecoration: "none",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          borderRight: "1px solid rgba(255,255,255,0.12)",
          letterSpacing: "-0.01em",
        }}>
          ai consultant →
        </Link>
        <Link href="/experience" style={{
          display: "inline-block",
          width: "50%",
          padding: "18px 12px",
          background: "rgba(0,0,0,0.78)",
          color: "#FFFFFF",
          textAlign: "center",
          textDecoration: "none",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          letterSpacing: "-0.01em",
        }}>
          customer data platform →
        </Link>
      </div>
    </section>
  );
}
