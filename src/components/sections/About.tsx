"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// #0A74DF on white = 4.59:1 contrast (WCAG AA ✓). Hover = 10% darker.
const CTA_BG = "#0A74DF";
const CTA_HOVER = "#0968C8";
const CTA_FOCUS_RING = "#60A5FA";
const CTA_SHADOW = "0 3px 10px rgba(10,116,223,0.4)";
const CTA_SHADOW_HOVER = "0 3px 14px rgba(10,116,223,0.6)";

function trackCtaClick(location: string) {
  if (typeof window === "undefined") return;
  // GA4
  (window as any).gtag?.("event", "cta_click", { event_category: "about_page", event_label: location });
  // Segment
  (window as any).analytics?.track("CTA Clicked", { category: "about_page", location });
}

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

// Evidence-based expertise cards — replace arbitrary skill bars
const expertiseCards = [
  {
    domain: "Agentic AI & LLM Engineering",
    tools: ["LangChain", "LangGraph", "RAG", "GPT-4"],
    evidence: "RAG Campaign Copilot — 96% time saved, $2M+ annual savings",
    accent: "#2563EB",
  },
  {
    domain: "Machine Learning & Data Science",
    tools: ["Python", "PySpark", "Scikit-learn", "XGBoost"],
    evidence: "Propensity & churn models for 70M+ customer profiles",
    accent: "#7C3AED",
  },
  {
    domain: "Customer Data Platforms",
    tools: ["BlueConic", "Identity Resolution", "Real-time Activation"],
    evidence: "Synchrony CDP architecture serving 70M+ customers",
    accent: "#0891B2",
  },
  {
    domain: "AI Strategy & Governance",
    tools: ["Human-in-the-Loop", "AI Ethics", "Enterprise Policy"],
    evidence: "3× CEO Award winning AI governance programs",
    accent: "#059669",
  },
  {
    domain: "Data Engineering & Platforms",
    tools: ["AWS", "Databricks", "Snowflake", "Airflow"],
    evidence: "End-to-end pipelines enabling 200+ business stakeholders",
    accent: "#D97706",
  },
  {
    domain: "Conversational Analytics",
    tools: ["NLP", "Power BI", "Azure OpenAI", "Semantic Kernel"],
    evidence: "Ask Insight — 48h query turnaround reduced to 2 minutes",
    accent: "#DB2777",
  },
];

