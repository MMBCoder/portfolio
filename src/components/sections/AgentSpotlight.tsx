"use client";

import { motion } from "framer-motion";

const fd = "var(--font-space-grotesk), sans-serif";
const fm = "var(--font-jetbrains-mono), monospace";

/* The autonomous BlueConic development agent — rendered as a unique
   "engineering blueprint" section with an animated flow diagram.
   Distinct from the dark flagship spotlight that follows it. */

const FLOW = [
  { icon: "📋", tag: "input",   title: "Pull Jira Story",       desc: "Agent picks up the assigned development story straight from Jira.",                 color: "#2563EB" },
  { icon: "🧠", tag: "reason",  title: "Copilot Agent",         desc: "Custom GitHub Copilot agent plans the build, grounded on its knowledge base.",       color: "#4F46E5", hero: true },
  { icon: "⚙️", tag: "build",   title: "Generate Code",         desc: "Writes AIWB Python + the JavaScript for BlueConic import / export connections.",     color: "#7C3AED" },
  { icon: "🔬", tag: "verify",  title: "QA & Performance",      desc: "Runs its own code review and performance tests before any handoff.",                 color: "#0D9488" },
  { icon: "🔀", tag: "ship",    title: "Push to Bitbucket",     desc: "Commits the branch for review — the quality gate stays human.",                      color: "#0891B2" },
  { icon: "💬", tag: "handoff", title: "Update Jira",           desc: "Comments status, tags the QA reviewer, moves the story to Code Review.",             color: "#D97706" },
];

