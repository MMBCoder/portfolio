"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Target, Lightbulb, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "People-First Leadership",
    description: "Led 5+ cross-functional teams spanning analytics, AI, and data engineering. Built psychological safety and high-trust team cultures that consistently outperformed.",
    stat: "20+",
    statLabel: "People Led",
    color: "#2563EB",
  },
  {
    icon: Target,
    title: "Strategic Execution",
    description: "Bridged C-suite AI strategy with engineering execution. Transformed ambiguous AI mandates into shipped products — from RAG copilots to enterprise NLP platforms.",
    stat: "10+",
    statLabel: "AI Products Shipped",
    color: "#7C3AED",
  },
  {
    icon: Lightbulb,
    title: "AI Transformation",
    description: "Selected for Synchrony's LEAP leadership development program. Recognized three times with the CEO Award for enterprise AI transformation impact.",
    stat: "3×",
    statLabel: "CEO Award",
    color: "#F59E0B",
  },
  {
    icon: TrendingUp,
    title: "Stakeholder Influence",
    description: "Enabled 200+ business leaders with self-service AI analytics. Translated complex model outputs into executive-ready narratives that drove $50M+ in revenue influence.",
    stat: "200+",
    statLabel: "Leaders Enabled",
    color: "#10B981",
  },
];

const timeline = [
  { year: "2014", role: "Individual Contributor → Team Lead", context: "Genpact" },
  { year: "2018", role: "Analytics Manager", context: "Citigroup" },
  { year: "2019", role: "AVP – AI Transformation", context: "Synchrony" },
  { year: "2024", role: "LEAP Leadership Program", context: "Synchrony" },
];

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="leadership" className="py-28 md:py-36 px-6" style={{ background: "var(--muted)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label mb-4 block">Leadership</span>
          <h2
            className="font-heading font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--foreground)", letterSpacing: "-0.03em", maxWidth: "600px" }}
          >
            Leading teams.{" "}
            <span className="gradient-text">Transforming organizations.</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: "var(--fg-secondary)" }}>
            12 years of growing from individual contributor to enterprise AI transformation leader — at Genpact, Citigroup, and Synchrony Financial.
          </p>
        </motion.div>

        {/* Leadership pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-7 rounded-2xl border group"
              style={{ background: "var(--background)", borderColor: "var(--border)" }}
              whileHover={{ y: -3, borderColor: `${p.color}40` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}12`, border: `1px solid ${p.color}20` }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-lg" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="font-heading font-black text-xl" style={{ color: p.color }}>{p.stat}</div>
                      <div className="text-[10px] font-mono" style={{ color: "var(--fg-muted)" }}>{p.statLabel}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-secondary)" }}>{p.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership progression bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="p-8 rounded-2xl border"
          style={{ background: "var(--background)", borderColor: "var(--border)" }}
        >
          <h3 className="font-heading font-bold text-lg mb-8" style={{ color: "var(--foreground)" }}>Leadership Progression</h3>
          <div className="relative">
            {/* Rail */}
            <div className="absolute top-5 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
            <div className="flex justify-between">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / timeline.length}%` }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-3 z-10"
                    style={{ background: "var(--blue)", color: "#ffffff" }}>
                    {t.year.slice(2)}
                  </div>
                  <div className="text-xs font-semibold text-center px-2 mb-1" style={{ color: "var(--foreground)" }}>{t.role}</div>
                  <div className="text-[10px] font-mono text-center" style={{ color: "var(--fg-muted)" }}>{t.context}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
