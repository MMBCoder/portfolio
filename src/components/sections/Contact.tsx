"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";

// To wire up the contact form:
// 1. Sign up free at https://formspree.io
// 2. Create a form and copy the form ID (e.g. "xpzgvykj")
// 3. Add NEXT_PUBLIC_FORMSPREE_ID=your_form_id to .env.local
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

// Phone intentionally excluded — removed for privacy on a public portfolio
const socials = [
  { label: "LinkedIn", href: personalInfo.linkedin },
  { label: "GitHub", href: personalInfo.github },
  { label: "Email", href: `mailto:${personalInfo.email}` },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (FORMSPREE_ID) {
      setStatus("sending");
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("success");
          form.reset();
        } else {
          const json = await res.json();
          setErrorMsg(json?.errors?.[0]?.message ?? "Something went wrong. Please try emailing directly.");
          setStatus("error");
        }
      } catch {
        setErrorMsg("Network error. Please email directly.");
        setStatus("error");
      }
    } else {
      // Fallback: open mailto with pre-filled subject and body
      const name = data.get("name") as string;
      const email = data.get("email") as string;
      const message = data.get("message") as string;
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, "_blank");
      setStatus("success");
    }
  }

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
              className="heading-xl font-heading font-black lowercase leading-none mb-6"
              style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)", letterSpacing: "-0.04em", color: "#111111" }}
            >
              contact.
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "#555555", maxWidth: "380px" }}>
              Open to AI consulting, speaking engagements, and executive advisory. Reach out via any channel below or use the form.
            </p>

            {/* Social links — large clickable rows */}
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
                  <span style={{ color: "#AAAAAA", fontSize: "1.2rem", transition: "color 0.2s" }} className="group-hover:text-black">→</span>
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
              transition: "padding-left 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "8px"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
          >
            <div>
              <span
                className="font-heading font-black text-3xl lowercase"
                style={{ letterSpacing: "-0.03em", color: "#111111" }}
              >
                Resume
              </span>
              <p style={{ fontSize: "12px", color: "#888888", marginTop: "4px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
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
              <span style={{ color: "#AAAAAA", fontSize: "1.2rem" }}>→</span>
            </div>
          </a>

          <div className="mt-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
            <span className="text-sm" style={{ color: "#555555" }}>
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
            className="font-heading font-bold lowercase text-2xl mb-2"
            style={{ letterSpacing: "-0.03em", color: "#111111" }}
          >
            send a message.
          </h3>
          <p style={{ fontSize: "13px", color: "#888888", marginBottom: "28px", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
            {FORMSPREE_ID ? "Direct delivery to my inbox." : "Opens your email client pre-filled."}
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: "40px 32px",
                textAlign: "center",
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: "10px",
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 900,
                fontSize: "20px",
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}>
                Message sent.
              </h4>
              <p style={{ fontSize: "14px", color: "#555555", lineHeight: 1.6 }}>
                I&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "none",
                  border: "1px solid #E5E5E5",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "#555555",
                  cursor: "pointer",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                { name: "subject", label: "Subject", type: "text", placeholder: "Consulting / Speaking / Advisory / Other" },
                { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your AI goals..." },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`contact-${field.name}`}
                    className="text-[10px] font-mono uppercase tracking-widest mb-1.5 block"
                    style={{ color: "#888888" }}
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={`contact-${field.name}`}
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={5}
                      required
                      className="w-full px-4 py-3 text-sm outline-none resize-none border"
                      style={{ background: "#FFFFFF", borderColor: "#E5E5E5", color: "#111111", borderRadius: "4px" }}
                      onFocus={(e) => { e.target.style.borderColor = "#111111"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E5E5"; }}
                    />
                  ) : (
                    <input
                      id={`contact-${field.name}`}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 text-sm outline-none border"
                      style={{ background: "#FFFFFF", borderColor: "#E5E5E5", color: "#111111", borderRadius: "4px" }}
                      onFocus={(e) => { e.target.style.borderColor = "#111111"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E5E5"; }}
                    />
                  )}
                </div>
              ))}

              {status === "error" && (
                <p style={{
                  fontSize: "13px",
                  color: "#DC2626",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  padding: "10px 14px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "4px",
                }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 text-sm font-bold tracking-wide transition-opacity"
                style={{
                  background: "#111111",
                  color: "#FFFFFF",
                  borderRadius: "6px",
                  opacity: status === "sending" ? 0.6 : 1,
                  cursor: status === "sending" ? "wait" : "pointer",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {status === "sending" ? "sending…" : "send message →"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
