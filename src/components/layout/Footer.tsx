"use client";

import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-16 lg:px-24 py-6 gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-black text-xs"
            style={{ background: "#FFFFFF", color: "#111111" }}
          >
            MM
          </div>
          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
            Mirza Minhaz Baig · {personalInfo.location}
          </span>
        </div>

        <nav className="footer-nav flex items-center gap-6">
          {[
            { href: "/about", label: "about" },
            { href: "/portfolio", label: "projects" },
            { href: "/experience", label: "experience" },
            { href: "/awards", label: "awards" },
            { href: "/#publications", label: "publications" },
            { href: "/contact", label: "contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-mono lowercase transition-opacity"
              style={{ color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
          © {new Date().getFullYear()} MMB
        </p>
      </div>
    </footer>
  );
}
