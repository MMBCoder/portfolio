"use client";

import { motion } from "framer-motion";

const fd = "var(--font-space-grotesk), sans-serif";

/* Autonomous BlueConic development agent — a polished, studio-style
   feature block: one accent colour, custom line icons (no emoji),
   clean geometric flow nodes with subtle depth. */

const ACCENT = "#2563EB";
const ACCENT_SOFT = "#EEF3FF";
const INK = "#0F172A";
const BODY = "#475569";
const MUTE = "#94A3B8";
const LINE = "#E6E9EF";
const SHADOW = "0 1px 2px rgba(15,23,42,0.05), 0 10px 30px rgba(15,23,42,0.06)";

/* ── custom line icons (consistent 1.6 stroke, currentColor) ── */
function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "ticket": return (<svg {...common}><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 6v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-6V7Z" /><path d="M14 5v14" strokeDasharray="2 2" /></svg>);
    case "agent": return (<svg {...common}><rect x="6" y="6" width="12" height="12" rx="2.5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /><circle cx="12" cy="12" r="2" /></svg>);
    case "code": return (<svg {...common}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" /></svg>);
    case "check": return (<svg {...common}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="m9 14 2 2 4-4" /></svg>);
    case "branch": return (<svg {...common}><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7M6 15.5A9 9 0 0 0 15.5 8" /></svg>);
    case "comment": return (<svg {...common}><path d="M20 4H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4v3l4-3h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" /><path d="M8 9h8M8 12.5h5" /></svg>);
    case "layers": return (<svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5M3 16.5 12 21l9-4.5" /></svg>);
    default: return null;
  }
}

function Chevron() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>);
}

const FLOW = [
  { icon: "ticket",  tag: "Input",   title: "Pull the Jira story",     desc: "The agent picks up the assigned development story from Jira." },
  { icon: "agent",   tag: "Reason",  title: "GitHub Copilot agent",    desc: "Plans the build, grounded on its Markdown knowledge base.", hero: true },
  { icon: "code",    tag: "Build",   title: "Generate the code",       desc: "Writes the AIWB Python and the BlueConic connection JavaScript." },
  { icon: "check",   tag: "Verify",  title: "QA & performance",        desc: "Reviews and performance-tests its own output before handoff." },
  { icon: "branch",  tag: "Ship",    title: "Push to Bitbucket",       desc: "Raises a branch for a person to review — the gate stays human." },
  { icon: "comment", tag: "Hand off", title: "Update the Jira story",  desc: "Comments status, tags the QA reviewer, moves it to Code Review." },
];

export default function AgentSpotlight() {
  return (
    <section id="agent" style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8E8", padding: "clamp(64px,8vw,120px) clamp(20px,4vw,80px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ maxWidth: 720, marginBottom: "clamp(36px,4vw,56px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ width: 28, height: 2, background: ACCENT, borderRadius: 2 }} />
            <span style={{ fontFamily: fd, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>
              Featured build · Agentic AI
            </span>
          </div>
          <h2 style={{ fontFamily: fd, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,3.4rem)", letterSpacing: "-0.03em", color: INK, lineHeight: 1.08, marginBottom: 20 }}>
            The agent that ships BlueConic code.
          </h2>
          <p style={{ fontSize: "clamp(15px,1.3vw,17px)", color: BODY, lineHeight: 1.75, maxWidth: 640 }}>
            A custom GitHub Copilot agent takes a Jira story and delivers reviewed, tested BlueConic development
            end-to-end — writing the AIWB Python and the connection JavaScript, checking its own work, and handing
            a clean branch back to a person. A cycle that used to take two days now finishes in under thirty minutes.
          </p>
        </motion.div>

        {/* ── Flow diagram ── */}
        <div className="ag-flow">
          {FLOW.map((n, i) => (
            <div key={n.title} className="ag-item">
              <motion.div
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }} viewport={{ once: true }}
                className="ag-node"
                style={{
                  background: n.hero ? ACCENT : "#FFFFFF",
                  border: `1px solid ${n.hero ? ACCENT : LINE}`,
                  borderRadius: 16,
                  padding: "18px 16px",
                  boxShadow: n.hero ? "0 8px 26px rgba(37,99,235,0.28)" : SHADOW,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{
                    width: 40, height: 40, borderRadius: 11, display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: n.hero ? "rgba(255,255,255,0.16)" : ACCENT_SOFT,
                    color: n.hero ? "#FFFFFF" : ACCENT,
                  }}>
                    <Icon name={n.icon} />
                  </span>
                  <span style={{ fontFamily: fd, fontSize: 12, fontWeight: 700, color: n.hero ? "rgba(255,255,255,0.7)" : MUTE }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div style={{ fontFamily: fd, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: n.hero ? "rgba(255,255,255,0.75)" : ACCENT, marginBottom: 7 }}>
                  {n.tag}
                </div>
                <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 15.5, letterSpacing: "-0.01em", color: n.hero ? "#FFFFFF" : INK, marginBottom: 6, lineHeight: 1.25 }}>
                  {n.title}
                </div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: n.hero ? "rgba(255,255,255,0.85)" : BODY, margin: 0 }}>
                  {n.desc}
                </p>
              </motion.div>

              {i < FLOW.length - 1 && (
                <div aria-hidden className="ag-conn" style={{ color: "#C3CBDA" }}>
                  <span className="ag-conn-h"><Chevron /></span>
                  <span className="ag-conn-v"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Supporting cards: knowledge base + impact ── */}
        <div className="ag-cards" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "clamp(16px,2vw,24px)", marginTop: "clamp(28px,3.5vw,44px)" }}>
          {/* Knowledge base */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
            style={{ display: "flex", gap: 18, padding: "clamp(22px,2.4vw,30px)", background: "#FFFFFF", border: `1px solid ${LINE}`, borderRadius: 16, boxShadow: SHADOW }}
          >
            <span style={{ width: 44, height: 44, borderRadius: 12, background: ACCENT_SOFT, color: ACCENT, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="layers" size={24} />
            </span>
            <div>
              <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 16, color: INK, marginBottom: 8, letterSpacing: "-0.01em" }}>
                Grounded on a written knowledge base
              </div>
              <p style={{ fontSize: 14, color: BODY, lineHeight: 1.65, margin: 0 }}>
                Self-authored skill definition files and BlueConic Python API references, kept as structured Markdown —
                so the agent reasons from a curated, version-controlled source of truth rather than guessing.
              </p>
            </div>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} viewport={{ once: true }}
            style={{ padding: "clamp(22px,2.4vw,30px)", background: INK, borderRadius: 16, boxShadow: SHADOW }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ fontFamily: fd, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "rgba(255,255,255,0.45)", letterSpacing: "-0.03em", textDecoration: "line-through", textDecorationColor: "rgba(148,163,184,0.6)" }}>
                2 days
              </span>
              <span style={{ color: "#60A5FA" }}><Chevron /></span>
              <span style={{ fontFamily: fd, fontWeight: 800, fontSize: "clamp(1.8rem,3.4vw,2.6rem)", color: "#FFFFFF", letterSpacing: "-0.03em" }}>
                under 30 min
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
              Per development cycle — with a person still reviewing and signing off on every change before it ships.
            </p>
          </motion.div>
        </div>

        {/* ── Tech ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "clamp(24px,3vw,36px)" }}
        >
          {["GitHub Copilot", "Custom agent", "Python", "JavaScript", "BlueConic AIWB", "Jira", "Bitbucket", "Markdown KB"].map(t => (
            <span key={t} style={{ fontFamily: fd, fontSize: 12.5, fontWeight: 500, color: BODY, background: "#F6F7F9", border: `1px solid ${LINE}`, padding: "7px 13px", borderRadius: 8 }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        .ag-flow { display: flex; flex-wrap: wrap; align-items: stretch; gap: 8px 0; }
        .ag-item { display: contents; }
        .ag-node { flex: 1 1 155px; min-width: 155px; height: 100%; }
        .ag-conn { flex: 0 0 auto; align-self: center; display: flex; align-items: center; justify-content: center; padding: 0 6px; }
        .ag-conn-v { display: none; }
        @media (max-width: 640px) {
          .ag-flow { flex-direction: column; }
          .ag-node { flex: 1 1 auto; width: 100%; }
          .ag-conn { padding: 6px 0; }
          .ag-conn-h { display: none; }
          .ag-conn-v { display: inline-flex; }
          .ag-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
