"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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

const skillBars = [
  { label: "Agentic AI & LLM Engineering", pct: 95 },
  { label: "Machine Learning & Data Science", pct: 88 },
  { label: "Data Engineering & Platforms", pct: 90 },
  { label: "AI Strategy & Consulting", pct: 92 },
  { label: "People Leadership & Mentoring", pct: 88 },
  { label: "Python, PySpark & SQL", pct: 95 },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" ref={ref} style={{ background: "#FFFFFF" }}>

      {/* ─── Row 1: Text LEFT + Photo RIGHT (exactly like Adham's about page) ─── */}
      <div className="relative flex flex-col md:flex-row" style={{ minHeight: "85vh", borderBottom: "1px solid #E5E5E5" }}>
        {/* LEFT: heading + text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20"
          style={{ flex: "0 0 50%", maxWidth: "50%" }}
        >
          {/* Huge "about." heading */}
          <h2
            className="font-heading font-black lowercase leading-none mb-8"
            style={{
              fontSize: "clamp(4rem, 9vw, 8rem)",
              letterSpacing: "-0.04em",
              color: "#111111",
            }}
          >
            about.
          </h2>

          <p
            className="text-xl leading-relaxed mb-6"
            style={{ color: "#555555", maxWidth: "420px" }}
          >
            I&apos;m an AI Consultant and Data Scientist based in Hyderabad, India.
          </p>

          <p
            className="text-base leading-relaxed"
            style={{ color: "#888888", maxWidth: "420px" }}
          >
            Since 2012, I&apos;ve enjoyed turning complex enterprise problems into intelligent AI solutions. When I&apos;m not building RAG pipelines or agentic workflows, you&apos;ll find me mentoring teams, exploring research, or reading about the next frontier in AI.
          </p>

          <div className="flex flex-wrap gap-2 mt-10">
            {["AI Consultant", "Data Scientist", "Data Engineer", "Researcher", "People Leader"].map((r) => (
              <span
                key={r}
                className="text-xs font-mono px-3 py-1"
                style={{ border: "1px solid #E5E5E5", color: "#888888" }}
              >
                {r}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Photo floats on white background — exactly like Adham */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
          style={{ flex: "0 0 50%", maxWidth: "50%", minHeight: "480px" }}
        >
          <Image
            src="/images/profile.png"
            alt="Mirza Minhaz Baig — AI Consultant & Data Scientist"
            fill
            sizes="50vw"
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      </div>

      {/* ─── Row 2: Part AI Consultant + Part Data Scientist ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: "1px solid #E5E5E5" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-10 md:px-16 lg:px-24 py-16"
          style={{ borderRight: "1px solid #E5E5E5" }}
        >
          <h3
            className="font-heading font-black lowercase mb-8 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
          >
            part ai consultant.
          </h3>
          <ul className="space-y-3">
            {consultantList.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "#666666" }}>
                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#111111" }} />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-10 md:px-16 lg:px-24 py-16"
        >
          <h3
            className="font-heading font-black lowercase mb-8 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
          >
            part data scientist.
          </h3>
          <ul className="space-y-3">
            {scientistList.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm" style={{ color: "#666666" }}>
                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#111111" }} />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ─── Row 3: My Skills (Adham-style skill bars) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-10 md:px-16 lg:px-24 py-16"
        style={{ borderBottom: "1px solid #E5E5E5", background: "#F9F9F9" }}
      >
        <h3
          className="font-heading font-black lowercase mb-12 leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
        >
          my skills.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 max-w-4xl">
          {skillBars.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm" style={{ color: "#444444" }}>{s.label}</span>
                <span className="text-xs font-mono" style={{ color: "#999999" }}>{s.pct}%</span>
              </div>
              <div className="h-[3px] rounded-full" style={{ background: "#E5E5E5" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.pct}%` } : {}}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "#111111" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── Row 4: Quick facts ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-10 md:px-16 lg:px-24 py-16"
        style={{ borderBottom: "1px solid #E5E5E5" }}
      >
        <h3
          className="font-heading font-black lowercase mb-10 leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em", color: "#111111" }}
        >
          quick facts.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-3 max-w-3xl">
          {[
            "Three-time Synchrony CEO Award winner",
            "LEAP leadership program — high-potential leader",
            "First-author published in Springer",
            "IIT Delhi M.Tech. graduate",
            "12+ years in financial services AI",
            "Led 20+ engineers, scientists & analysts",
            "Built AI systems used by 200+ stakeholders",
            "Based in Hyderabad, India",
          ].map((f) => (
            <div key={f} className="flex items-start gap-3 text-sm" style={{ color: "#666666" }}>
              <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#BBBBBB" }} />
              {f}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
