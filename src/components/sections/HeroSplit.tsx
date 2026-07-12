"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSplit() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ position: "relative", overflow: "hidden", background: "#0a0a0a" }}
    >
      {/* Background photo — image opacity reduced via overlay depth */}
      <Image
        src="/images/mirza_home.png"
        alt="Mirza Minhaz Baig — AI Transformation Leader"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.8 }}
        priority
      />

      {/* Gradient — heavy dark on left where copy lives, opens up on right */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(105deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.12) 100%)",
        zIndex: 1,
      }} />

      {/* Left-aligned content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(28px, 5vw, 96px)",
          maxWidth: "clamp(340px, 60vw, 740px)",
        }}
      >
        {/* Result stat — trust signal above the fold */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 16px",
            background: "rgba(37,99,235,0.15)",
            border: "1px solid rgba(37,99,235,0.4)",
            borderRadius: "4px",
          }}>
            <span style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "#93C5FD",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>AVP · Synchrony Financial</span>
          </div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "4px",
          }}>
            <span style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>IIT Delhi Alumnus</span>
          </div>
        </motion.div>

        {/* Three-word benefit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(14px, 1.3vw, 18px)",
            color: "#3B82F6",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "16px",
            fontWeight: 800,
          }}
        >
          AI · Data · Impact
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.75 }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 5.8vw, 6rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            lineHeight: 0.94,
            marginBottom: "20px",
            textTransform: "lowercase",
          }}
        >
          enterprise ai<br />that moves<br />the needle.
        </motion.h1>

        {/* 12+ years — bold, surfaces beside the headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.55 }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(13px, 1.2vw, 16px)",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.01em",
            marginBottom: "10px",
          }}
        >
          12+ years building enterprise AI in financial services.
        </motion.p>

        {/* Single-line subcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.55 }}
          style={{
            fontSize: "clamp(12px, 1.1vw, 15px)",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.65,
            maxWidth: "400px",
            marginBottom: "40px",
          }}
        >
          From LLM strategy to shipped product — AI that generates real revenue in regulated environments.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          className="hero-overlay-content"
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}
        >
          <Link
            href="/portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              background: "#FFFFFF",
              color: "#111111",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: "6px",
              whiteSpace: "nowrap",
            }}
          >
            view portfolio →
          </Link>
          <Link
            href="/learn/rag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.28)",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: "6px",
              whiteSpace: "nowrap",
            }}
          >
            RAG pipeline visualizer
          </Link>
        </motion.div>
      </div>

      {/* Mobile bottom bar — shown only at ≤768px */}
      <div className="hero-mobile-bar" style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        display: "none",
        background: "rgba(0,0,0,0.93)",
        padding: "14px 16px",
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/portfolio" style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 12px",
            background: "#FFFFFF",
            color: "#111111",
            textDecoration: "none",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            borderRadius: "6px",
            letterSpacing: "-0.01em",
          }}>
            view portfolio
          </Link>
          <Link href="/learn/rag" style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 12px",
            background: "transparent",
            color: "#FFFFFF",
            border: "1px solid rgba(255,255,255,0.28)",
            textDecoration: "none",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            borderRadius: "6px",
            letterSpacing: "-0.01em",
          }}>
            RAG visualizer
          </Link>
        </div>
      </div>
    </section>
  );
}
