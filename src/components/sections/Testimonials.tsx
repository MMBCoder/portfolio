"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/portfolioData";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[current];

  return (
    <section ref={ref} style={{ background: "#F9F9F9", borderTop: "1px solid #E5E5E5" }}>
      <div style={{ padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 96px)" }}>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 5vw, 5rem)",
              letterSpacing: "-0.04em",
              color: "#111111",
              textTransform: "lowercase",
              lineHeight: 1,
            }}
          >
            what they say.
          </h2>
          <a
            href="https://www.linkedin.com/in/mirza-minhaz-baig-aiml/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "11px",
              color: "#0A66C2",
              textDecoration: "none",
              border: "1px solid #0A66C2",
              padding: "6px 14px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#EBF4FF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Verify on LinkedIn
          </a>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ borderLeft: "3px solid #111111", paddingLeft: "clamp(16px, 3vw, 32px)" }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                  color: "#222222",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.content}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#111111",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 900,
                    fontSize: "13px",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "16px", color: "#111111" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "13px", color: "#AAAAAA" }}>
                    {t.role} · {t.company}
                  </div>
                </div>
                {t.linkedinUrl && (
                  <a
                    href={t.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "auto", color: "#0A66C2", fontSize: "11px", fontFamily: "var(--font-jetbrains-mono), monospace", textDecoration: "none", opacity: 0.7, flexShrink: 0 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                  >
                    verified ↗
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "36px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  height: "7px",
                  width: i === current ? 24 : 7,
                  borderRadius: "4px",
                  background: i === current ? "#111111" : "#DDDDDD",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
