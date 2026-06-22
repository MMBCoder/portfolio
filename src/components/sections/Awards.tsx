"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/portfolioData";

export default function Awards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="awards" ref={ref} style={{ background: "#111111", borderTop: "1px solid #222222" }}>
      <div className="px-10 md:px-16 lg:px-24 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2
            className="font-heading font-black lowercase leading-none mb-4"
            style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", letterSpacing: "-0.04em", color: "#FFFFFF" }}
          >
            awards.
          </h2>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.4)" }}>
            Recognized for measurable AI transformation impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="p-10"
              style={{ background: "#111111" }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{ach.icon}</span>
                <div>
                  <span className="text-xs font-mono" style={{ color: ach.color }}>{ach.year}</span>
                  <h3 className="font-heading font-bold text-xl text-white mt-1 mb-1" style={{ letterSpacing: "-0.02em" }}>
                    {ach.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: ach.color }}>{ach.organization}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{ach.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-px p-10 text-center"
          style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="font-heading font-black text-3xl text-white" style={{ letterSpacing: "-0.03em" }}>
            Three-Time Synchrony CEO Award Winner
          </p>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            The company&apos;s highest honor, awarded consecutively for enterprise AI transformation leadership.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
