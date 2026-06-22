"use client";

import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center border-t" style={{ background: "#050816", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl font-bold mb-2" style={{ color: "#00E5FF" }}>
          {personalInfo.name}
        </p>
        <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
          AVP – Customer Data Platform | Agentic AI | Enterprise Analytics
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-white transition-colors" style={{ color: "#94A3B8" }}>
            {personalInfo.email}
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors" style={{ color: "#94A3B8" }}>
            LinkedIn
          </a>
        </div>
        <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />
        <p className="text-xs" style={{ color: "#94A3B8" }}>
          © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js, React, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
