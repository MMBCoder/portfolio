"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/portfolioData";

export default function Achievements() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="achievements" className="py-36 px-6" style={{ background: "#060918" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.35em] font-bold mb-5 block" style={{ color: "#00E5FF" }}>
            Recognition
          </span>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Awards &{" "}
            <span style={{ background: "linear-gradient(135deg, #F59E0B, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Achievements
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Recognized by leaders for delivering measurable AI transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, i) => <AchievementCard key={ach.id} achievement={ach} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative p-8 rounded-2xl border overflow-hidden group"
      style={{ background: "rgba(255,255,255,0.04)", borderColor: `${achievement.color}25` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 20% 20%, ${achievement.color}10, transparent 60%)` }} />
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-3xl opacity-15"
        style={{ background: achievement.color }} />

      <div className="relative z-10 flex items-start gap-6">
        <div className="text-5xl w-20 h-20 flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{ background: `${achievement.color}14`, border: `1px solid ${achievement.color}30` }}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-bold px-3 py-1 rounded-full"
              style={{ background: `${achievement.color}18`, color: achievement.color }}>
              {achievement.year}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1.5">{achievement.title}</h3>
          <p className="text-base font-semibold mb-3" style={{ color: achievement.color }}>{achievement.organization}</p>
          <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
