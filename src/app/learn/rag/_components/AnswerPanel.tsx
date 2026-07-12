"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useRagStore, STAGE_IDS } from "./ragStore";
import { runQuery } from "./lib/pipeline";
import { SAMPLE_QUESTION } from "./lib/sample";
import { T, eyebrow } from "./theme";

export default function AnswerPanel({ isMobile }: { isMobile: boolean }) {
  const ingested = useRagStore(s => s.ingested);
  const stages = useRagStore(s => s.stages);
  const sentences = useRagStore(s => s.answerSentences);
  const results = useRagStore(s => s.results);
  const chunks = useRagStore(s => s.chunks);
  const hoverChunk = useRagStore(s => s.hoverChunk);
  const setHoverChunk = useRagStore(s => s.setHoverChunk);
  const isSample = useRagStore(s => s.isSample);
  const playActive = useRagStore(s => s.play.active);
  const [text, setText] = useState("");

  const busy = STAGE_IDS.some(id => stages[id].status === "running");
  const canAsk = ingested && !busy && !playActive;

  const ask = (q: string) => {
    const question = q.trim();
    if (!question || !canAsk) return;
    void runQuery(question);
  };

  const byId = new Map(chunks.map(c => [c.id, c]));
  const sources = results.map(id => byId.get(id)).filter(Boolean);

  return (
    <div style={{
      background: T.panel, border: `1px solid ${T.border}`,
      borderRadius: 16, padding: isMobile ? "18px 16px" : "22px 24px",
      boxShadow: T.cardShadow,
    }}>
      <p style={{ ...eyebrow, marginBottom: 14 }}>ask the document</p>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") ask(text); }}
          placeholder={ingested ? "ask anything about the document…" : "ingest a document first"}
          disabled={!canAsk}
          style={{
            flex: 1, padding: "13px 17px", borderRadius: 12, outline: "none",
            background: T.inset, border: `1px solid ${T.border}`,
            fontFamily: T.mono, fontSize: 14, color: T.fg,
            opacity: canAsk ? 1 : 0.55,
          }}
        />
        <button
          onClick={() => ask(text)}
          disabled={!canAsk || !text.trim()}
          aria-label="Ask"
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "0 22px", borderRadius: 12,
            background: canAsk && text.trim() ? T.grad : T.inset,
            border: canAsk && text.trim() ? "none" : `1px solid ${T.border}`,
            cursor: canAsk && text.trim() ? "pointer" : "default",
            fontFamily: T.disp, fontWeight: 700, fontSize: 14.5, color: canAsk && text.trim() ? "#fff" : T.fgMuted,
          }}
        >
          <Send size={15} /> ask
        </button>
      </div>

      {ingested && isSample && sentences.length === 0 && !busy && (
        <button
          onClick={() => { setText(SAMPLE_QUESTION); ask(SAMPLE_QUESTION); }}
          style={{
            marginTop: 12, padding: "9px 16px", borderRadius: 20, cursor: "pointer",
            background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.35)",
            fontFamily: T.mono, fontSize: 12.5, color: T.blue, textAlign: "left",
          }}
        >
          try: “{SAMPLE_QUESTION}”
        </button>
      )}

      {sentences.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
            gap: 16, marginTop: 20,
          }}
        >
          <div style={{
            padding: "18px 20px", borderRadius: 14,
            background: "rgba(5,150,105,0.04)", border: "1px solid rgba(5,150,105,0.28)",
          }}>
            <p style={{ ...eyebrow, color: T.green, marginBottom: 12 }}>grounded answer — hover to trace sources</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: T.fg }}>
              {sentences.map((s, i) => {
                const linked = s.citations.length > 0;
                const hot = linked && s.citations.includes(hoverChunk ?? -1);
                return (
                  <span
                    key={i}
                    onMouseEnter={() => linked && setHoverChunk(s.citations[0])}
                    onMouseLeave={() => setHoverChunk(null)}
                    style={{
                      cursor: linked ? "pointer" : "default",
                      background: hot ? "rgba(5,150,105,0.13)" : "transparent",
                      borderBottom: linked ? `1.5px dotted ${hot ? T.green : "rgba(5,150,105,0.5)"}` : "none",
                      borderRadius: 3, transition: "background 0.15s",
                    }}
                  >
                    {s.text.replace(/\s*\[\d+\]/g, "")}{" "}
                    {s.citations.map(c => (
                      <sup key={c} style={{ fontFamily: T.mono, fontSize: 10.5, color: T.green, fontWeight: 700 }}>[{c}]</sup>
                    ))}{" "}
                  </span>
                );
              })}
            </p>
          </div>

          <div>
            <p style={{ ...eyebrow, marginBottom: 10 }}>sources · {sources.length} chunks</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
              {sources.map(c => {
                const hot = hoverChunk === c!.id;
                return (
                  <div
                    key={c!.id}
                    onMouseEnter={() => setHoverChunk(c!.id)}
                    onMouseLeave={() => setHoverChunk(null)}
                    style={{
                      padding: "11px 13px", borderRadius: 10,
                      background: hot ? "rgba(5,150,105,0.07)" : T.inset,
                      border: `1px solid ${hot ? "rgba(5,150,105,0.5)" : T.border}`,
                      transition: "all 0.15s",
                    }}
                  >
                    <p style={{ fontFamily: T.mono, fontSize: 11.5, fontWeight: 700, color: hot ? T.green : T.blue, marginBottom: 5 }}>
                      chunk {c!.id} · page {c!.page}
                    </p>
                    <p style={{ fontFamily: T.mono, fontSize: 12, color: T.fgSec, lineHeight: 1.6 }}>
                      {hot ? c!.text.slice(0, 340) : c!.text.slice(0, 110) + "…"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
