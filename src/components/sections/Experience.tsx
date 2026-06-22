"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/portfolioData";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState<string | null>(experiences[0].id);

  return (
    <section id="experience" ref={ref} style={{ background: "#F9F9F9", borderTop: "1px solid #E5E5E5" }}>
      <div className="px-10 md:px-16 lg:px-24 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2
            className="font-heading font-black lowercase leading-none mb-4"
            style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", letterSpacing: "-0.04em", color: "#111111" }}
          >
            experience.
          </h2>
          <p className="text-base" style={{ color: "#888888" }}>
            12 years across Synchrony Financial, Citigroup, and Genpact.
          </p>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="border-b"
              style={{ borderColor: "#E5E5E5" }}
            >
              <button
                onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                className="w-full flex items-center gap-5 py-7 text-left hover:bg-white transition-colors"
              >
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center font-mono font-black text-xs"
                  style={{ background: exp.color + "14", color: exp.color, border: `1px solid ${exp.color}30` }}
                >
                  {exp.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-heading font-bold text-lg" style={{ color: "#111111" }}>{exp.role}</span>
                    <span className="text-sm" style={{ color: exp.color }}>{exp.company}</span>
                  </div>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "#AAAAAA" }}>
                    {exp.duration} · {exp.location}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expanded === exp.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                  style={{ color: "#CCCCCC" }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expanded === exp.id && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8" style={{ paddingLeft: "68px" }}>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "#666666" }}>{exp.description}</p>
                      <ul className="space-y-2 mb-5">
                        {exp.responsibilities.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-2.5 text-sm" style={{ color: "#666666" }}>
                            <span className="mt-1.5 w-1 h-1 flex-shrink-0 rounded-full" style={{ background: exp.color }} />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span key={t} className="text-[11px] font-mono px-2.5 py-1 border" style={{ borderColor: "#E5E5E5", color: "#999999" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
