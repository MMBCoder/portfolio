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
            AVP &nbsp;·&nbsp; AI Transformation Leader &nbsp;·&nbsp; Data Scientist &nbsp;·&nbsp; 12+ Years Enterprise AI in Financial Services
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
            Data Scientist and Data Engineer with 12+ years of enterprise experience in financial services.
            Specialist in Customer Data Platforms (BlueConic), data integration architecture, customer identity
            resolution, and real-time marketing activation. Proven track record delivering unified customer
            profiles and personalised engagement at scale across 70M+ customers. Three-time Synchrony CEO Award winner.
          </p>

          {/* ── Skills ── */}
          <Label>Core Skills &amp; Technologies</Label>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "2px" }}>
            <tbody>
              {[
                ["CDP & Data Eng.", "BlueConic CDP · Python · PySpark · SQL · SFTP Pipelines · Data Integration · Customer Identity Resolution"],
                ["Marketing Tech.", "Real-Time Segmentation · Audience Building · Trigger Campaigns · Marketing Automation · Personalisation · A/B Testing"],
                ["Cloud & Analytics", "AWS · Databricks · Snowflake · BigQuery · Power BI · Tableau · LangChain · LangGraph · Agentic AI · RAG · GenAI"],
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
            role="AVP – Data Scientist & Data Engineer, Customer Data Platform"
            company="Synchrony Financial"
            period="2019 – Present"
            location="Hyderabad, India"
            bullets={[
              "Lead data integration architecture between BlueConic CDP and Synchrony's digital platforms (Marketplace, Vista, DApply, Amplero) — delivering a unified 360° customer view across all touchpoints",
              "Design and implement online and offline data ingestion pipelines, including SFTP-based feeds for profile enrichment, unifying behavioral, transactional, demographic, and engagement signals at enterprise scale",
              "Own customer identity resolution processes providing a single authoritative customer view for 70M+ account holders across Synchrony's multi-product ecosystem",
              "Enable real-time marketing activation through AI Workbench (AIWB) and Connections integrations — powering trigger campaigns for abandoned applications, product browsing, category search, and retention",
              "Drive audience segmentation and personalised marketing strategies via CDP capabilities, improving targeting precision and campaign effectiveness across Synchrony's MarTech stack",
              "Three-time CEO Award winner (2021, 2023, 2025); LEAP High-Potential Leadership Program participant (2026)",
            ]}
          />

          <Job
            role="Analytics Manager – Cards & Consumer Banking"
            company="Citigroup"
            period="2018 – 2019"
            location="Bengaluru, India"
            bullets={[
              "Led data science and analytics for Citi Singapore's Retail Banking portfolio (Credit Cards, CASA, Consumer Lending) — delivering predictive models and executive dashboards for strategic decision-making and revenue growth",
              "Saved 1,000+ annual hours through process automation of reporting workflows; transformed complex portfolio data into actionable insights using Python, SQL, SAS, Tableau, Power BI, and AWS",
            ]}
          />

          <Job
            role="Assistant Manager – Analytics & Automation"
            company="Genpact"
            period="2014 – 2018"
            location="Bengaluru, India"
            bullets={[
              "Delivered performance marketing analytics and customer intelligence for US Retail Banking and PLCC portfolios — built attribution models, campaign measurement frameworks, and customer journey analytics",
              "Generated multi-million-dollar business value through data-driven optimisation of customer acquisition and marketing effectiveness; promoted twice in 4 years",
            ]}
          />

          {/* ── Education ── */}
          <Label>Education</Label>
          <EduRow
            degree="M.S. Machine Learning & Artificial Intelligence"
            school="Liverpool John Moores University"
            year="2019 – 2021"
          />
          <EduRow
            degree="M.Tech – Engineering and Technology"
            school="Indian Institute of Technology Delhi"
            year="2012 – 2014"
          />
          <EduRow
            degree="B.Tech – Engineering and Technology"
            school="Aligarh Muslim University"
            year="2008 – 2012"
          />

          {/* ── Awards & Publication ── */}
          <Label>Awards &amp; Publication</Label>
          <p style={{ ...body, marginBottom: "4px" }}>
            <strong>Three-Time CEO Award</strong> (2021, 2023, 2025) &nbsp;·&nbsp;
            <strong>LEAP High-Potential Leadership Program</strong> (2026) &nbsp;·&nbsp;
            <strong>Certificate of Excellence</strong> — Genpact (2019)
          </p>
          <p style={{ ...body, marginBottom: "4px" }}>
            <em>&ldquo;AI-Driven Data Analytics for Enterprise Systems&rdquo;</em>
            &nbsp;— First Author · Springer · Peer-Reviewed · 2021
          </p>
          <p style={body}>
            <em>&ldquo;Engineering droplet navigation through tertiary-junction microchannels&rdquo;</em>
            &nbsp;— Author · Springer · IIT Delhi · 2014
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
