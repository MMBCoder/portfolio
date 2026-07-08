"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { aiProjects, testimonials, personalInfo } from "@/data/portfolioData";
import Publications from "@/components/sections/Publications";
import Footer from "@/components/layout/Footer";

const fd = "var(--font-space-grotesk), sans-serif";
const fm = "var(--font-jetbrains-mono), monospace";

/* Flagship = RAG Campaign Copilot; the rest form the index */
const flagship = aiProjects[0];
const index = aiProjects.slice(1);

/* Leadership capability pillars — each derived strictly from shipped projects */
const PILLARS = [
  {
    n: "01",
    title: "ai strategy & governance",
    body: "Designed the enterprise AI governance framework adopted as the standard for responsible AI deployment — human-in-the-loop controls, bias monitoring, and compliance review gates.",
    proof: "10+ AI use cases governed · 0 risk incidents · 100% compliance",
  },
  {
    n: "02",
    title: "applied ai that ships",
    body: "From RAG copilots that cut campaign build time from days to minutes, to conversational analytics used by hundreds of stakeholders — production AI, not proofs of concept.",
    proof: "96% time saved · 200+ stakeholders enabled · 3× delivery velocity",
  },
  {
    n: "03",
    title: "data foundations at scale",
    body: "Identity resolution and customer data platforms processing tens of millions of records — the trusted data layer every AI initiative depends on.",
    proof: "50M+ records processed · +35% match accuracy · 60% fewer duplicates",
  },
];

/* Real testimonial excerpts (verbatim fragments from LinkedIn recommendations) */
const QUOTES = [
  {
    quote: "A proven leader in the Database Marketing and Campaign Operations space… Mirza has my full support and recommendation… and would be a huge asset to any organization.",
    name: "Kristopher Fairchild",
    role: "SVP, Database Marketing · Citi Bank, US",
  },
  {
    quote: "Mirza stands out for his willingness to think outside the box to deliver results for our clients… he saved myself and the larger team from tedious monthly work by automating a monthly data transfer that I had always understood could not be automated.",
    name: "Andrew Crown",
    role: "Small Business Product Manager · American Express",
  },
  {
    quote: "He has an exceptional analytical skill and is always responsive… He works well with multiple functions and is a subject matter expert of all things campaign analytics people turn to for knowledge and advice.",
    name: "Rae Liu",
    role: "VP, Analytics · Synchrony Financial",
  },
];

