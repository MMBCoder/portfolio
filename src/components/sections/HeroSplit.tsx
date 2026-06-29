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
      {/* Background photo */}
      <Image
        src="/images/mirza_home.png"
        alt="Mirza Minhaz Baig — AI Transformation Leader"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center top" }}
        priority
      />

      {/* Dark overlay — darkens edges for text legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 38%, rgba(0,0,0,0.18) 62%, rgba(0,0,0,0.58) 100%)",
        zIndex: 1,
      }} />

      {/* LEFT half — About → /about */}
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
          background: hovered === "left" ? "rgba(0,0,0,0.22)" : "transparent",
          transition: "background 0.3s ease",
          textDecoration: "none",
        }}
      >
        <motion.div
          className="hero-overlay-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 0.85vw, 11px)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            about me →
          </p>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.2vw, 3.8rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "12px",
          }}>
            ai<br />transformation.
          </h2>
          <p className="hero-label-text" style={{
            fontSize: "clamp(11px, 1vw, 14px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "220px",
            lineHeight: 1.6,
          }}>
            12+ years building enterprise AI in financial services
          </p>
        </motion.div>
      </Link>

      {/* Vertical divider */}
      <div
        className="hero-divider"
        style={{
          position: "absolute",
          left: "50%",
          top: "8%",
          bottom: "8%",
          width: "1px",
          background: "rgba(255,255,255,0.15)",
          zIndex: 3,
        }}
      />

      {/* RIGHT half — CDP Demo → /learn */}
      <Link
        href="/learn"
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
          background: hovered === "right" ? "rgba(0,0,0,0.22)" : "transparent",
          transition: "background 0.3s ease",
          textDecoration: "none",
          textAlign: "right",
        }}
      >
        <motion.div
          className="hero-overlay-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
        >
          <p className="hero-label-text" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "clamp(9px, 0.85vw, 11px)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            watch the demo →
          </p>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.6rem, 3.2vw, 3.8rem)",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textTransform: "lowercase",
            lineHeight: 0.95,
            marginBottom: "12px",
          }}>
            customer<br />data platform.
          </h2>
          <p className="hero-label-text" style={{
            fontSize: "clamp(11px, 1vw, 14px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "220px",
            lineHeight: 1.6,
          }}>
            11-scene interactive enterprise demo — narrated
          </p>
        </motion.div>
      </Link>

      {/* Mobile bottom bar — shown only at ≤768px */}
      <div className="hero-mobile-bar" style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        display: "none",
        background: "rgba(0,0,0,0.9)",
      }}>
        {/* Two nav buttons */}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <Link href="/about" style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 14px",
            color: "#FFFFFF",
            textDecoration: "none",
            textAlign: "center",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            gap: "3px",
          }}>
            <span style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "-0.02em",
            }}>
              about me
            </span>
            <span style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "8px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              ai transformation
            </span>
          </Link>
          <Link href="/learn" style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 14px",
            color: "#FFFFFF",
            textDecoration: "none",
            textAlign: "center",
            gap: "3px",
          }}>
            <span style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "-0.02em",
            }}>
              watch demo
            </span>
            <span style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "8px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              CDP interactive
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
