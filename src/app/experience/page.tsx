"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

type TimelineEntry = {
  id: string;
  period: string;
  role: string;
  org: string;
  type: "work" | "education";
  logo: string | null;
  logoExt?: "png" | "jpg";
  color: string;
  location: string;
  description: string;
  highlights: string[];
  technologies?: string[];
};

const timeline: TimelineEntry[] = [
  {
    id: "syf",
    period: "2019 – Present",
    role: "AVP – Customer Data Platform & AI Transformation",
    org: "Synchrony Financial",
    type: "work",
    logo: "/images/icons/Synchrony Financial.png",
    color: "#005B8E",
    location: "Hyderabad, India",
    description: "Leading AI/ML and Agentic AI transformation across Synchrony's enterprise data platform, enabling data-driven decisioning for 70M+ customers. Implemented Bluecore CDP within Synchrony for real-time email marketing and customer activation.",
    highlights: [
      "Architected and delivered Agentic AI systems using LangGraph, LangChain & RAG pipelines adopted by 200+ business leaders",
      "Built enterprise CDP platform integrating 50+ data sources with 96% process automation on key workflows",
      "Implemented Bluecore CDP for real-time email marketing — enabling dynamic segmentation and triggered campaigns across 10M+ customer profiles",
      "Launched 'Ask My Data' conversational analytics tool using GPT-4 + PowerBI reducing reporting time by 80%",
      "Three-time CEO Award winner — Synchrony's highest recognition",
      "Led a cross-functional team of 20+ engineers, data scientists, and analysts",
    ],
    technologies: ["LangChain", "LangGraph", "GPT-4", "Python", "PySpark", "Azure", "Power BI", "Databricks", "Snowflake", "Bluecore CDP"],
  },
  {
    id: "ljmu",
    period: "2019 – 2021",
    role: "M.S. – Machine Learning & Artificial Intelligence",
    org: "Liverpool John Moores University",
    type: "education",
    logo: "/images/icons/LJMU.jpg",
    color: "#C41230",
    location: "Liverpool, UK (Part-Time)",
    description: "Postgraduate degree specialising in machine learning, deep learning, NLP, and data science research.",
    highlights: [
      "Published first-author research in Springer on AI-driven data analytics",
      "Thesis: Application of NLP and deep learning for financial text classification",
      "Graduated with Distinction",
    ],
  },
  {
    id: "citi",
    period: "2018 – 2019",
    role: "Analytics Manager – Cards & Consumer Banking",
    org: "Citigroup",
    type: "work",
    logo: "/images/icons/Citi Bank.png",
    color: "#003B6F",
    location: "Bengaluru, India",
    description: "Managed analytics strategy and data science delivery for Citi's cards and consumer banking products across APAC markets.",
    highlights: [
      "Led a team of 8 data scientists and analysts delivering credit risk and acquisition models",
      "Improved credit bureau score model AUC by 12% through advanced feature engineering",
      "Built automated reporting dashboards reducing manual effort by 60%",
    ],
    technologies: ["Python", "SAS", "SQL", "Tableau", "R"],
  },
  {
    id: "genpact",
    period: "2014 – 2018",
    role: "Assistant Manager – Analytics & Automation",
    org: "Genpact",
    type: "work",
    logo: "/images/icons/Genpact.png",
    color: "#E31837",
    location: "Bengaluru, India",
    description: "Built analytics and automation solutions for global BFSI clients, specializing in risk modelling, process intelligence, and predictive analytics.",
    highlights: [
      "Delivered predictive models for US mortgage risk that reduced default rates by 8%",
      "Automated month-end close reporting workflows saving 2,000+ hours annually",
      "Promoted twice in 4 years based on consistent high-impact delivery",
    ],
    technologies: ["Python", "SAS", "SQL", "Excel VBA", "Tableau", "Machine Learning"],
  },
  {
    id: "iitd",
    period: "2012 – 2014",
    role: "M.Tech – Engineering and Technology",
    org: "Indian Institute of Technology Delhi",
    type: "education",
    logo: "/images/icons/IIT Delhi.png",
    color: "#003087",
    location: "New Delhi, India",
    description: "Postgraduate engineering program at India's premier technology institute, focusing on technology management and analytics.",
    highlights: [
      "Research focus on data-driven decision systems and operations research",
      "Graduated from one of India's top-ranked engineering institutions",
    ],
  },
  {
    id: "amu",
    period: "2008 – 2012",
    role: "B.Tech – Engineering and Technology",
    org: "Aligarh Muslim University",
    type: "education",
    logo: "/images/icons/AMU.png",
    color: "#006400",
    location: "Aligarh, India",
    description: "Bachelor's degree in Electronics Engineering laying the quantitative foundation for a career in data science and AI.",
    highlights: [
      "Strong foundation in mathematics, signal processing, and programming",
      "Final year project on embedded systems and automation",
    ],
  },
];

