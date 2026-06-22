"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolioData";

const categories = [
  { name: "All", filter: null },
  { name: "AI Platforms", filter: "AI Platforms" },
  { name: "Generative AI", filter: "Generative AI" },
  { name: "Engineering", filter: "Engineering" },
  { name: "Data Science", filter: "Data Science" },
  { name: "Leadership", filter: "Leadership" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter ? skills.filter(s => s.category === activeFilter) : skills;

  return (
    <section id="skills" className="py-28 md:py-36 px-6" style={{ background: "var(--muted)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-label mb-4 block">Skills</span>
          <h2 className="font-heading font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--foreground)", letterSpacing: "-0.03em", maxWidth: "500px" }}>
            Full-stack{" "}
            <span className="gradient-text">AI expertise</span>
          </h2>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveFilter(cat.filter)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeFilter === cat.filter ? "var(--foreground)" : "var(--background)",
                color: activeFilter === cat.filter ? "var(--background)" : "var(--fg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, inView }: { skill: typeof skills[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="p-5 rounded-xl border group"
      style={{
        background: "var(--background)",
        borderColor: hovered ? `${skill.color}40` : "var(--border)",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{skill.name}</span>
        <span className="text-xs font-mono font-bold" style={{ color: skill.color }}>{skill.level}%</span>
      </div>

      {/* Bar */}
      <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.04, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
        />
      </div>

      {/* Category tag */}
      <div className="mt-2.5">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: `${skill.color}10`, color: skill.color }}>
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}
