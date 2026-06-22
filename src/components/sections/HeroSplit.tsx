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
      style={{
        height: "calc(100dvh - 68px)",
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

      {/* Subtle gradient overlay to make text legible */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.35) 100%)",
        zIndex: 1,
      }} />

      {/* Left half — Portfolio */}
      <Link
        href="/portfolio"
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
          padding: "clamp(28px, 5vw, 72px)",
          background: hovered === "left" ? "rgba(0,0,0,0.22)" : "transparent",
          transition: "background 0.35s",
          textDecoration: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 1.1vw, 12px)",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}>
            click to explore
          </p>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 5.5rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "14px",
          }}>
            portfolio.
          </h2>
          <p style={{
            fontSize: "clamp(12px, 1.3vw, 15px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "260px",
            lineHeight: 1.6,
          }}>
            AI projects, case studies &amp; publications
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
        background: "rgba(255,255,255,0.18)",
        zIndex: 3,
      }} />

      {/* Right half — About */}
      <Link
        href="/about"
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
          padding: "clamp(28px, 5vw, 72px)",
          background: hovered === "right" ? "rgba(0,0,0,0.22)" : "transparent",
          transition: "background 0.35s",
          textDecoration: "none",
          textAlign: "right",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
        >
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 1.1vw, 12px)",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}>
            click to explore
          </p>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 5.5rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "14px",
          }}>
            about.
          </h2>
          <p style={{
            fontSize: "clamp(12px, 1.3vw, 15px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "260px",
            lineHeight: 1.6,
          }}>
            AI consultant &amp; data scientist profile
          </p>
        </motion.div>
      </Link>

      {/* Mobile: bottom CTA bar (shown only on small screens) */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        display: "none",
      }} className="hero-mobile-bar">
        <Link href="/portfolio" style={{
          display: "block",
          width: "50%",
          float: "left",
          padding: "18px 16px",
          background: "rgba(0,0,0,0.75)",
          color: "#FFFFFF",
          textAlign: "center",
          textDecoration: "none",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          borderRight: "1px solid rgba(255,255,255,0.15)",
        }}>
          portfolio →
        </Link>
        <Link href="/about" style={{
          display: "block",
          width: "50%",
          float: "right",
          padding: "18px 16px",
          background: "rgba(0,0,0,0.75)",
          color: "#FFFFFF",
          textAlign: "center",
          textDecoration: "none",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "15px",
        }}>
          about →
        </Link>
      </div>
    </section>
  );
}