function LogoOrInitial({ entry }: { entry: TimelineEntry }) {
  const [imgError, setImgError] = useState(false);

  if (entry.logo && !imgError) {
    return (
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "12px",
        background: "#FFFFFF",
        border: "1px solid #E5E5E5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}>
        <Image
          src={entry.logo}
          alt={entry.org}
          fill
          sizes="56px"
          style={{ objectFit: "contain", padding: "6px" }}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  const initials = entry.org.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div style={{
      width: "56px",
      height: "56px",
      borderRadius: "12px",
      background: entry.color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontFamily: "var(--font-space-grotesk), sans-serif",
      fontWeight: 900,
      fontSize: "16px",
      letterSpacing: "-0.02em",
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function TimelineCard({ entry, i }: { entry: TimelineEntry; i: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          padding: "28px 0",
          borderBottom: "1px solid #E8E8E8",
          transition: "background 0.2s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; (e.currentTarget as HTMLElement).style.marginLeft = "-24px"; (e.currentTarget as HTMLElement).style.paddingLeft = "24px"; (e.currentTarget as HTMLElement).style.marginRight = "-24px"; (e.currentTarget as HTMLElement).style.paddingRight = "24px"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.marginLeft = ""; (e.currentTarget as HTMLElement).style.paddingLeft = ""; (e.currentTarget as HTMLElement).style.marginRight = ""; (e.currentTarget as HTMLElement).style.paddingRight = ""; }}
        >
          {/* Logo */}
          <LogoOrInitial entry={entry} />

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "11px",
                color: entry.color,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {entry.period}
              </span>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                padding: "2px 8px",
                border: `1px solid ${entry.type === "work" ? "#E5E5E5" : entry.color + "44"}`,
                color: entry.type === "work" ? "#999999" : entry.color,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                {entry.type === "work" ? "work" : "education"}
              </span>
            </div>
            <div style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#111111",
              letterSpacing: "-0.02em",
              marginBottom: "4px",
            }}>
              {entry.role}
            </div>
            <div style={{ fontSize: "14px", color: "#888888" }}>
              {entry.org} · {entry.location}
            </div>
          </div>

          {/* Expand indicator */}
          <div style={{
            color: "#CCCCCC",
            fontSize: "20px",
            flexShrink: 0,
            alignSelf: "center",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
          }}>
            ↓
          </div>
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="timeline-expanded"
          style={{
            padding: "28px 0 28px 76px",
            borderBottom: "1px solid #E8E8E8",
            background: "#FAFAFA",
          }}
        >
          <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.7, marginBottom: "16px", maxWidth: "600px" }}>
            {entry.description}
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0" }}>
            {entry.highlights.map((h) => (
              <li key={h} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "8px" }}>
                <span style={{ color: entry.color, fontWeight: 900, fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>›</span>
                <span style={{ fontSize: "13px", color: "#555555", lineHeight: 1.6 }}>{h}</span>
              </li>
            ))}
          </ul>

          {entry.technologies && entry.technologies.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {entry.technologies.map((t) => (
                <span key={t} style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  padding: "3px 10px",
                  border: "1px solid #E5E5E5",
                  color: "#777777",
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ExperiencePage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const workCount = timeline.filter((e) => e.type === "work").length; // 4 after Bluecore merge
  const eduCount = timeline.filter((e) => e.type === "education").length;
  const totalYears = 12;

  return (
    <>
      <section style={{ background: "#FFFFFF" }}>

        {/* Header section */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-2 responsive-2col"
          style={{
            borderBottom: "1px solid #E8E8E8",
            minHeight: "280px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              padding: "clamp(40px, 5vw, 72px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRight: "1px solid #E8E8E8",
            }}
          >
            <h1
              className="heading-xl"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 7vw, 7rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#111111",
                textTransform: "lowercase",
                marginBottom: "24px",
              }}
            >
              experience.
            </h1>
            <p style={{ fontSize: "16px", color: "#888888", maxWidth: "360px", lineHeight: 1.7 }}>
              12+ years of AI, data science, and engineering leadership across global financial services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              padding: "clamp(40px, 5vw, 72px)",
              display: "flex",
              alignItems: "center",
              background: "#F9F9F9",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", width: "100%" }}>
              {[
                { value: `${totalYears}+`, label: "years experience" },
                { value: `${workCount}`, label: "roles held" },
                { value: `${eduCount}`, label: "degrees earned" },
                { value: "3×", label: "CEO Award winner" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    letterSpacing: "-0.04em",
                    color: "#111111",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "#999999" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline list */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 4vw, 60px) 80px" }}>
          {timeline.map((entry, i) => (
            <TimelineCard key={entry.id} entry={entry} i={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
