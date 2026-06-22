"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PrintTrigger() {
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("print") === "1") {
      const t = setTimeout(() => window.print(), 500);
      return () => clearTimeout(t);
    }
  }, [params]);
  return null;
}

export default function ResumePage() {
  return (
    <div id="resume-wrapper" style={{ background: "#ebebeb", padding: "24px 0", minHeight: "100vh" }}>
      <Suspense><PrintTrigger /></Suspense>

      {/* Control bar — hidden when printing */}
      <div className="no-print" style={{
        maxWidth: "760px", margin: "0 auto 18px", padding: "0 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: "13px", color: "#666", fontFamily: "Arial, sans-serif" }}>
          Preview below — click <strong>Save as PDF</strong> to download.
        </span>
        <button
          onClick={() => window.print()}
          style={{
            background: "#111", color: "#fff", border: "none",
            padding: "10px 24px", fontSize: "13px", fontWeight: 700,
            fontFamily: "Arial, sans-serif", cursor: "pointer", letterSpacing: "0.03em",
          }}
        >
          ↓ Save as PDF
        </button>
      </div>

      {/* ── Resume Sheet ── */}
      <div
        id="resume-sheet"
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#ffffff",
          boxShadow: "0 2px 20px rgba(0,0,0,0.13)",
          padding: "0 0 32px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Accent bar */}
        <div style={{ height: "5px", background: "#111111", marginBottom: "28px" }} />

        {/* Inner content with side padding */}
        <div style={{ padding: "0 40px" }}>

          {/* ── Header ── */}
          <h1 style={{
            fontSize: "26px", fontWeight: 800, letterSpacing: "0.045em",
            textTransform: "uppercase", margin: "0 0 5px", color: "#111", lineHeight: 1,
          }}>
            Mirza Minhaz Baig
          </h1>
          <p style={{
            fontSize: "10px", color: "#666", letterSpacing: "0.2em",
            textTransform: "uppercase", margin: "0 0 10px",
          }}>
            AVP &nbsp;·&nbsp; AI Consultant &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; 12+ Years Enterprise AI in Financial Services
          </p>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "4px 0",
            fontSize: "9.5px", color: "#444",
            borderTop: "1px solid #ddd", paddingTop: "9px",
          }}>
            {[
              "mirza.22sept@gmail.com",
              "+91-9538999277",
              "Hyderabad, India",
              "linkedin.com/in/mirza-minhaz-baig-aiml",
              "mirzaminhazbaig.space",
              "github.com/MMBCoder",
            ].map((t, i) => (
              <span key={t}>
                {i > 0 && <span style={{ color: "#bbb", padding: "0 8px" }}>|</span>}
                {t}
              </span>
            ))}
          </div>

          {/* ── Summary ── */}
          <Label>Professional Summary</Label>
          <p style={body}>
            AI Consultant and Data Scientist with 12+ years of enterprise experience in financial services.
            Specialist in Agentic AI (LangChain, LangGraph, RAG), LLM orchestration, and Customer Data Platforms.
            Proven track record delivering measurable outcomes — reducing 3-day workflows to 20 minutes,
            enabling 200+ stakeholders with self-service analytics, and leading CDP implementations across
            10M+ customer profiles. Three-time Synchrony CEO Award winner.
          </p>

          {/* ── Skills ── */}
          <Label>Core Skills &amp; Technologies</Label>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "2px" }}>
            <tbody>
              {[
                ["Agentic AI & LLM", "LangChain · LangGraph · AutoGen · CrewAI · GPT-4o · Claude 3 · Azure OpenAI · Prompt Engineering"],
                ["ML & Data Eng.", "Python · PySpark · SQL · Scikit-learn · TensorFlow · NLP · RAG Pipelines · Feature Eng. · A/B Testing"],
                ["CDP & Cloud/BI", "Bluecore · Segment · Adobe AEP · Real-Time Segmentation · Databricks · Snowflake · Azure · BigQuery · Power BI · Tableau"],
              ].map(([label, skills]) => (
                <tr key={label}>
                  <td style={{ fontSize: "9px", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.04em", paddingRight: "10px", whiteSpace: "nowrap", verticalAlign: "top", paddingBottom: "4px" }}>
                    {label}
                  </td>
                  <td style={{ fontSize: "10px", color: "#333", lineHeight: 1.55, paddingBottom: "4px" }}>
                    {skills}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Experience ── */}
          <Label>Experience</Label>

          <Job
            role="AVP – Customer Data Platform & AI Transformation"
            company="Synchrony Financial"
            period="2019 – Present"
            location="Hyderabad, India"
            bullets={[
              "Architected Agentic AI systems (LangGraph, LangChain, RAG) adopted by 200+ business leaders enterprise-wide",
              "Built enterprise CDP integrating 50+ data sources; achieved 96% automation on key campaign workflows",
              "Implemented Bluecore CDP enabling real-time segmentation and dynamic email marketing across 10M+ customer profiles",
              "Launched 'Ask Insight' — NLP conversational analytics layer reducing insight turnaround from 72 hours to 2 minutes",
              "Delivered RAG Campaign Copilot cutting code generation from 3–5 days to under 20 minutes (96% time saving)",
              "Three-time CEO Award winner (2020–2022); LEAP High-Potential Leadership Program participant",
              "Led cross-functional teams of 20+ engineers, data scientists, and marketing analysts",
            ]}
          />

          <Job
            role="Analytics Manager – Cards & Consumer Banking"
            company="Citigroup"
            period="2018 – 2019"
            location="Hyderabad, India"
            bullets={[
              "Led 8-person data science team delivering credit risk and customer acquisition models for APAC markets",
              "Improved credit bureau score model AUC by 12%; automated dashboards reducing analyst effort by 60%",
            ]}
          />

          <Job
            role="Assistant Manager – Analytics & Automation"
            company="Genpact"
            period="2014 – 2018"
            location="Hyderabad, India"
            bullets={[
              "Predictive models for US mortgage risk; reduced default rates by 8% for global BFSI clients",
              "Automated month-end close reporting saving 2,000+ analyst hours annually; promoted twice in 4 years",
            ]}
          />

          {/* ── Education ── */}
          <Label>Education</Label>
          <EduRow
            degree="M.S. Machine Learning & Artificial Intelligence"
            school="Liverpool John Moores University"
            year="2019 – 2021"
            note="Distinction · Part-Time · Springer First-Author Publication"
          />
          <EduRow
            degree="M.Tech – Computer Engineering"
            school="Indian Institute of Technology Delhi"
            year="2012 – 2014"
          />
          <EduRow
            degree="B.Tech – Petrochemical Engineering"
            school="Aligarh Muslim University"
            year="2008 – 2012"
          />

          {/* ── Awards & Publication ── */}
          <Label>Awards &amp; Publication</Label>
          <p style={{ ...body, marginBottom: "4px" }}>
            <strong>Three-Time CEO Award</strong> (2020–2022) &nbsp;·&nbsp;
            <strong>LEAP High-Potential Leadership Program</strong> (2022) &nbsp;·&nbsp;
            <strong>Certificate of Excellence</strong> — Genpact (2019)
          </p>
          <p style={body}>
            <em>&ldquo;AI-Driven Data Analytics for Enterprise Systems&rdquo;</em>
            &nbsp;— First Author · Springer · Peer-Reviewed · 2021
          </p>

        </div>{/* /inner */}
      </div>{/* /resume-sheet */}

      {/* Screen-only bottom spacer */}
      <div className="no-print" style={{ height: "40px" }} />
    </div>
  );
}

/* ─── Sub-components ─── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 8px" }}>
      <span style={{
        fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#888", whiteSpace: "nowrap",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1.5px", background: "#222" }} />
    </div>
  );
}

function Job({
  role, company, period, location, bullets,
}: {
  role: string; company: string; period: string; location: string; bullets: string[];
}) {
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0 8px" }}>
        <strong style={{ fontSize: "11.5px", color: "#111", fontWeight: 700 }}>{role}</strong>
        <span style={{ fontSize: "9.5px", color: "#777", flexShrink: 0 }}>{period}</span>
      </div>
      <p style={{ fontSize: "10px", color: "#666", fontStyle: "italic", margin: "2px 0 5px" }}>
        {company} &nbsp;·&nbsp; {location}
      </p>
      <ul style={{ margin: 0, paddingLeft: "14px" }}>
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: "10.5px", color: "#333", lineHeight: 1.5, marginBottom: "3px" }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EduRow({
  degree, school, year, note,
}: {
  degree: string; school: string; year: string; note?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0 8px", marginBottom: "7px" }}>
      <div style={{ lineHeight: 1.5 }}>
        <strong style={{ fontSize: "10.5px", color: "#111" }}>{degree}</strong>
        <span style={{ fontSize: "10px", color: "#555", fontStyle: "italic" }}> · {school}</span>
        {note && <span style={{ fontSize: "9.5px", color: "#888" }}> · {note}</span>}
      </div>
      <span style={{ fontSize: "9.5px", color: "#888", flexShrink: 0 }}>{year}</span>
    </div>
  );
}

const body: React.CSSProperties = {
  fontSize: "10.5px",
  color: "#333",
  lineHeight: 1.6,
  margin: "0 0 8px",
};
