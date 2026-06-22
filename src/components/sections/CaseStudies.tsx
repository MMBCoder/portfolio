"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Target, Lightbulb, Cog, TrendingUp } from "lucide-react";
import { caseStudies } from "@/data/portfolioData";

const steps = [
  { key: "challenge", label: "Challenge", icon: Target },
  { key: "approach", label: "Approach", icon: Lightbulb },
  { key: "solution", label: "Solution", icon: Cog },
  { key: "outcome", label: "Outcome", icon: TrendingUp },
] as const;

export default function CaseStudies() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [active, setActive] = useState(0);

  return (
    <section id="cases" className="py-36 px-6" style={{ background: "#0B1230" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.35em] font-bold mb-5 block" style={{ color: "#00E5FF" }}>
            Work
          </span>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Case{" "}
            <span style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Studies
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Real enterprise challenges. Real AI solutions. Quantified business impact.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => setActive(i)}
              className="px-6 py-3 rounded-full text-base font-bold transition-all duration-300"
              style={{
                background: active === i ? `${cs.color}22` : "rgba(255,255,255,0.04)",
                color: active === i ? cs.color : "#94A3B8",
                border: `1px solid ${active === i ? cs.color + "50" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {cs.industry.split("–")[0].trim()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {caseStudies.map((cs, i) => i === active ? <CaseStudyDetail key={cs.id} cs={cs} /> : null)}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CaseStudyDetail({ cs }: { cs: typeof caseStudies[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-8 rounded-2xl border mb-6"
        style={{ background: `linear-gradient(135deg, ${cs.color}08, rgba(255,255,255,0.03))`, borderColor: `${cs.color}30` }}>
        <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 inline-block"
          style={{ background: `${cs.color}18`, color: cs.color }}>{cs.industry}</span>
        <h3 className="text-3xl font-black text-white">{cs.title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.key} className="p-7 rounded-2xl border"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${cs.color}18` }}>
                  <Icon size={17} style={{ color: cs.color }} />
                </div>
                <span className="font-bold text-white text-base">{step.label}</span>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>{cs[step.key]}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cs.metrics.map((m) => (
          <div key={m.label} className="p-6 rounded-xl border text-center"
            style={{ background: `${cs.color}07`, borderColor: `${cs.color}22` }}>
            <div className="text-4xl font-black mb-1.5" style={{ color: cs.color }}>{m.value}</div>
            <div className="text-sm font-medium" style={{ color: "#94A3B8" }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base font-semibold" style={{ color: "#94A3B8" }}>Technologies:</span>
        {cs.technologies.map((t) => (
          <span key={t} className="text-sm px-3 py-1.5 rounded-full font-medium"
            style={{ background: `${cs.color}14`, color: cs.color, border: `1px solid ${cs.color}25` }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
