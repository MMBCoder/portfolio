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
        <div style={{ height: "5px", background: "linear-gradient(90deg,#111 0%,#2563EB 55%,#0D9488 100%)", ...printExact }} />

        {/* Inner content with side padding */}
        <div style={{ padding: "26px 40px 0" }}>

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

          {/* ── Stat band ── */}
          <div style={{ display: "flex", gap: "8px", margin: "14px 0 4px" }}>
            <Stat value="12+" label="Yrs Enterprise AI" color="#2563EB" />
            <Stat value="70M+" label="Customers Unified" color="#0D9488" />
            <Stat value="3×" label="CEO Awards" color="#D97706" />
            <Stat value="30 min" label="Dev Cycle (was 2 days)" color="#4F46E5" />
          </div>

          {/* ── Summary ── */}
          <Label color="#111">Professional Summary</Label>
          <p style={body}>
            Data Scientist and Data Engineer with 12+ years of enterprise experience in financial services.
            Specialist in Customer Data Platforms (BlueConic), data integration architecture, customer identity
            resolution, and real-time marketing activation. Proven track record delivering unified customer
            profiles and personalised engagement at scale across 70M+ customers. Three-time Synchrony CEO Award winner.
          </p>

          {/* ── Flagship AI project ── */}
          <Label color="#2563EB">Flagship AI Build</Label>
          <FlagshipProject />

          {/* ── Skills ── */}
          <Label color="#0D9488">Core Skills &amp; Technologies</Label>
          <div style={{ marginBottom: "2px" }}>
            <SkillGroup
              color="#0D9488" label="CDP & Data Eng."
              skills={["BlueConic CDP", "Python", "PySpark", "SQL", "SFTP Pipelines", "Data Integration", "Customer Identity Resolution"]}
            />
            <SkillGroup
              color="#2563EB" label="AI & Agents"
              skills={["GitHub Copilot Custom Agents", "Agentic AI", "RAG", "GenAI / LLMs", "Prompt Engineering", "Automated QA"]}
            />
            <SkillGroup
              color="#D97706" label="Marketing Tech."
              skills={["Real-Time Segmentation", "Audience Building", "Trigger Campaigns", "Marketing Automation", "Personalisation", "A/B Testing"]}
            />
            <SkillGroup
              color="#4F46E5" label="Cloud & Analytics"
              skills={["AWS", "Databricks", "Snowflake", "BigQuery", "Power BI", "Tableau"]}
            />
          </div>

          {/* ── Experience ── */}
          <Label color="#4F46E5">Experience</Label>

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
          <Label color="#7C3AED">Education</Label>
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
          <Label color="#D97706">Awards &amp; Publication</Label>
          <p style={{ ...body, marginBottom: "4px" }}>
            <strong>Three-Time CEO Award</strong> (2021, 2023, 2025) &nbsp;·&nbsp;
            <strong>LEAP High-Potential Leadership Program</strong> (2026) &nbsp;·&nbsp;
            <strong>Certificate of Excellence</strong> — Genpact (2019)
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

// force background colours to render in the printed / saved PDF
const printExact: React.CSSProperties = {
  WebkitPrintColorAdjust: "exact",
  printColorAdjust: "exact",
};

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{
      flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: "6px",
      background: hexToTint(color), border: `1px solid ${hexToTint(color, 0.35)}`, ...printExact,
    }}>
      <div style={{ fontSize: "17px", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "7.5px", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "3px" }}>
        {label}
      </div>
    </div>
  );
}

function FlagshipProject() {
  const steps = [
    "Pull Jira story",
    "Build Python + JS",
    "QA + perf review",
    "Push to Bitbucket",
    "Comment & tag QA",
    "Move to Code Review",
  ];
  return (
    <div style={{
      border: "1px solid #DBE5FA", borderLeft: "4px solid #2563EB", borderRadius: "6px",
      background: "#F6F9FF", padding: "13px 15px", marginBottom: "6px", ...printExact,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "4px 8px", marginBottom: "5px" }}>
        <strong style={{ fontSize: "12px", color: "#111", fontWeight: 800 }}>
          Autonomous BlueConic Development Agent
        </strong>
        <span style={{
          fontSize: "8px", fontWeight: 800, color: "#fff", background: "#2563EB",
          padding: "2px 7px", borderRadius: "10px", letterSpacing: "0.04em", textTransform: "uppercase", ...printExact,
        }}>
          2 days → 30 min
        </span>
      </div>
      <p style={{ fontSize: "10px", color: "#333", lineHeight: 1.55, margin: "0 0 9px" }}>
        Built a <strong>custom GitHub Copilot agent</strong> that autonomously delivers BlueConic AI Workbench
        development end-to-end. Grounded it on a self-authored <strong>Markdown knowledge base</strong> — modular
        skill definition files plus BlueConic Python API references — so the agent generates production Python for
        AIWB and the JavaScript powering BlueConic import/export connections, runs its own QA review and performance
        testing, and keeps a human-in-the-loop review gate.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "5px 3px" }}>
        {steps.map((s, i) => (
          <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
            <span style={{
              fontSize: "8.5px", fontWeight: 600, color: "#1E40AF", background: "#E7EFFE",
              border: "1px solid #C7D9F8", padding: "2px 7px", borderRadius: "3px", ...printExact,
            }}>
              {s}
            </span>
            {i < steps.length - 1 && <span style={{ fontSize: "9px", color: "#93B4F0", fontWeight: 700 }}>→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillGroup({ color, label, skills }: { color: string; label: string; skills: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px", width: "112px", flexShrink: 0, paddingTop: "2px" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "2px", background: color, flexShrink: 0, ...printExact }} />
        <span style={{ fontSize: "8.5px", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.2 }}>
          {label}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {skills.map((s) => (
          <span key={s} style={{
            fontSize: "9px", color: "#333", background: "#F3F4F6", border: "1px solid #E5E7EB",
            padding: "2px 7px", borderRadius: "3px", lineHeight: 1.4, ...printExact,
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Label({ children, color = "#222" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 8px" }}>
      <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: color, flexShrink: 0, ...printExact }} />
      <span style={{
        fontSize: "8px", fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#888", whiteSpace: "nowrap",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1.5px", background: "#eee" }} />
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

/* light tinted background from an accent hex (for stat chips) */
function hexToTint(hex: string, alpha = 0.10): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const body: React.CSSProperties = {
  fontSize: "10.5px",
  color: "#333",
  lineHeight: 1.6,
  margin: "0 0 8px",
};
