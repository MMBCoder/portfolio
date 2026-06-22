"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp } from "lucide-react";
import { kpiMetrics } from "@/data/portfolioData";

function KPICard({ metric, index }: { metric: typeof kpiMetrics[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative p-7 rounded-2xl border group overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: `${metric.color}20`,
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 30% 30%, ${metric.color}10, transparent 60%)` }} />
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl"
        style={{ background: metric.color, opacity: 0.08 }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${metric.color}18` }}>
            <TrendingUp size={20} style={{ color: metric.color }} />
          </div>
          {metric.trend && (
            <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "#22C55E18", color: "#22C55E" }}>
              ↑ {metric.trend}%
            </div>
          )}
        </div>
        <div className="mb-2">
          <span className="font-black" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: metric.color }}>
            {inView && (
              <CountUp start={0} end={metric.value} duration={2.5} delay={index * 0.1}
                prefix={metric.prefix || ""} suffix={metric.suffix} />
            )}
          </span>
        </div>
        <h3 className="font-bold text-white text-xl mb-1.5">{metric.label}</h3>
        <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>{metric.description}</p>
        <div className="mt-5 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${Math.min(metric.value, 100)}%` } : {}}
            transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${metric.color}, ${metric.color}60)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactDashboard() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="impact" className="py-36 px-6" style={{ background: "#0B1230" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.35em] font-bold mb-5 block" style={{ color: "#00E5FF" }}>
            Measurable Outcomes
          </span>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Impact at{" "}
            <span style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Enterprise Scale
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Quantified outcomes across AI transformation, analytics, and automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiMetrics.map((m, i) => <KPICard key={m.id} metric={m} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 p-10 rounded-2xl border text-center"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,255,0.07), rgba(124,58,237,0.07))",
            borderColor: "rgba(0,229,255,0.18)",
          }}
        >
          <div className="text-5xl mb-3">🏆</div>
          <p className="text-3xl font-black text-white mb-2">Three-Time CEO Award Recipient</p>
          <p className="text-lg" style={{ color: "#94A3B8" }}>
            Synchrony Financial&apos;s highest honor — awarded for pioneering enterprise AI transformation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
