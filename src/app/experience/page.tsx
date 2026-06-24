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
    role: "AVP – Data Scientist & Data Engineer, Customer Data Platform",
    org: "Synchrony Financial",
    type: "work",
    logo: "/images/icons/Synchrony Financial.png",
    color: "#005B8E",
    location: "Hyderabad, India",
    description: "Strategic contributor to Synchrony's enterprise customer data ecosystem as part of the Customer Data Platform (CDP) team. Own end-to-end data integration architecture connecting BlueConic CDP with Synchrony's core digital platforms — enabling unified 360° customer profiles, real-time marketing activation, and personalised engagement across 70M+ customers.",
    highlights: [
      "Lead data integration architecture between BlueConic CDP and key Synchrony digital platforms — Marketplace, Vista, DApply, and Amplero — delivering a unified 360° view across all customer touchpoints",
      "Design and implement online and offline data ingestion pipelines, including secure SFTP feeds for profile enrichment, unifying behavioral, transactional, demographic, and engagement signals at enterprise scale",
      "Own customer identity resolution processes that link interactions across Synchrony's multi-product ecosystem, providing a single authoritative customer view for 70M+ account holders",
      "Enable real-time marketing activation through integrations with AI Workbench (AIWB) and Connections platforms — powering trigger-based campaigns for abandoned applications, product browsing, category search, and customer retention",
      "Drive audience segmentation and personalised marketing strategies via CDP capabilities, elevating targeting precision and campaign effectiveness across Synchrony's marketing technology stack",
      "Three-time CEO Award winner (2020–2022) and LEAP High-Potential Leadership Program participant — recognised for sustained enterprise impact",
    ],
    technologies: ["BlueConic CDP", "Python", "PySpark", "SQL", "SFTP Pipelines", "Customer Identity Resolution", "AWS", "Databricks", "Real-Time Segmentation", "Marketing Automation", "Power BI"],
  },
  {
    id: "ljmu",
    period: "2019 – 2021",
    role: "M.S. – Machine Learning & Artificial Intelligence",
    org: "Liverpool John Moores University",
    type: "education",
    logo: "/images/icons/LJMU.jpg",
    color: "#C41230",
    location: "Liverpool, UK",
    description: "Developed expertise in Machine Learning, Artificial Intelligence, Predictive Analytics, Statistical Modeling, and Data-Driven Decision Making. Applied advanced analytical techniques to solve real-world business problems and build intelligent predictive solutions.",
    highlights: [
      "Capstone project: designed and developed an ML model to predict customer response and application propensity for credit card offers across telemarketing and email campaigns — enabling more effective customer targeting and marketing optimisation",
      "Published first-author research in Springer on AI-driven data analytics for enterprise systems",
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
    description: "Led data science and analytics initiatives supporting Citi Singapore's Retail Banking portfolio across Credit Cards, CASA, and Consumer Lending products. Delivered predictive analytics, executive dashboards, and automated reporting solutions that enabled strategic decision-making, drove revenue growth, and saved 1,000+ annual hours through process automation.",
    highlights: [
      "Led data science and analytics across Credit Cards, CASA, and Consumer Lending — delivering predictive models and executive dashboards that enabled strategic decision-making and revenue growth",
      "Saved 1,000+ annual hours through end-to-end process automation of portfolio reporting and analytics workflows",
      "Transformed complex customer and portfolio data into actionable business insights using Python, SQL, SAS, Tableau, Power BI, and AWS cloud-based data platforms",
    ],
    technologies: ["Python", "SQL", "SAS", "Tableau", "Power BI", "Machine Learning", "Statistical Modeling", "AWS"],
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
    description: "Delivered performance marketing analytics and customer intelligence solutions for leading US Retail Banking and Private Label Credit Card (PLCC) portfolios. Developed customer journey analytics, attribution models, campaign measurement frameworks, and executive dashboards that optimised customer acquisition, engagement, and marketing effectiveness while generating multi-million-dollar business value.",
    highlights: [
      "Delivered performance marketing analytics and customer intelligence for US Retail Banking and PLCC portfolios — built attribution models, campaign measurement frameworks, and customer journey analytics",
      "Generated multi-million-dollar business value through data-driven optimisation of customer acquisition and marketing effectiveness across financial services clients",
      "Built executive dashboards and A/B testing frameworks using Python, SQL, SAS, Google Analytics, and Power BI; promoted twice in 4 years",
    ],
    technologies: ["Python", "SQL", "SAS", "Google Analytics", "Power BI", "A/B Testing", "Marketing Analytics", "Predictive Modeling"],
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
      "Published 'Engineering droplet navigation through tertiary-junction microchannels' in Springer journal",
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
    description: "Bachelor's degree in Process Engineering laying the quantitative foundation for a career in Mathematics and Computing.",
    highlights: [
      "Strong foundation in mathematics, statistics, process designing, and programming",
      "Final year project on building a techno-economical process plant design for polyethylene production",
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
