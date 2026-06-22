"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, ExternalLink } from "lucide-react";
import CountUp from "react-countup";
import Image from "next/image";
import { personalInfo, heroMetrics } from "@/data/portfolioData";

const PARTICLE_COUNT = 50;

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: ["#00E5FF", "#7C3AED", "#60A5FA"][Math.floor(Math.random() * 3)],
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

const roles = personalInfo.rotatingRoles;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060918 0%, #0B1230 50%, #060918 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

      {/* Aurora blobs */}
      <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[150px]"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent)" }} />

      <Particles />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full pt-24 pb-16">

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto">
            {/* Spinning gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 0deg, #00E5FF 0%, #7C3AED 40%, #60A5FA 70%, #00E5FF 100%)", padding: "3px", borderRadius: "50%" }}
            >
              <div className="w-full h-full rounded-full" style={{ background: "#060918" }} />
            </motion.div>

            {/* Static outer glow */}
            <div className="absolute inset-[-4px] rounded-full opacity-40 blur-md"
              style={{ background: "conic-gradient(from 0deg, #00E5FF, #7C3AED, #00E5FF)" }} />

            {/* Photo */}
            <div className="absolute inset-[4px] rounded-full overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Mirza Minhaz Baig"
                fill
                sizes="(max-width: 768px) 176px, 208px"
                className="object-cover object-top"
                style={{ filter: "brightness(1.05) saturate(0.95)" }}
                priority
              />
              {/* Vignette to blend gray background into dark website */}
              <div className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(6,9,24,0.5) 90%, rgba(6,9,24,0.85) 100%)" }} />
            </div>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
          style={{ background: "rgba(0,229,255,0.06)", borderColor: "rgba(0,229,255,0.25)", color: "#00E5FF" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
          <span className="text-sm font-medium tracking-wide">Available for AI Consulting</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bold tracking-tight mb-4 text-white"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="h-14 flex items-center justify-center mb-5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <span className="text-3xl md:text-4xl font-semibold"
                style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {roles[roleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ color: "#94A3B8" }}
        >
          12+ years transforming enterprise data into AI-powered competitive advantage.
          Building Agentic AI, RAG pipelines, and scalable analytics in financial services.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap gap-4 justify-center mb-20"
        >
          <a href="#journey"
            className="group flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", color: "#050816", boxShadow: "0 0 30px rgba(0,229,255,0.25)" }}>
            Explore Journey <ExternalLink size={16} />
          </a>
          <a href="#impact"
            className="flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base border transition-all duration-300 hover:scale-105 hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF", backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.05)" }}>
            View Impact
          </a>
          <a href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base border transition-all duration-300 hover:scale-105"
            style={{ borderColor: "#00E5FF40", color: "#00E5FF", background: "rgba(0,229,255,0.05)" }}>
            <Mail size={16} /> Contact Me
          </a>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl"
        >
          {heroMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex flex-col items-center p-5 rounded-2xl border group hover:scale-105 transition-transform duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: `${m.color}25`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 0 0 0 ${m.color}`,
              }}
            >
              <span className="text-4xl font-black mb-1" style={{ color: m.color }}>
                {inView && <CountUp end={m.value} duration={2.5} delay={0.5 + i * 0.15} suffix={m.suffix} />}
              </span>
              <span className="text-sm text-center leading-tight" style={{ color: "#94A3B8" }}>{m.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ChevronDown size={28} style={{ color: "#94A3B8" }} />
      </motion.div>
    </section>
  );
}
