"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { personalInfo, timeline, heroMetrics, skills, certifications } from "@/data/portfolioData";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";

const fd = "var(--font-space-grotesk), sans-serif";
const fm = "var(--font-jetbrains-mono), monospace";

/* ── Rotating role — 3D flip through real rotatingRoles ─────────────────── */
function RoleFlipper() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % personalInfo.rotatingRoles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "inline-block", perspective: 600, verticalAlign: "bottom", minWidth: "9ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", color: "#60A5FA", transformStyle: "preserve-3d", whiteSpace: "nowrap" }}
        >
          {personalInfo.rotatingRoles[i].toLowerCase()}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── 3D holographic identity card ───────────────────────────────────────── */
function IdentityCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 70, damping: 16 });
  const rotateX = useSpring(my, { stiffness: 70, damping: 16 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -16);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 1200, width: "min(380px, 86vw)", margin: "0 auto" }}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Card base */}
        <div style={{
          position: "relative",
          aspectRatio: "3/4",
          borderRadius: 22,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 12px 40px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
          background: "#111111",
        }}>
          <Image src="/images/mirza_profile.jpg" alt="Mirza Minhaz Baig" fill priority sizes="380px" style={{ objectFit: "cover", objectPosition: "center top" }} />
          {/* holo sheen */}
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(105deg, transparent 38%, rgba(96,165,250,0.14) 48%, rgba(255,255,255,0.10) 52%, transparent 62%)",
              backgroundSize: "200% 100%",
              mixBlendMode: "screen",
            }}
          />
          {/* bottom plate */}
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            padding: "40px 22px 20px",
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 65%, transparent 100%)",
          }}>
            <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: "#FFFFFF" }}>Mirza Minhaz Baig</div>
            <div style={{ fontFamily: fm, fontSize: 9.5, color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 5 }}>
              AVP · Customer Data Platform · {personalInfo.location}
            </div>
          </div>
        </div>

        {/* Floating depth chips (translateZ layers) */}
        {[
          { text: "3× CEO Award", top: "8%", left: "-9%", z: 70, dur: 5.4 },
          { text: "IIT Delhi", top: "34%", right: "-11%", z: 55, dur: 6.2 },
          { text: "Agentic AI", bottom: "26%", left: "-13%", z: 62, dur: 5.8 },
        ].map(chip => (
          <motion.div
            key={chip.text}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: chip.dur, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: chip.top, left: chip.left, right: chip.right, bottom: chip.bottom,
              z: chip.z,
              transform: `translateZ(${chip.z}px)`,
              padding: "8px 14px",
              background: "rgba(17,17,17,0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 30,
              fontFamily: fd,
              fontWeight: 600,
              fontSize: 12.5,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
              boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            }}
          >
            {chip.text}
          </motion.div>
        ))}
      </motion.div>

      {/* floor glow */}
      <div style={{ width: "70%", height: 22, margin: "30px auto 0", background: "radial-gradient(ellipse, rgba(37,99,235,0.3), transparent 70%)", filter: "blur(8px)" }} />
    </div>
  );
}

