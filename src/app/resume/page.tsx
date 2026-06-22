"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ACCENT = "#1a1a1a";
const SIDEBAR_BG = "#f5f5f5";
const RULE = "#dddddd";

function ResumeInner() {
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("print") === "1") {
      const t = setTimeout(() => window.print(), 600);
      return () => clearTimeout(t);
    }
  }, [params]);

  return null;
}

export default function ResumePage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", padding: "clamp(12px, 2vw, 32px) 0" }}>

      {/* Print trigger (hidden) */}
      <Suspense><ResumeInner /></Suspense>

      {/* ── Download / Print bar (hidden when printing) ── */}
      <div className="no-print" style={{
        maxWidth: "860px",
        margin: "0 auto 20px",
        padding: "0 clamp(16px, 3vw, 32px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: "13px", color: "#888", fontFamily: "var(--font-inter), sans-serif" }}>
          View your resume below — click <strong>Save as PDF</strong> to download.
        </span>
        <button
          onClick={() => window.print()}
          style={{
            background: "#111111",
            color: "#ffffff",
            border: "none",
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "var(--font-space-grotesk), sans-serif",
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          ↓ Save as PDF
        </button>
      </div>

      {/* ── Resume sheet ── */}
      <div id="resume-sheet" style={{
        maxWidth: "860px",
        margin: "0 auto",
        background: "#ffffff",
        boxShadow: "0 4px 40px rgba(0,0,0,0.10)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}>

        {/* Header */}
        <div style={{
          background: ACCENT,
          color: "#ffffff",
          padding: "36px 48px 32px",
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1,
            fontFamily: "'Arial', sans-serif",
          }}>
            Mirza Minhaz Baig
          </h1>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.70)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: "8px",
            marginBottom: "20px",
            fontFamily: "'Arial', sans-serif",
          }}>
            AVP · AI Consultant · Data Scientist
          </p>

          {/* Contact row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 20px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.82)",
            fontFamily: "'Arial', sans-serif",
          }}>
            {[
              { icon: "✉", text: "mirza.22sept@gmail.com" },
              { icon: "✆", text: "+91-9538999277" },
              { icon: "⊙", text: "Hyderabad, India" },
              { icon: "⬡", text: "linkedin.com/in/mirza-minhaz-baig-aiml" },
              { icon: "◈", text: "mirzaminhazbaig.space" },
              { icon: "◉", text: "github.com/MMBCoder" },
            ].map(({ icon, text }) => (
              <span key={text} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ opacity: 0.6, fontSize: "11px" }}>{icon}</span>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Body: two columns */}
        <div style={{ display: "flex", alignItems: "stretch" }}>

          {/* ── LEFT MAIN (65%) ── */}
          <div style={{ flex: "0 0 62%", padding: "36px 36px 40px 48px", borderRight: `1px solid ${RULE}` }}>

            {/* Summary */}
            <Section title="Professional Summary">
              <p style={bodyText}>
                AI Consultant and Data Scientist with 12+ years of enterprise experience in financial services.
                Specialist in Agentic AI systems, LLM orchestration, RAG architectures, and Customer Data Platforms.
                Proven track record delivering AI solutions that generate measurable business impact —
                cutting 3-day workflows to 20 minutes, empowering 200+ stakeholders with self-service analytics,
                and leading enterprise-scale CDP implementations. Three-time Synchrony CEO Award winner.
              </p>
            </Section>

            <Divider />

            {/* Experience */}
            <Section title="Experience">

              <Job
                role="AVP – Customer Data Platform & AI Transformation"
                company="Synchrony Financial"
                period="2019 – Present"
                location="Hyderabad, India"
                bullets={[
                  "Architected Agentic AI systems (LangGraph, LangChain, RAG pipelines) adopted by 200+ business leaders across the enterprise",
                  "Built enterprise CDP platform integrating 50+ data sources; achieved 96% process automation on key campaign workflows",
                  "Implemented Bluecore CDP for real-time email marketing, enabling dynamic segmentation across 10M+ customer profiles",
                  "Launched 'Ask Insight' — NLP conversational analytics layer over Power BI reducing insight turnaround from 72 hrs to 2 min",
                  "Delivered RAG Campaign Copilot: reduced campaign code generation from 3–5 days to under 20 minutes (96% time saving)",
                  "Three-time CEO Award winner — Synchrony's highest organisational recognition",
                  "Led cross-functional team of 20+ engineers, data scientists, and analysts",
                ]}
              />

              <Job
                role="Analytics Manager – Cards & Consumer Banking"
                company="Citigroup"
                period="2018 – 2019"
                location="Hyderabad, India"
                bullets={[
                  "Led team of 8 data scientists delivering credit risk and customer acquisition models for APAC markets",
                  "Improved credit bureau score model AUC by 12% through advanced feature engineering techniques",
                  "Built automated reporting dashboards reducing manual analyst effort by 60%",
                ]}
              />

              <Job
                role="Assistant Manager – Analytics & Automation"
                company="Genpact"
                period="2014 – 2018"
                location="Hyderabad, India"
                bullets={[
                  "Delivered predictive models for US mortgage risk; reduced default rates by 8% for global BFSI clients",
                  "Automated month-end close reporting workflows saving 2,000+ hours annually",
                  "Promoted twice in 4 years based on consistent high-impact delivery",
                ]}
              />
            </Section>

            <Divider />

            {/* Publications */}
            <Section title="Publication">
              <div style={{ marginBottom: "10px" }}>
                <p style={{ ...bodyText, fontStyle: "italic", marginBottom: "3px" }}>
                  &ldquo;AI-Driven Data Analytics for Enterprise Systems&rdquo;
                </p>
                <p style={{ fontSize: "11px", color: "#666", fontFamily: "'Arial', sans-serif" }}>
                  <strong>First Author</strong> · Springer · Peer-Reviewed · 2021
                </p>
              </div>
            </Section>

          </div>

          {/* ── RIGHT SIDEBAR (35%) ── */}
          <div style={{ flex: 1, background: SIDEBAR_BG, padding: "36px 28px 40px" }}>

            {/* Skills */}
            <SideSection title="Technical Skills">
              <SkillGroup label="Agentic AI & LLM" items={["LangChain", "LangGraph", "AutoGen", "CrewAI", "GPT-4", "Claude", "Azure OpenAI"]} />
              <SkillGroup label="AI / ML" items={["RAG Pipelines", "NLP", "Prompt Engineering", "Scikit-learn", "TensorFlow", "Deep Learning"]} />
              <SkillGroup label="Data Engineering" items={["Python", "PySpark", "SQL", "Databricks", "Snowflake", "Azure Data Factory", "dbt"]} />
              <SkillGroup label="CDP & MarTech" items={["Bluecore CDP", "Segment", "Adobe Experience Platform", "Real-Time Segmentation"]} />
              <SkillGroup label="Analytics & BI" items={["Power BI", "Tableau", "Conversational Analytics", "A/B Testing"]} />
              <SkillGroup label="Cloud" items={["Microsoft Azure", "Google BigQuery", "AWS"]} />
            </SideSection>

            <SideDivider />

            {/* Education */}
            <SideSection title="Education">
              <EduItem
                degree="M.S. Machine Learning & Artificial Intelligence"
                school="Liverpool John Moores University"
                year="2019 – 2021 (Part-Time)"
                note="Distinction · Springer Publication"
              />
              <EduItem
                degree="M.Tech – Computer Engineering"
                school="Indian Institute of Technology Delhi"
                year="2012 – 2014"
              />
              <EduItem
                degree="B.Tech – Petrochemical Engineering"
                school="Aligarh Muslim University"
                year="2008 – 2012"
              />
            </SideSection>

            <SideDivider />

            {/* Awards */}
            <SideSection title="Awards & Recognition">
              {[
                { year: "2020–22", text: "Three-Time CEO Award — Synchrony Financial" },
                { year: "2022", text: "LEAP High-Potential Leadership Program" },
                { year: "2021", text: "Springer First-Author Publication" },
                { year: "2019", text: "Certificate of Excellence — Genpact" },
              ].map((a) => (
                <div key={a.text} style={{ marginBottom: "10px" }}>
                  <span style={{ fontSize: "10px", color: "#999", fontFamily: "'Arial', sans-serif", letterSpacing: "0.05em" }}>{a.year}</span>
                  <p style={{ fontSize: "11.5px", color: "#333", fontFamily: "'Arial', sans-serif", margin: "2px 0 0", lineHeight: 1.4 }}>{a.text}</p>
                </div>
              ))}
            </SideSection>

            <SideDivider />

            {/* Portfolio */}
            <SideSection title="Portfolio">
              <p style={{ fontSize: "11.5px", color: "#333", fontFamily: "'Arial', sans-serif", lineHeight: 1.6 }}>
                View live projects, case studies &amp; publications at:<br />
                <strong style={{ color: ACCENT }}>mirzaminhazbaig.space</strong>
              </p>
            </SideSection>

          </div>
        </div>
      </div>

      {/* Bottom padding (screen only) */}
      <div className="no-print" style={{ height: "40px" }} />
    </div>
  );
}

/* ─── Helper components ─── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <h2 style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#888888",
        fontFamily: "'Arial', sans-serif",
        marginBottom: "10px",
        paddingBottom: "5px",
        borderBottom: `2px solid ${ACCENT}`,
        display: "inline-block",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: RULE, margin: "20px 0" }} />;
}

function SideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#888888",
        fontFamily: "'Arial', sans-serif",
        marginBottom: "10px",
        paddingBottom: "4px",
        borderBottom: `1.5px solid #cccccc`,
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function SideDivider() {
  return <div style={{ height: "1px", background: "#e0e0e0", margin: "18px 0" }} />;
}

function Job({ role, company, period, location, bullets }: {
  role: string; company: string; period: string; location: string; bullets: string[];
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2px", marginBottom: "2px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#111", fontFamily: "'Arial', sans-serif" }}>{role}</span>
        <span style={{ fontSize: "10.5px", color: "#777", fontFamily: "'Arial', sans-serif", flexShrink: 0 }}>{period}</span>
      </div>
      <p style={{ fontSize: "11px", color: "#555", fontFamily: "'Arial', sans-serif", marginBottom: "7px", fontStyle: "italic" }}>
        {company} &nbsp;·&nbsp; {location}
      </p>
      <ul style={{ paddingLeft: "14px", margin: 0 }}>
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: "11.5px", color: "#333", lineHeight: 1.55, marginBottom: "4px", fontFamily: "'Arial', sans-serif" }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ marginBottom: "9px" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, color: "#555", fontFamily: "'Arial', sans-serif", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </p>
      <p style={{ fontSize: "11px", color: "#444", fontFamily: "'Arial', sans-serif", lineHeight: 1.5, margin: 0 }}>
        {items.join(" · ")}
      </p>
    </div>
  );
}

function EduItem({ degree, school, year, note }: { degree: string; school: string; year: string; note?: string }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <p style={{ fontSize: "11.5px", fontWeight: 700, color: "#222", fontFamily: "'Arial', sans-serif", margin: "0 0 2px" }}>{degree}</p>
      <p style={{ fontSize: "11px", color: "#555", fontFamily: "'Arial', sans-serif", margin: "0 0 1px" }}>{school}</p>
      <p style={{ fontSize: "10px", color: "#999", fontFamily: "'Arial', sans-serif", margin: 0 }}>{year}</p>
      {note && <p style={{ fontSize: "10px", color: "#777", fontFamily: "'Arial', sans-serif", margin: "2px 0 0", fontStyle: "italic" }}>{note}</p>}
    </div>
  );
}

const bodyText: React.CSSProperties = {
  fontSize: "12px",
  color: "#333333",
  lineHeight: 1.65,
  fontFamily: "'Arial', sans-serif",
  margin: "0 0 6px",
};