/* ── Expandable project row ─────────────────────────────────────────────── */
function ProjectRow({ project, num }: { project: typeof aiProjects[0]; num: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8E8E8" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="proj-row"
        style={{
          width: "100%", display: "flex", alignItems: "baseline", gap: "clamp(14px,2.5vw,32px)",
          padding: "clamp(22px,3vw,34px) clamp(20px,4vw,80px)",
          background: open ? "#F9F9F9" : "transparent",
          border: "none", cursor: "pointer", textAlign: "left",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "#FAFAFA"; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        <span style={{ fontFamily: fm, fontSize: 12, color: "#BBBBBB", flexShrink: 0, width: 28 }}>{num}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <span style={{ fontFamily: fd, fontWeight: 700, fontSize: "clamp(17px,1.9vw,24px)", letterSpacing: "-0.03em", color: "#111111", textTransform: "lowercase" }}>
              {project.title}
            </span>
            <span style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: project.color, fontWeight: 700 }}>
              {project.category}
            </span>
          </div>
          <p style={{ fontSize: 14, color: "#777777", lineHeight: 1.6, marginTop: 6, maxWidth: 640 }}>{project.impact}</p>
        </div>
        <span aria-hidden style={{
          fontFamily: fm, fontSize: 18, color: "#999999", flexShrink: 0,
          transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden", background: "#F9F9F9" }}
          >
            <div className="proj-detail" style={{
              padding: "0 clamp(20px,4vw,80px) clamp(28px,3.5vw,44px)",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px,3vw,48px)",
            }}>
              <div>
                {[["the problem", project.problem], ["the solution", project.solution]].map(([label, text]) => (
                  <div key={label} style={{ marginBottom: 20 }}>
                    <p style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999999", marginBottom: 6, fontWeight: 700 }}>{label}</p>
                    <p style={{ fontSize: 14, color: "#444444", lineHeight: 1.7 }}>{text}</p>
                  </div>
                ))}
                <p style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999999", marginBottom: 6, fontWeight: 700 }}>architecture</p>
                <p style={{ fontFamily: fm, fontSize: 12, color: "#666666", lineHeight: 1.8 }}>{project.architecture}</p>
              </div>
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                  {project.metrics.map(m => (
                    <div key={m.label} style={{ padding: "14px 16px", background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: 10 }}>
                      <div style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: "-0.04em", color: "#111111", lineHeight: 1 }}>{m.value}</div>
                      <div style={{ fontSize: 11, color: "#999999", marginTop: 5 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.technologies.map(t => (
                    <span key={t} style={{ padding: "4px 10px", background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: 5, fontSize: 11, color: "#555555", fontFamily: fm }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Animated counter ───────────────────────────────────────────────────── */
function Counter({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const t0 = performance.now();
      const raf = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

export default function PortfolioPage() {
  return (
    <>
      {/* ═══ HERO — editorial split ═══ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8", borderBottom: "1px solid #E8E8E8" }}>
        <div className="pf-hero" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", minHeight: 380 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ padding: "clamp(40px,5vw,80px)", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid #E8E8E8" }}
            className="pf-hero-left"
          >
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2563EB", fontWeight: 700, marginBottom: 22 }}>
              Executive Portfolio · Enterprise AI
            </p>
            <h1 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(3rem,6.5vw,6.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "#111111", textTransform: "lowercase", marginBottom: 26 }}>
              ai that earns<br />its keep.
            </h1>
            <p style={{ fontSize: "clamp(15px,1.4vw,18px)", color: "#555555", maxWidth: 460, lineHeight: 1.7, marginBottom: 12 }}>
              Six production AI systems, built and shipped inside a regulated bank — each one tied to a number a CFO would recognise.
            </p>
            <p style={{ fontSize: 14, color: "#999999", maxWidth: 430, lineHeight: 1.7 }}>
              Not prototypes. Not pilots. Systems that business teams use every day — governed, compliant, and measured.
            </p>
          </motion.div>

          {/* Right: live impact board */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}
            style={{ padding: "clamp(40px,5vw,80px)", display: "flex", flexDirection: "column", justifyContent: "center", background: "#F9F9F9" }}
          >
            <p style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999999", marginBottom: 28, fontWeight: 700 }}>
              cumulative impact
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,40px)" }}>
              {[
                { value: 50, prefix: "$", suffix: "M+", label: "revenue influenced through AI-driven optimization" },
                { value: 200, suffix: "+", label: "business stakeholders using these systems daily" },
                { value: 96, suffix: "%", label: "time saved on campaign delivery (days → minutes)" },
                { value: 6, suffix: "", label: "production AI systems in regulated banking" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(2rem,3.6vw,3.4rem)", letterSpacing: "-0.04em", color: "#111111", lineHeight: 1, marginBottom: 8 }}>
                    <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                  </div>
                  <div style={{ fontSize: 12.5, color: "#999999", lineHeight: 1.5, maxWidth: 180 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <style>{`@media(max-width:860px){.pf-hero{grid-template-columns:1fr !important;}.pf-hero-left{border-right:none !important;border-bottom:1px solid #E8E8E8;}}`}</style>
      </section>

      {/* ═══ FLAGSHIP CASE STUDY — dark spotlight ═══ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(64px,8vw,120px) clamp(20px,4vw,80px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#60A5FA", fontWeight: 700, marginBottom: 18 }}>
              Flagship Build · {flagship.category}
            </p>
            <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(2rem,4.5vw,4rem)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1, textTransform: "lowercase", marginBottom: 18, maxWidth: 700 }}>
              {flagship.title.toLowerCase()}
            </h2>
            <p style={{ fontSize: "clamp(14px,1.3vw,17px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 620, marginBottom: 48 }}>
              {flagship.solution}
            </p>
          </motion.div>

          {/* Problem → Impact strip */}
          <div className="pf-flag" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,48px)", marginBottom: 48 }}>
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }}
              style={{ padding: "clamp(24px,3vw,36px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, background: "rgba(255,255,255,0.03)" }}>
              <p style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12, fontWeight: 700 }}>before</p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>{flagship.problem}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }} viewport={{ once: true }}
              style={{ padding: "clamp(24px,3vw,36px)", border: "1px solid rgba(37,99,235,0.35)", borderRadius: 16, background: "rgba(37,99,235,0.08)" }}>
              <p style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#60A5FA", marginBottom: 12, fontWeight: 700 }}>after</p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.75 }}>{flagship.impact}</p>
            </motion.div>
          </div>

          {/* Metric band */}
          <div className="pf-flag-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden", marginBottom: 36 }}>
            {flagship.metrics.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                style={{ background: "#0F0F0F", padding: "clamp(20px,2.6vw,32px)", textAlign: "center" }}>
                <div style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.7rem,3vw,2.7rem)", letterSpacing: "-0.04em", color: "#60A5FA", lineHeight: 1, marginBottom: 8 }}>{m.value}</div>
                <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{m.label}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {flagship.technologies.map(t => (
              <span key={t} style={{ padding: "5px 12px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 6, fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: fm }}>{t}</span>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:760px){.pf-flag{grid-template-columns:1fr !important;}.pf-flag-metrics{grid-template-columns:repeat(2,1fr) !important;}}`}</style>
      </section>

      {/* ═══ PROJECT INDEX — expandable rows ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div style={{ padding: "clamp(48px,6vw,80px) clamp(20px,4vw,80px) clamp(20px,2.5vw,36px)", borderBottom: "1px solid #E8E8E8" }}>
          <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2563EB", fontWeight: 700, marginBottom: 14 }}>
            The Full Build Sheet
          </p>
          <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", color: "#111111", textTransform: "lowercase", lineHeight: 1 }}>
            five more systems, same standard.
          </h2>
          <p style={{ fontSize: 14, color: "#999999", marginTop: 14, maxWidth: 480, lineHeight: 1.7 }}>
            Open any row for the problem, the architecture, and the numbers.
          </p>
        </div>
        {index.map((p, i) => (
          <ProjectRow key={p.id} project={p} num={String(i + 2).padStart(2, "0")} />
        ))}
      </section>

      {/* ═══ WHAT THIS MEANS FOR YOUR ORGANIZATION ═══ */}
      <section style={{ background: "#F1F2F4", padding: "clamp(64px,8vw,110px) clamp(20px,4vw,80px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: 52 }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2563EB", fontWeight: 700, marginBottom: 14 }}>
              For Leaders &amp; Organizations
            </p>
            <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", color: "#111111", textTransform: "lowercase", lineHeight: 1.02, maxWidth: 640 }}>
              what this track record<br />means for you.
            </h2>
          </motion.div>

          <div className="pf-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {PILLARS.map((p, i) => (
              <motion.div key={p.n}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: i * 0.12 }} viewport={{ once: true }}
                style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: 16, padding: "clamp(26px,2.8vw,36px)", display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: fm, fontSize: 11, color: "#BBBBBB", marginBottom: 18 }}>{p.n}</span>
                <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: "clamp(17px,1.7vw,21px)", letterSpacing: "-0.03em", color: "#111111", textTransform: "lowercase", marginBottom: 12, lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: "#666666", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{p.body}</p>
                <p style={{ fontFamily: fm, fontSize: 10.5, color: "#2563EB", letterSpacing: "0.04em", lineHeight: 1.7, borderTop: "1px solid #F0F0F0", paddingTop: 14 }}>{p.proof}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:860px){.pf-pillars{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ═══ VOICES — real recommendations ═══ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8" }}>
        <div className="pf-quotes" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {QUOTES.map((q, i) => (
            <motion.figure key={q.name}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: i * 0.1 }} viewport={{ once: true }}
              style={{
                padding: "clamp(32px,4vw,56px) clamp(24px,3vw,44px)",
                borderRight: i < QUOTES.length - 1 ? "1px solid #E8E8E8" : "none",
                display: "flex", flexDirection: "column", margin: 0,
              }}
              className="pf-quote"
            >
              <span aria-hidden style={{ fontFamily: fd, fontSize: 44, color: "#2563EB", lineHeight: 0.6, marginBottom: 22 }}>&ldquo;</span>
              <blockquote style={{ fontSize: 14.5, color: "#444444", lineHeight: 1.75, flex: 1, margin: 0, marginBottom: 24 }}>
                {q.quote}
              </blockquote>
              <figcaption>
                <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 14, color: "#111111", letterSpacing: "-0.01em" }}>{q.name}</div>
                <div style={{ fontFamily: fm, fontSize: 10.5, color: "#999999", marginTop: 4, letterSpacing: "0.04em" }}>{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <style>{`@media(max-width:860px){.pf-quotes{grid-template-columns:1fr !important;}.pf-quote{border-right:none !important;border-bottom:1px solid #E8E8E8;}}`}</style>
      </section>

      {/* ═══ ENGAGEMENT CTA ═══ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(72px,9vw,130px) clamp(20px,4vw,80px)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#60A5FA", fontWeight: 700, marginBottom: 20 }}>
            Open to Advisory · Speaking · Leadership Roles
          </p>
          <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(2rem,5vw,4.2rem)", letterSpacing: "-0.04em", color: "#FFFFFF", textTransform: "lowercase", lineHeight: 0.98, marginBottom: 22 }}>
            let&apos;s talk about<br />your ai roadmap.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.7 }}>
            If your organization is serious about AI that ships, complies, and pays for itself — I&apos;d welcome the conversation.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", padding: "14px 32px",
              background: "#FFFFFF", color: "#111111",
              fontFamily: fd, fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
              textDecoration: "none", borderRadius: 8, whiteSpace: "nowrap",
            }}>
              start a conversation →
            </Link>
            <a href={`mailto:${personalInfo.email}`} style={{
              display: "inline-flex", alignItems: "center", padding: "14px 32px",
              background: "transparent", color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.25)",
              fontFamily: fd, fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em",
              textDecoration: "none", borderRadius: 8, whiteSpace: "nowrap",
            }}>
              {personalInfo.email}
            </a>
          </div>
        </motion.div>
      </section>

      <Publications />
      <Footer />
    </>
  );
}
