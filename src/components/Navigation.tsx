"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { personalInfo } from "@/data/portfolioData";

const navItems = [
  { label: "Journey", href: "#journey" },
  { label: "Impact", href: "#impact" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Cases", href: "#cases" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "rgba(255,255,255,0.04)" }}>
        <motion.div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #00E5FF, #7C3AED)",
            boxShadow: "0 0 10px #00E5FF80",
          }}
        />
      </div>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-[3px] left-0 right-0 z-40 flex items-center justify-between px-8 py-5"
        style={{
          background: scrolled ? "rgba(6,9,24,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <a href="#hero" className="font-black text-xl" style={{ color: "#00E5FF", letterSpacing: "-0.02em" }}>
          MMB<span className="font-light text-white">.ai</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
              style={{ color: "#94A3B8" }}>
              {item.label}
            </a>
          ))}
          <a href={`mailto:${personalInfo.email}`}
            className="ml-4 px-6 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #00E5FF, #7C3AED)", color: "#050816", boxShadow: "0 0 20px rgba(0,229,255,0.2)" }}>
            Hire Me
          </a>
        </div>

        <button className="md:hidden p-2 rounded-lg" style={{ color: "#94A3B8" }}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl border p-4"
            style={{ background: "rgba(11,16,35,0.96)", backdropFilter: "blur(24px)", borderColor: "rgba(255,255,255,0.1)" }}
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-3.5 rounded-lg text-base font-semibold transition-all hover:bg-white/[0.06] hover:text-white"
                style={{ color: "#94A3B8" }}>
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
