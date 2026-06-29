"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

const navItems = [
  { label: "about", href: "/about" },
  { label: "learn", href: "/learn" },
  { label: "portfolio", href: "/portfolio" },
  { label: "experience", href: "/experience" },
  { label: "awards", href: "/awards" },
  { label: "contact", href: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content — accessible keyboard shortcut */}
      <a
        href="#main-content"
        style={{
          position: "fixed",
          top: "-100%",
          left: "16px",
          zIndex: 9999,
          padding: "8px 16px",
          background: "#FFFFFF",
          color: "#111111",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          borderRadius: "4px",
          textDecoration: "none",
          transition: "top 0.15s",
        }}
        onFocus={(e) => { e.currentTarget.style.top = "8px"; }}
        onBlur={(e) => { e.currentTarget.style.top = "-100%"; }}
      >
        Skip to content
      </a>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#111111",
          height: "68px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "28px",
          paddingRight: "28px",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "border-color 0.3s",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo + Identity */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "1.5px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 900,
            fontSize: "11px",
            letterSpacing: "-0.04em",
            flexShrink: 0,
          }}>
            MMB
          </div>
          <div className="hidden lg:block">
            <div style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}>
              Mirza Minhaz Baig
            </div>
            <div style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "9px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              AI Transformation Leader
            </div>
          </div>
        </Link>

        {/* Center nav — desktop */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            alignItems: "center",
            gap: "2px",
          }}
          className="hidden md:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  padding: "6px 13px",
                  opacity: isActive ? 1 : 0.78,
                  fontFamily: "var(--font-inter), sans-serif",
                  borderBottom: isActive ? "1.5px solid #FFFFFF" : "1.5px solid transparent",
                  transition: "opacity 0.2s",
                  borderRadius: "4px 4px 0 0",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    (e.currentTarget as HTMLElement).style.opacity = "0.78";
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: social icons + CTA + hamburger */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px" }}>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex"
            style={{ color: "#FFFFFF", opacity: 0.7, transition: "opacity 0.2s", alignItems: "center" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
            aria-label="LinkedIn profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex"
            style={{ color: "#FFFFFF", opacity: 0.7, transition: "opacity 0.2s", alignItems: "center" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
            aria-label="GitHub profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* CTA — always visible on desktop */}
          <Link
            href="/contact"
            className="hidden md:inline-flex"
            style={{
              alignItems: "center",
              padding: "8px 18px",
              background: "#FFFFFF",
              color: "#111111",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: "6px",
              transition: "background 0.18s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#E0E0E0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
          >
            let&apos;s talk
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#FFFFFF", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              top: "68px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "#111111",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.035, duration: 0.18 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "16px 28px",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "16px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    opacity: pathname === item.href ? 1 : 0.78,
                    fontWeight: pathname === item.href ? 700 : 400,
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ padding: "16px 28px 20px" }}>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  background: "#FFFFFF",
                  color: "#111111",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  borderRadius: "6px",
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                }}
              >
                let&apos;s talk →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
