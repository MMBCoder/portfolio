"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { timeline } from "@/data/portfolioData";

export default function CareerJourney() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="journey" className="py-28 md:py-36 px-6 overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="section-label mb-4 block">Career Journey</span>
          <h2 className="font-heading font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--foreground)", letterSpacing: "-0.03em", maxWidth: "600px" }}>
            12 years. 3 companies.{" "}
            <span className="gradient-text">One mission.</span>
          </h2>
        </motion.div>

        {/* Horizontal scrolling timeline on desktop, vertical on mobile */}
        <div className="hidden md:block">
          <HorizontalTimeline items={timeline} inView={inView} active={active} setActive={setActive} />
        </div>
        <div className="md:hidden">
          <VerticalTimeline items={timeline} inView={inView} />
        </div>
      </div>
    </section>
  );
}

function HorizontalTimeline({ items, inView, active, setActive }: {
  items: typeof timeline;
  inView: boolean;
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  return (
    <div className="relative">
      {/* Timeline rail */}
      <div className="relative flex items-start gap-0 overflow-x-auto pb-8" style={{ scrollbarWidth: "none" }}>
        {items.map((item, i) => (
          <div key={item.id} className="flex items-start flex-shrink-0" style={{ minWidth: "200px" }}>
            <div className="flex flex-col items-center flex-1">
              {/* Node */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                onClick={() => setActive(active === item.id ? null : item.id)}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                  style={{
                    background: item.type === "work" ? "var(--foreground)" : "var(--background)",
                    borderColor: item.type === "work" ? "var(--foreground)" : "var(--border)",
                    color: item.type === "work" ? "var(--background)" : "var(--fg-secondary)",
                    boxShadow: active === item.id ? "0 0 0 4px rgba(37,99,235,0.2)" : "none",
                  }}>
                  {item.type === "work" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                </div>

                {/* Year */}
                <div className="mt-2 text-xs font-mono font-medium" style={{ color: "var(--fg-muted)" }}>
                  {item.year.split("–")[0]}
                </div>

                {/* Company */}
                <div className="mt-1 text-sm font-semibold text-center px-2 max-w-[160px]"
                  style={{ color: "var(--foreground)" }}>
                  {item.organization}
                </div>

                <div className="mt-0.5 text-xs text-center px-2 max-w-[150px]"
                  style={{ color: "var(--fg-muted)" }}>
                  {item.title.split(" – ")[0]}
                </div>
              </motion.button>

              {/* Connector */}
              {i < items.length - 1 && (
                <div className="absolute top-6 left-1/2" style={{ width: "200px", height: "1px", background: "var(--border)", zIndex: 0 }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded detail panel */}
      {active && (() => {
        const item = items.find(i => i.id === active);
        if (!item) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 p-8 rounded-2xl border"
            style={{ background: "var(--muted)", borderColor: "var(--border)" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>{item.year}</span>
                <h3 className="font-heading font-bold text-xl mt-1" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="font-medium" style={{ color: "var(--blue)" }}>{item.organization}</p>
              </div>
              <button onClick={() => setActive(null)} className="text-sm" style={{ color: "var(--fg-muted)" }}>✕</button>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--fg-secondary)" }}>{item.description}</p>
            {item.technologies && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full font-mono"
                    style={{ background: "var(--accent)", color: "var(--fg-secondary)", border: "1px solid var(--border)" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        );
      })()}
    </div>
  );
}

function VerticalTimeline({ items, inView }: { items: typeof timeline; inView: boolean }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="relative mb-10"
        >
          <div className="absolute -left-[26px] w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: item.type === "work" ? "var(--foreground)" : "var(--background)", border: "2px solid var(--border)" }}>
            {item.type === "work"
              ? <Briefcase size={10} style={{ color: "var(--background)" }} />
              : <GraduationCap size={10} style={{ color: "var(--fg-secondary)" }} />}
          </div>
          <div className="text-xs font-mono mb-1" style={{ color: "var(--fg-muted)" }}>{item.year}</div>
          <h3 className="font-semibold text-base mb-0.5" style={{ color: "var(--foreground)" }}>{item.title}</h3>
          <p className="text-sm font-medium mb-2" style={{ color: "var(--blue)" }}>{item.organization}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-secondary)" }}>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
