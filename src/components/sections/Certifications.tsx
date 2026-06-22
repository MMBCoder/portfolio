"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/data/portfolioData";

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" className="py-28 md:py-36 px-6" style={{ background: "var(--muted)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label mb-4 block">Credentials</span>
          <h2
            className="font-heading font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--foreground)", letterSpacing: "-0.03em", maxWidth: "600px" }}
          >
            Certifications &{" "}
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl border group"
              style={{ background: "var(--background)", borderColor: "var(--border)" }}
              whileHover={{ y: -3, borderColor: `${cert.color}50` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}
                >
                  {cert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-base leading-tight mb-1" style={{ color: "var(--foreground)" }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: cert.color }}>{cert.issuer}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: `${cert.color}10`, color: cert.color }}
                    >
                      {cert.year}
                    </span>
                    {cert.credentialId && (
                      <span className="text-[10px] font-mono truncate" style={{ color: "var(--fg-muted)" }}>
                        #{cert.credentialId.slice(0, 12)}…
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
