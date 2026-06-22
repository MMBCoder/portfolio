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
    const id = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section ref={ref} style={{ background: "#F9F9F9", borderTop: "1px solid #E5E5E5" }}>
      <div className="px-10 md:px-16 lg:px-24 py-16 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-black lowercase leading-none mb-14"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em", color: "#111111" }}
        >
          what they say.
        </motion.h2>

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
              className="border-l-[3px] pl-8"
              style={{ borderColor: "#111111" }}
            >
              <p
                className="text-xl md:text-2xl font-medium leading-relaxed mb-8"
                style={{ color: "#222222", letterSpacing: "-0.02em" }}
              >
                &ldquo;{testimonials[current].content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm flex-shrink-0"
                  style={{ background: "#111111", color: "#FFFFFF" }}
                >
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-heading font-bold text-base" style={{ color: "#111111" }}>
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm" style={{ color: "#AAAAAA" }}>
                    {testimonials[current].role} · {testimonials[current].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 22 : 7,
                  height: 7,
                  background: i === current ? "#111111" : "#DDDDDD",
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
