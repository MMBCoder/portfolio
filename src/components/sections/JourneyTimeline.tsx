"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Trophy } from "lucide-react";
import { timeline } from "@/data/portfolioData";

const icons = {
  education: GraduationCap,
  work: Briefcase,
  achievement: Trophy,
};

const typeColors = {
  education: "#7C3AED",
  work: "#00E5FF",
  achievement: "#F59E0B",
};

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const Icon = icons[item.type];
  const color = typeColors[item.type];

  return (
    <div ref={ref} className="relative flex items-center mb-16">
      {/* Left content */}
      <div className="flex-1 flex justify-end pr-12">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-md w-full"
          >
            <CardContent item={item} color={color} />
          </motion.div>
        )}
      </div>

      {/* Center node */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full z-10 flex-shrink-0"
        style={{
          background: `${color}18`,
          border: `2px solid ${color}`,
          boxShadow: `0 0 24px ${color}50, 0 0 48px ${color}20`,
        }}
      >
        <Icon size={22} style={{ color }} />
      </motion.div>

      {/* Right content */}
      <div className="flex-1 pl-12">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-md w-full"
          >
            <CardContent item={item} color={color} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CardContent({ item, color }: { item: typeof timeline[0]; color: string }) {
  return (
    <div
      className="p-7 rounded-2xl border relative overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: `${color}30`,
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 70%)` }} />

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-sm font-bold px-3 py-1 rounded-full"
          style={{ background: `${color}20`, color }}>
          {item.year}
        </span>
        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "#64748B" }}>
          {item.type}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1.5 leading-tight">{item.title}</h3>
      <p className="text-base font-semibold mb-4" style={{ color }}>{item.organization}</p>
      <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>{item.description}</p>
      {item.technologies && (
        <div className="flex flex-wrap gap-2 mt-5">
          {item.technologies.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8" }}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JourneyTimeline() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="journey" className="py-36 px-6" style={{ background: "#060918" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.35em] font-bold mb-5 block" style={{ color: "#00E5FF" }}>
            The Journey
          </span>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            From Data Scientist to{" "}
            <span style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI Leader
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            A 12-year journey through elite institutions and global enterprises.
          </p>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, #00E5FF50, #7C3AED50, #00E5FF50, transparent)" }} />
          {timeline.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
