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
        background: "#FFFFFF",
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT HALF — AI Consultant ── */}
      <Link
        href="/about"
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingLeft: "clamp(32px, 5vw, 80px)",
          paddingRight: "32px",
          textDecoration: "none",
          transition: "background 0.3s",
          background: hovered === "left" ? "#F5F5F5" : "#FFFFFF",
          zIndex: 2,
        }}
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
              letterSpacing: "-0.04em",
              color: "#111111",
              lineHeight: 1.0,
              textTransform: "lowercase",
              marginBottom: "20px",
            }}
          >
            ai<br />consultant.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: "16px",
              color: "#888888",
              maxWidth: "280px",
              lineHeight: 1.6,
            }}
          >
            AI strategy, Agentic AI systems, LLM orchestration &amp; enterprise transformation.
          </motion.p>
        </div>
      </Link>

      {/* ── CENTER — Photo ── */}
      <div
        style={{
          position: "relative",
          width: "clamp(280px, 36vw, 520px)",
          flexShrink: 0,
          zIndex: 3,
        }}
      >
        <Image
          src="/images/profile.png"
          alt="Mirza Minhaz Baig"
          fill
          sizes="36vw"
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
          priority
        />
      </div>

      {/* ── RIGHT HALF — Data Scientist ── */}
      <Link
        href="/portfolio"
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "clamp(32px, 5vw, 80px)",
          paddingLeft: "32px",
          textDecoration: "none",
          transition: "background 0.3s",
          background: hovered === "right" ? "#F5F5F5" : "#FFFFFF",
          zIndex: 2,
          textAlign: "right",
        }}
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
              letterSpacing: "-0.04em",
              color: "#111111",
              lineHeight: 1.0,
              textTransform: "lowercase",
              marginBottom: "20px",
            }}
          >
            data<br />scientist.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: "16px",
              color: "#888888",
              maxWidth: "280px",
              lineHeight: 1.6,
              marginLeft: "auto",
            }}
          >
            Machine learning, data engineering, CDP platforms &amp; analytics at enterprise scale.
          </motion.p>
        </div>
      </Link>

      {/* Thin vertical center line */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "10%",
        bottom: "10%",
        width: "1px",
        background: "#E5E5E5",
        zIndex: 1,
      }} />
    </section>
  );
}
