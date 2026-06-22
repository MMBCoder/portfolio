"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);

  const socials = [
    { label: "LinkedIn", href: personalInfo.linkedin },
    { label: "GitHub", href: personalInfo.github },
    { label: "Email", href: `mailto:${personalInfo.email}` },
  ];

  return (
    <section id="contact" ref={ref} style={{ background: "#FFFFFF", borderTop: "1px solid #E5E5E5" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — info + social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="px-10 md:px-16 lg:px-24 py-16 border-r flex flex-col justify-between"
          style={{ borderColor: "#E5E5E5", minHeight: "60vh" }}
        >
          <div>
            <h2
              className="font-heading font-black lowercase leading-none mb-6"
              style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", letterSpacing: "-0.04em", color: "#111111" }}
            >
              contact.
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "#888888", maxWidth: "380px" }}>
              Get in touch via social media or send me an email. Open to AI consulting, speaking engagements, and executive advisory.
            </p>

            {/* Social links — Adham-style large clickable rows */}
            <div>
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-5 border-b group"
                  style={{ borderColor: "#E5E5E5", textDecoration: "none" }}
                >
                  <span
                    className="font-heading font-black text-3xl lowercase group-hover:translate-x-2 transition-transform inline-block"
                    style={{ letterSpacing: "-0.03em", color: "#111111" }}
                  >
                    {label}
                  </span>
                  <span style={{ color: "#CCCCCC", fontSize: "1.2rem" }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Download Resume */}
          <a
            href="/resume?print=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "32px",
              padding: "18px 0",
              borderTop: "1px solid #E5E5E5",
              borderBottom: "1px solid #E5E5E5",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "8px"; (e.currentTarget as HTMLElement).style.transition = "padding 0.2s"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
          >
            <div>
              <span
                className="font-heading font-black text-3xl lowercase"
                style={{ letterSpacing: "-0.03em", color: "#111111" }}
              >
                Resume
              </span>
              <p style={{ fontSize: "12px", color: "#AAAAAA", marginTop: "4px", fontFamily: "var(--font-jetbrains-mono), sans-serif" }}>
                Opens resume → click &ldquo;Save as PDF&rdquo; to download
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                padding: "4px 10px",
                border: "1px solid #111111",
                color: "#111111",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                PDF
              </span>
              <span style={{ color: "#CCCCCC", fontSize: "1.2rem" }}>→</span>
            </div>
          </a>

          <div className="mt-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
            <span className="text-sm" style={{ color: "#888888" }}>
              Available for engagements · {personalInfo.location}
            </span>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="px-10 md:px-16 lg:px-24 py-16 flex flex-col justify-center"
          style={{ background: "#F9F9F9" }}
        >
          <h3
            className="font-heading font-bold lowercase text-2xl mb-8"
            style={{ letterSpacing: "-0.03em", color: "#111111" }}
          >
            send me an email.
          </h3>

          {!submitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-5"
            >
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your Name" },
                { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your AI goals..." },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    className="text-[10px] font-mono uppercase tracking-widest mb-1.5 block"
                    style={{ color: "#AAAAAA" }}
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={5}
                      required
                      className="w-full px-4 py-3 text-sm outline-none resize-none border"
                      style={{ background: "#FFFFFF", borderColor: "#E5E5E5", color: "#111111" }}
                      onFocus={(e) => { e.target.style.borderColor = "#111111"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E5E5"; }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 text-sm outline-none border"
                      style={{ background: "#FFFFFF", borderColor: "#E5E5E5", color: "#111111" }}
                      onFocus={(e) => { e.target.style.borderColor = "#111111"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E5E5"; }}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-3.5 text-sm font-bold tracking-wide hover:opacity-80 transition-opacity"
                style={{ background: "#111111", color: "#FFFFFF" }}
              >
                Send message
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h4 className="font-heading font-bold text-xl mb-2" style={{ color: "#111111" }}>Message sent!</h4>
              <p className="text-sm" style={{ color: "#888888" }}>I&apos;ll get back to you within 24 hours.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
