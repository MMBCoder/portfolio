"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { technologies } from "@/data/portfolioData";

const categoryOrder = ["AI Framework", "AI Platform", "AI Architecture", "Language", "Cloud", "Data Engineering", "Analytics", "AI Dev Tools", "DevOps", "Data Warehouse", "Delivery"];

export default function TechnologyEcosystem() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const grouped = categoryOrder.reduce((acc, cat) => {
    const items = technologies.filter((t) => t.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, typeof technologies>);

  return (
    <section id="tech" className="py-36 px-6" style={{ background: "#060918" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.35em] font-bold mb-5 block" style={{ color: "#00E5FF" }}>
            Stack
          </span>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Technology{" "}
            <span style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Ecosystem
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            A curated command of the AI and data engineering landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-20">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex flex-col items-center p-4 rounded-2xl border group cursor-pointer transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: `${tech.color}18`,
              }}
              whileHover={{ scale: 1.1, borderColor: `${tech.color}60`, boxShadow: `0 0 20px ${tech.color}20` }}
            >
              <span className="text-3xl mb-2">{tech.icon}</span>
              <span className="text-xs font-semibold text-center leading-tight" style={{ color: "#CBD5E1" }}>{tech.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-5">
          {Object.entries(grouped).map(([cat, items], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
              className="flex flex-wrap items-center gap-4"
            >
              <span className="text-sm font-bold uppercase tracking-widest w-32 flex-shrink-0 text-right"
                style={{ color: "#64748B" }}>{cat}</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <span key={t.id} className="flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-full font-medium"
                    style={{ background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}22` }}>
                    {t.icon} {t.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