export default function AgentSpotlight() {
  return (
    <section
      id="agent"
      style={{
        position: "relative",
        background: "#FBFCFF",
        borderTop: "1px solid #E8E8E8",
        padding: "clamp(64px,8vw,120px) clamp(20px,4vw,80px)",
        overflow: "hidden",
      }}
    >
      {/* blueprint dotted grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(#D6DEF5 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        opacity: 0.5,
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ marginBottom: "clamp(36px,4vw,56px)", maxWidth: 680 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4F46E5", boxShadow: "0 0 0 4px rgba(79,70,229,0.15)" }} />
            <p style={{ fontFamily: fm, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#4F46E5", fontWeight: 700, margin: 0 }}>
              Newest Flagship · Autonomous Engineering
            </p>
          </div>
          <h2 style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(2rem,4.5vw,4rem)", letterSpacing: "-0.04em", color: "#0B1220", lineHeight: 1, textTransform: "lowercase", marginBottom: 18 }}>
            the agent that ships<br />blueconic code.
          </h2>
          <p style={{ fontSize: "clamp(14px,1.3vw,17px)", color: "#556", lineHeight: 1.75, maxWidth: 620 }}>
            A custom GitHub Copilot agent that takes a Jira story and delivers reviewed, tested BlueConic
            development end-to-end — writing the AIWB Python and the connection JavaScript, checking its own
            work, and handing a clean branch back to a human. A full cycle that used to take two days now
            finishes in under thirty minutes.
          </p>
        </motion.div>

        {/* ── Before / After band ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="agent-ba"
          style={{
            display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
            gap: "clamp(16px,3vw,40px)", marginBottom: "clamp(40px,5vw,64px)",
            padding: "clamp(22px,3vw,34px)", borderRadius: 18,
            background: "linear-gradient(120deg,#0B1220 0%,#1B1E4A 100%)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>before</div>
            <div style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "-0.04em", lineHeight: 1, textDecoration: "line-through", textDecorationColor: "rgba(239,68,68,0.7)", textDecorationThickness: 3 }}>
              2 days
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>manual dev cycle</div>
          </div>

          <div aria-hidden style={{ fontFamily: fd, fontSize: "clamp(24px,3vw,40px)", color: "#60A5FA", fontWeight: 900 }}>→</div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 10 }}>after</div>
            <div style={{ fontFamily: fd, fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#FFFFFF", letterSpacing: "-0.04em", lineHeight: 1 }}>
              &lt; 30 min
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>agent-driven, human-reviewed</div>
          </div>
        </motion.div>

        {/* ── Knowledge base feeder ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }} viewport={{ once: true }}
          className="agent-kb"
          style={{
            display: "flex", alignItems: "center", gap: "clamp(14px,2vw,24px)", flexWrap: "wrap",
            padding: "18px 22px", borderRadius: 14, marginBottom: 14,
            background: "#FFFFFF", border: "1px solid #E5E9F5",
            boxShadow: "0 1px 3px rgba(16,24,64,0.05)",
          }}
        >
          <div style={{ fontSize: 30, lineHeight: 1 }}>📚</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#4F46E5", fontWeight: 700, marginBottom: 5 }}>
              the agent&apos;s grounding · markdown knowledge base
            </div>
            <p style={{ fontSize: 13.5, color: "#556", lineHeight: 1.6, margin: 0 }}>
              Self-authored <strong style={{ color: "#0B1220" }}>skill definition files</strong> and{" "}
              <strong style={{ color: "#0B1220" }}>BlueConic Python API references</strong> — structured as Markdown so the agent
              reasons from a curated, versioned source of truth rather than guessing.
            </p>
          </div>
          <div aria-hidden className="agent-kb-arrow" style={{ fontFamily: fd, fontSize: 22, color: "#C7CEE8", fontWeight: 900 }}>↓</div>
        </motion.div>

        {/* ── Flow diagram ── */}
        <div className="agent-flow">
          {FLOW.map((n, i) => (
            <div key={n.title} className="agent-flow-item" style={{ display: "contents" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.09 }} viewport={{ once: true }}
                className="agent-node"
                style={{
                  position: "relative",
                  background: n.hero ? "linear-gradient(160deg,#4F46E5 0%,#6366F1 100%)" : "#FFFFFF",
                  border: n.hero ? "none" : "1px solid #E5E9F5",
                  borderRadius: 14,
                  padding: "18px 16px 16px",
                  boxShadow: n.hero ? "0 10px 30px rgba(79,70,229,0.30)" : "0 1px 3px rgba(16,24,64,0.05)",
                }}
              >
                {/* top accent */}
                {!n.hero && <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: 3, borderRadius: 3, background: n.color }} />}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{n.icon}</span>
                  <span style={{
                    fontFamily: fm, fontSize: 8.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: n.hero ? "rgba(255,255,255,0.75)" : n.color,
                    background: n.hero ? "rgba(255,255,255,0.15)" : `${n.color}14`,
                    padding: "3px 7px", borderRadius: 20,
                  }}>
                    {String(i + 1).padStart(2, "0")} · {n.tag}
                  </span>
                </div>
                <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", color: n.hero ? "#FFFFFF" : "#0B1220", marginBottom: 6 }}>
                  {n.title}
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: n.hero ? "rgba(255,255,255,0.85)" : "#667", margin: 0 }}>
                  {n.desc}
                </p>
              </motion.div>

              {i < FLOW.length - 1 && (
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.09 + 0.15 }} viewport={{ once: true }}
                  className="agent-conn"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#A9B4E0", fontFamily: fd, fontWeight: 900, fontSize: 20 }}
                >
                  <span className="agent-conn-h">→</span>
                  <span className="agent-conn-v">↓</span>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* ── Human-in-the-loop + tech ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: "clamp(28px,3.5vw,44px)" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: fm, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
            color: "#0D9488", background: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.3)",
            padding: "8px 14px", borderRadius: 20,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0D9488" }} />
            human-in-the-loop review gate preserved
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["GitHub Copilot", "Custom Agent", "Python", "JavaScript", "BlueConic AIWB", "Jira", "Bitbucket", "Markdown KB"].map(t => (
              <span key={t} style={{ fontFamily: fm, fontSize: 11, color: "#556", background: "#FFFFFF", border: "1px solid #E5E9F5", padding: "6px 11px", borderRadius: 6 }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* layout: horizontal flow on desktop, vertical on mobile */}
      <style>{`
        .agent-flow { display: flex; flex-wrap: wrap; align-items: stretch; gap: 4px 0; }
        .agent-flow-item { display: contents; }
        .agent-node { flex: 1 1 150px; min-width: 150px; height: 100%; }
        .agent-conn { flex: 0 0 auto; align-self: center; padding: 0 5px; }
        .agent-conn-v { display: none; }
        @media (max-width: 620px) {
          .agent-flow { flex-direction: column; }
          .agent-node { flex: 1 1 auto; width: 100%; }
          .agent-conn { padding: 6px 0; }
          .agent-conn-h { display: none; }
          .agent-conn-v { display: inline; }
          .agent-ba { grid-template-columns: 1fr !important; }
          .agent-ba > div:nth-child(2) { transform: rotate(90deg); }
          .agent-kb-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}
