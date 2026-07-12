"use client";

import { motion } from "framer-motion";
import { useRagStore, STAGE_IDS } from "./ragStore";
import { STAGE_BY_ID } from "./stages";
import { T, eyebrow } from "./theme";

function Tile({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{
      padding: "15px 17px", borderRadius: 12,
      background: T.panel, border: `1px solid ${T.border}`, boxShadow: T.cardShadow,
    }}>
      <p style={{ ...eyebrow, fontSize: 11, marginBottom: 7 }}>{label}</p>
      <p style={{ fontFamily: T.disp, fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em", color: color ?? T.fg }}>{value}</p>
      {sub && <p style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

export default function MetricsPanel() {
  const stages = useRagStore(s => s.stages);
  const usage = useRagStore(s => s.usage);
  const chunks = useRagStore(s => s.chunks);
  const results = useRagStore(s => s.results);
  const promptBlocks = useRagStore(s => s.promptBlocks);
  const evalScores = useRagStore(s => s.evalScores);
  const params = useRagStore(s => s.params);

  const timed = STAGE_IDS.filter(id => typeof stages[id].ms === "number");
  const maxMs = Math.max(...timed.map(id => stages[id].ms!), 1);
  const totalMs = timed.reduce((n, id) => n + stages[id].ms!, 0);
  const ctxTokens = promptBlocks[1]?.tokens ?? 0;
  const ctxUtil = ctxTokens ? Math.round((ctxTokens / params.contextBudget) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        <Tile label="pipeline time" value={totalMs ? `${(totalMs / 1000).toFixed(1)}s` : "—"} sub={`${timed.length}/14 stages timed`} />
        <Tile label="chunks generated" value={chunks.length ? String(chunks.length) : "—"} sub={chunks.length ? `~${Math.round(chunks.reduce((n, c) => n + c.tokens, 0) / chunks.length)} tok avg` : undefined} />
        <Tile label="chunks retrieved" value={results.length ? String(results.length) : "—"} sub={results.length ? `top-${params.topK} · α ${params.hybridAlpha.toFixed(2)}` : undefined} color={T.cyan} />
        <Tile label="context utilization" value={ctxTokens ? `${ctxUtil}%` : "—"} sub={ctxTokens ? `${ctxTokens} / ${params.contextBudget} tok` : undefined} color={T.violet} />
        <Tile label="tokens in / out" value={usage.promptTokens || usage.completionTokens ? `${usage.promptTokens.toLocaleString()} / ${usage.completionTokens.toLocaleString()}` : "—"} sub={`embeddings ${usage.embedTokens.toLocaleString()} tok`} />
        <Tile label="session cost (est.)" value={usage.costUSD ? `$${usage.costUSD.toFixed(5)}` : "—"} sub="openai list pricing" color={T.green} />
        {evalScores && (
          <>
            <Tile label="faithfulness" value={String(evalScores.faithfulness)} color={evalScores.faithfulness >= 70 ? T.green : T.amber} />
            <Tile
              label="hallucination risk" value={String(evalScores.hallucinationRisk)}
              color={evalScores.hallucinationRisk <= 30 ? T.green : evalScores.hallucinationRisk <= 55 ? T.amber : T.red}
            />
          </>
        )}
      </div>

      {timed.length > 0 && (
        <div>
          <p style={{ ...eyebrow, marginBottom: 12 }}>stage latency</p>
          {timed.map(id => (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 7 }}>
              <span style={{ fontFamily: T.mono, fontSize: 11.5, color: T.fgSec, width: 130, flexShrink: 0 }}>
                {STAGE_BY_ID[id].title.toLowerCase()}
              </span>
              <div style={{ flex: 1, height: 9, background: "rgba(15,23,42,0.07)", borderRadius: 5, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stages[id].ms! / maxMs) * 100}%` }}
                  style={{
                    height: "100%", borderRadius: 5,
                    background: stages[id].ms! > 2000 ? T.amber : STAGE_BY_ID[id].group === "ingestion" ? T.blue : T.violet,
                  }}
                />
              </div>
              <span style={{ fontFamily: T.mono, fontSize: 11.5, color: T.fgMuted, width: 58, textAlign: "right" }}>
                {stages[id].ms! >= 1000 ? `${(stages[id].ms! / 1000).toFixed(1)}s` : `${stages[id].ms}ms`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
