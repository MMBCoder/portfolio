"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolioData";

const categories = [...new Set(skills.map((s) => s.category))];

const catColors: Record<string, string> = {
  "AI Platforms": "#00E5FF",
  "Generative AI": "#7C3AED",
  "Engineering": "#22C55E",
  "Cloud": "#F59E0B",
  "Data Science": "#EC4899",
  "Analytics": "#F97316",
  "Leadership": "#A855F7",
};

export default function ExpertiseUniverse() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const filteredSkills = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills;

  return (
    <section id="expertise" className="py-36 px-6" style={{ background: "#060918" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-[0.35em] font-bold mb-5 block" style={{ color: "#00E5FF" }}>
            Capabilities
          </span>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Expertise{" "}
            <span style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Universe
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            A comprehensive command of the AI and data engineering landscape — from theory to production.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-5 py-2.5 rounded-full text-base font-bold transition-all duration-300"
            style={{
              background: !activeCategory ? "linear-gradient(135deg, #00E5FF, #7C3AED)" : "rgba(255,255,255,0.06)",
              color: !activeCategory ? "#050816" : "#94A3B8",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            All Skills
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat ? `${catColors[cat] || "#00E5FF"}30` : "rgba(255,255,255,0.04)",
                color: activeCategory === cat ? (catColors[cat] || "#00E5FF") : "#94A3B8",
                border: `1px solid ${activeCategory === cat ? (catColors[cat] || "#00E5FF") + "50" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, i) => (
            <SkillBar key={skill.id} skill={skill} index={i} />
          ))}
        </div>

        {/* Skill constellation visual */}
        <SkillOrbs />
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="p-4 rounded-xl border group hover:scale-[1.02] transition-transform duration-200"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: `${skill.color}20`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-white">{skill.name}</span>
        <span className="text-sm font-semibold" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.04, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
          />
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: `${skill.color}15`, color: skill.color }}>
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

function SkillOrbs() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ height: 600 }} />;

  const orbs = skills.slice(0, 12).map((s, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 160 + (i % 3) * 50;
    return {
      ...s,
      cx: 300 + Math.cos(angle) * radius,
      cy: 300 + Math.sin(angle) * radius,
    };
  });

  return (
    <div ref={containerRef} className="mt-20 relative overflow-hidden" style={{ height: 600 }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 600, height: 600 }}>
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full animate-pulse"
              style={{ background: "radial-gradient(circle, #00E5FF40, transparent)", boxShadow: "0 0 60px #00E5FF40" }} />
          </div>

          {orbs.map((orb, i) => (
            <motion.div
              key={orb.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="absolute flex items-center justify-center rounded-full cursor-pointer group"
              style={{
                width: 72 + orb.level * 0.3,
                height: 72 + orb.level * 0.3,
                left: orb.cx - 36,
                top: orb.cy - 36,
                background: `${orb.color}15`,
                border: `1.5px solid ${orb.color}40`,
                boxShadow: `0 0 15px ${orb.color}25`,
              }}
              whileHover={{ scale: 1.15 }}
            >
              <span className="text-xs font-semibold text-center px-1" style={{ color: orb.color }}>
                {orb.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
