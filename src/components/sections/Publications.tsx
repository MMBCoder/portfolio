"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/portfolioData";

export default function Publications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const springer = publications[0];
  const rest = publications.slice(1);

  return (
    <section id="publications" ref={ref} style={{ background: "#FFFFFF", borderTop: "1px solid #E5E5E5" }}>
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
            publications.
          </h2>
          <p className="text-base" style={{ color: "#888888", maxWidth: "480px" }}>
            Peer-reviewed research and industry insights on AI, data engineering, and enterprise analytics.
          </p>
        </motion.div>

        {/* Springer highlight — Adham featured-section style */}
        <motion.a
          href={springer.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-6 items-start p-8 mb-4 group"
          style={{
            background: "#F9F9F9",
            border: "1px solid #E5E5E5",
            borderLeft: "4px solid #111111",
            textDecoration: "none",
            display: "flex",
          }}
        >
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-yellow-500 text-yellow-600">FIRST AUTHOR</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-yellow-500 text-yellow-600">PEER-REVIEWED · SPRINGER · {springer.year}</span>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#111111", letterSpacing: "-0.02em" }}>
              {springer.title}
            </h3>
            <p className="text-sm mb-3 font-medium text-yellow-600">{springer.publisher}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>{springer.description}</p>
          </div>
          <ExternalLink size={16} className="flex-shrink-0 mt-1 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: "#111111" }} />
        </motion.a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              className="p-6 border"
              style={{ background: "#F9F9F9", borderColor: "#E5E5E5" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono" style={{ color: "#AAAAAA" }}>{pub.year}</span>
                <span style={{ color: "#DDDDDD" }}>·</span>
                <span className="text-xs font-mono" style={{ color: "#666666" }}>{pub.publisher}</span>
              </div>
              <h3 className="font-heading font-bold text-base mb-2" style={{ color: "#111111" }}>{pub.title}</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#777777" }}>{pub.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 border" style={{ borderColor: "#E5E5E5", color: "#AAAAAA" }}>
                    {tag}
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