const quickFacts = [
  "Three-time Synchrony CEO Award winner (2021, 2023, 2025)",
  "LEAP leadership programme — high-potential leader designation",
  "First-author published in Springer (2016 & 2021)",
  "IIT Delhi M.Tech · LJMU MS in AI & ML",
  "12+ years in financial services AI",
  "Led 20+ engineers, scientists & analysts",
  "Built AI systems used by 200+ stakeholders daily",
  "Based in Hyderabad, India",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const ctaRowRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={ref} style={{ background: "#FFFFFF" }}>

      {/* ─── Row 1: Text LEFT + Photo RIGHT ─── */}
      <div
        style={{
          borderBottom: "1px solid #E5E5E5",
          display: "flex",
          flexWrap: "wrap",
          minHeight: "clamp(420px, 72vh, 820px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
          style={{
            padding: "clamp(36px, 5vw, 80px) clamp(20px, 5vw, 96px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            className="heading-xl"
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

          <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "#333333", maxWidth: "440px", lineHeight: 1.65, marginBottom: "16px" }}>
            I&apos;m an AI Transformation Leader and Data Scientist based in Hyderabad, India — with 12+ years turning complex enterprise problems into intelligent AI solutions.
          </p>

          <p style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "#555555", maxWidth: "440px", lineHeight: 1.7, marginBottom: "16px" }}>
            I started as an analytics practitioner at Genpact, grew into an analytics manager at Citibank, and now lead enterprise AI transformation at Synchrony Financial — architecting systems that serve 70M+ customers daily.
          </p>

          <p style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "#555555", maxWidth: "440px", lineHeight: 1.7 }}>
            When I&apos;m not building RAG pipelines or agentic workflows, you&apos;ll find me mentoring teams, publishing research, or reading about the next frontier in AI.
          </p>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full md:w-1/2"
          style={{
            position: "relative",
            minHeight: "clamp(280px, 60vw, 500px)",
          }}
        >
          <Image
            src="/images/mirza_about.png"
            alt="Mirza Minhaz Baig — AI Transformation Leader & Data Scientist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "contain", objectPosition: "bottom center" }}
            priority
          />
        </motion.div>
      </div>

      {/* ─── Row 2: Part AI Leader + Part Data Scientist ─── */}
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
            part ai transformation leader.
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {consultantList.map((s) => (
              <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <span style={{ marginTop: "8px", width: "5px", height: "5px", borderRadius: "50%", background: "#111111", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "#444444", lineHeight: 1.6 }}>{s}</span>
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
                <span style={{ fontSize: "14px", color: "#444444", lineHeight: 1.6 }}>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ─── Row 3: Expertise Cards (replaces skill percentage bars) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-8 md:px-16 lg:px-24 py-12"
        style={{ borderBottom: "1px solid #E5E5E5", background: "#F9F9F9" }}
      >
        <h3
          className="font-heading font-black lowercase mb-3 leading-tight"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
        >
          areas of expertise.
        </h3>
        <p style={{ fontSize: "14px", color: "#555555", marginBottom: "32px", maxWidth: "520px", lineHeight: 1.65 }}>
          Each capability grounded in real delivery — measured outcomes, not self-assessed percentages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "12px" }}>
          {expertiseCards.map((card, i) => (
            <motion.div
              key={card.domain}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.06 }}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: "10px",
                padding: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "3px",
                background: card.accent,
              }} />
              <h4 style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "10px",
              }}>
                {card.domain}
              </h4>
              {/* Tool chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
                {card.tools.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "10px",
                    padding: "3px 8px",
                    background: `${card.accent}10`,
                    color: card.accent,
                    borderRadius: "3px",
                    border: `1px solid ${card.accent}25`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              {/* Evidence */}
              <p style={{
                fontSize: "12px",
                color: "#555555",
                lineHeight: 1.55,
                fontStyle: "italic",
              }}>
                {card.evidence}
              </p>
            </motion.div>
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
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "0 64px", maxWidth: "800px" }}>
          {quickFacts.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px", paddingBottom: "12px", marginBottom: "4px" }}>
              <span style={{ marginTop: "7px", width: "5px", height: "5px", borderRadius: "50%", background: "#CCCCCC", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", color: "#444444", lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── CTA row ─── */}
      <motion.div
        ref={ctaRowRef}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="px-8 md:px-16 lg:px-24 py-12"
        style={{ background: "#111111", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}
      >
        <div>
          <p style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}>
            Let&apos;s build something intelligent.
          </p>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "380px", lineHeight: 1.6 }}>
            Open to AI consulting, speaking engagements, and executive advisory.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            aria-label="Schedule a 15-minute call"
            data-analytics-event="cta_click"
            data-analytics-category="about_page"
            data-analytics-label="cta_row"
            onClick={() => trackCtaClick("cta_row")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "44px",
              minWidth: "120px",
              padding: "14px 20px",
              background: CTA_BG,
              color: "#FFFFFF",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(16px, 1.4vw, 18px)",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: "8px",
              whiteSpace: "nowrap",
              boxShadow: CTA_SHADOW,
              transition: "background 0.18s, box-shadow 0.18s",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = CTA_HOVER;
              el.style.boxShadow = CTA_SHADOW_HOVER;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = CTA_BG;
              el.style.boxShadow = CTA_SHADOW;
            }}
            onFocus={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.outline = `3px solid ${CTA_FOCUS_RING}`;
              el.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.outline = "none";
            }}
          >
            Schedule a 15-min call
          </Link>
          <Link
            href="/experience"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "44px",
              minWidth: "120px",
              padding: "14px 20px",
              background: "transparent",
              color: "#FFFFFF",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(14px, 1.2vw, 16px)",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.25)",
              whiteSpace: "nowrap",
              transition: "border-color 0.18s",
              outline: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.55)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
            onFocus={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.outline = "3px solid rgba(255,255,255,0.5)";
              el.style.outlineOffset = "2px";
            }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.outline = "none"; }}
          >
            view experience
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