/* ── 3D milestone card ──────────────────────────────────────────────────── */
function MilestoneCard({ m, i }: { m: typeof timeline[0]; i: number }) {
  const isEdu = m.type === "education";
  const tiltDeg = i % 2 === 0 ? 6 : -6;
  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        initial={{ opacity: 0, y: 26, rotateY: tiltDeg * 2 }}
        whileInView={{ opacity: 1, y: 0, rotateY: tiltDeg }}
        whileHover={{ rotateY: 0, scale: 1.025, boxShadow: "0 24px 56px rgba(15,23,42,0.14)" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-40px" }}
        style={{
          transformStyle: "preserve-3d",
          background: "#FFFFFF",
          border: "1px solid #E5E5E5",
          borderRadius: 16,
          padding: "clamp(22px,2.4vw,30px)",
          boxShadow: "0 10px 30px rgba(15,23,42,0.07)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "default",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: fm, fontSize: 11, color: "#2563EB", letterSpacing: "0.08em", fontWeight: 700 }}>{m.year}</span>
          <span style={{
            fontFamily: fm, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: 20,
            background: isEdu ? "#F5F3FF" : "#EFF6FF",
            color: isEdu ? "#7C3AED" : "#2563EB",
            border: `1px solid ${isEdu ? "#DDD6FE" : "#BFDBFE"}`,
          }}>
            {isEdu ? "education" : "career"}
          </span>
        </div>
        <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: "clamp(15px,1.5vw,18px)", letterSpacing: "-0.02em", color: "#111111", lineHeight: 1.25, marginBottom: 4 }}>
          {m.title}
        </h3>
        <p style={{ fontFamily: fm, fontSize: 11, color: "#999999", marginBottom: 12 }}>{m.organization}</p>
        <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.65, flex: 1 }}>{m.description}</p>
        {m.technologies && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
            {m.technologies.slice(0, 5).map(t => (
              <span key={t} style={{ padding: "2px 8px", background: "#F5F5F5", borderRadius: 4, fontSize: 10, color: "#777777", fontFamily: fm }}>{t}</span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── Counter tile with hover tilt ───────────────────────────────────────── */
function StatTile({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const t0 = performance.now();
      const raf = (t: number) => {
        const p = Math.min((t - t0) / 1300, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div style={{ perspective: 700 }}>
      <motion.div
        ref={ref}
        whileHover={{ rotateX: 7, rotateY: -7, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{
          transformStyle: "preserve-3d",
          textAlign: "center",
          padding: "clamp(22px,2.6vw,34px) 12px",
          border: "1px solid #E5E5E5",
          borderRadius: 16,
          background: "#FFFFFF",
          boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
          cursor: "default",
        }}
      >
        <div style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,3.4vw,3rem)", letterSpacing: "-0.04em", color: "#111111", lineHeight: 1 }}>
          {n}{suffix}
        </div>
        <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999999", marginTop: 10, lineHeight: 1.5 }}>{label}</div>
      </motion.div>
    </div>
  );
}

const SKILL_COLORS: Record<string, string> = {
  "AI Platforms": "#60A5FA", "Generative AI": "#A78BFA", "Engineering": "#34D399",
  "Data Science": "#F472B6", "Cloud": "#FBBF24", "Analytics": "#FB923C", "Leadership": "#818CF8",
};

/* credential line icon (replaces the per-cert emoji) */
function CertIcon({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13 7 21l5-2.8L17 21l-1.5-8" />
    </svg>
  );
}

export default function AboutPage() {
  const skillCats = Array.from(new Set(skills.map(s => s.category)));

  return (
    <>
      {/* ═══ HERO — dark, 3D identity card ═══ */}
      <section style={{ background: "#0A0A0A", overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 60% at 74% 45%, rgba(37,99,235,0.12), transparent 70%)",
        }} />
        <div className="ab-hero" style={{
          position: "relative", maxWidth: 1180, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1.15fr 1fr", alignItems: "center",
          gap: "clamp(32px,5vw,80px)",
          padding: "clamp(64px,8vw,110px) clamp(20px,4vw,60px)",
        }}>
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#60A5FA", fontWeight: 700, marginBottom: 22 }}>
              About Me
            </p>
            <h1 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(2.2rem,4.8vw,4.2rem)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1.02, textTransform: "lowercase", marginBottom: 22 }}>
              engineer at heart.<br />leader by results.
            </h1>
            <p style={{ fontFamily: fd, fontWeight: 500, fontSize: "clamp(15px,1.5vw,19px)", color: "rgba(255,255,255,0.8)", letterSpacing: "-0.01em", marginBottom: 18, textTransform: "lowercase" }}>
              I work in <RoleFlipper />
            </p>
            <p style={{ fontSize: "clamp(14px,1.25vw,16px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 520, marginBottom: 34 }}>
              {personalInfo.summary}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/experience" style={{
                display: "inline-flex", alignItems: "center", padding: "13px 28px",
                background: "#FFFFFF", color: "#111111",
                fontFamily: fd, fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
                textDecoration: "none", borderRadius: 8, whiteSpace: "nowrap",
              }}>
                my experience →
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", padding: "13px 28px",
                background: "transparent", color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.25)",
                fontFamily: fd, fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em",
                textDecoration: "none", borderRadius: 8, whiteSpace: "nowrap",
              }}>
                let&apos;s talk
              </Link>
            </div>
          </motion.div>

          {/* Right: 3D card */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <IdentityCard />
          </motion.div>
        </div>
        <style>{`@media(max-width:900px){.ab-hero{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ═══ JOURNEY — 3D perspective timeline ═══ */}
      <section style={{ background: "#F1F2F4", padding: "clamp(64px,8vw,110px) clamp(20px,4vw,60px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: 52 }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2563EB", fontWeight: 700, marginBottom: 14 }}>
              The Journey · Present → 2012
            </p>
            <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", color: "#111111", textTransform: "lowercase", lineHeight: 1.02 }}>
              the road here.
            </h2>
          </motion.div>

          <div className="ab-timeline" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {/* row 1: career (work), row 2: education — each newest → oldest */}
            {[
              ...timeline.filter((m) => m.type === "work"),
              ...timeline.filter((m) => m.type === "education"),
            ].map((m, i) => (
              <MilestoneCard key={m.id} m={m} i={i} />
            ))}
          </div>
          <style>{`@media(max-width:900px){.ab-timeline{grid-template-columns:1fr !important;}}`}</style>
        </div>
      </section>

      {/* ═══ BY THE NUMBERS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "clamp(64px,8vw,100px) clamp(20px,4vw,60px)", borderBottom: "1px solid #E8E8E8" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: 44 }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2563EB", fontWeight: 700, marginBottom: 14 }}>
              At a Glance
            </p>
            <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", color: "#111111", textTransform: "lowercase", lineHeight: 1.02 }}>
              a career in numbers.
            </h2>
          </motion.div>
          <div className="ab-stats" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
            {heroMetrics.map(m => (
              <StatTile key={m.label} value={m.value} suffix={m.suffix} label={m.label} />
            ))}
          </div>
          <style>{`@media(max-width:1000px){.ab-stats{grid-template-columns:repeat(3,1fr) !important;}}@media(max-width:640px){.ab-stats{grid-template-columns:repeat(2,1fr) !important;}}`}</style>
        </div>
      </section>

      {/* ═══ SKILLS — dark chip field ═══ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(64px,8vw,110px) clamp(20px,4vw,60px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#60A5FA", fontWeight: 700, marginBottom: 14 }}>
              Toolbox
            </p>
            <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", color: "#FFFFFF", textTransform: "lowercase", lineHeight: 1.02 }}>
              what I work with.
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {skillCats.map(cat => {
              const c = SKILL_COLORS[cat] || "#60A5FA";
              return (
                <div key={cat}>
                  <p style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12, fontWeight: 700 }}>{cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.filter(s => s.category === cat).map((s, i) => (
                      <motion.span
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.06, y: -3 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        viewport={{ once: true }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 30,
                          border: `1px solid ${c}30`,
                          background: `${c}10`,
                          color: c,
                          fontFamily: fd,
                          fontSize: 13,
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          cursor: "default",
                          display: "inline-block",
                        }}
                      >
                        {s.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section style={{ background: "#FFFFFF", padding: "clamp(64px,8vw,100px) clamp(20px,4vw,60px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: 44 }}>
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2563EB", fontWeight: 700, marginBottom: 14 }}>
              Credentials
            </p>
            <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.9rem,4vw,3.4rem)", letterSpacing: "-0.04em", color: "#111111", textTransform: "lowercase", lineHeight: 1.02 }}>
              education &amp; certifications.
            </h2>
          </motion.div>
          <div className="ab-certs" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {certifications.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: (i % 2) * 0.08 }} viewport={{ once: true }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "18px 24px", border: "1px solid #E5E5E5", borderRadius: 14, background: "#FFFFFF" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 10, background: "#EEF3FF", color: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CertIcon size={20} />
                  </span>
                  <div>
                    <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 15, letterSpacing: "-0.015em", color: "#111111" }}>{c.title}</div>
                    <div style={{ fontFamily: fm, fontSize: 11, color: "#999999", marginTop: 3 }}>{c.issuer}</div>
                  </div>
                </div>
                <span style={{ fontFamily: fm, fontSize: 12, color: "#2563EB", flexShrink: 0 }}>{c.year}</span>
              </motion.div>
            ))}
          </div>
          <style>{`@media(max-width:760px){.ab-certs{grid-template-columns:1fr !important;}}`}</style>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </>
  );
}
