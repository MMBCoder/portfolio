"use client";

import { useRagStore, type RagParams } from "./ragStore";
import { rechunkLocal, reembed, rescoreLocal } from "./lib/pipeline";
import { T, eyebrow } from "./theme";

/* ── controls ─────────────────────────────────────────────── */

function Slider({
  label, value, min, max, step, format, onChange, hint,
}: {
  label: string; value: number; min: number; max: number; step: number;
  format?: (v: number) => string; onChange: (v: number) => void; hint?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <label style={{ fontFamily: T.mono, fontSize: 12.5, color: T.fgSec }}>{label}</label>
        <span style={{ fontFamily: T.mono, fontSize: 12.5, color: T.blue, fontWeight: 700 }}>{format ? format(value) : value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: T.violet, cursor: "pointer" }}
      />
      {hint && <p style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "11px 14px", marginBottom: 16, cursor: "pointer",
        background: value ? "rgba(124,58,237,0.06)" : T.inset,
        border: `1px solid ${value ? "rgba(124,58,237,0.45)" : T.border}`, borderRadius: 10,
      }}
    >
      <span style={{ fontFamily: T.mono, fontSize: 12.5, color: T.fgSec }}>{label}</span>
      <span style={{
        width: 34, height: 18, borderRadius: 10, position: "relative", flexShrink: 0,
        background: value ? T.violet : T.borderStrong, transition: "background 0.2s",
      }}>
        <span style={{
          position: "absolute", top: 2, left: value ? 18 : 2,
          width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(15,23,42,0.3)",
        }} />
      </span>
    </button>
  );
}

/* ── panel ────────────────────────────────────────────────── */

export default function ParamsPanel() {
  const params = useRagStore(s => s.params);
  const setParam = useRagStore(s => s.setParam);
  const ingested = useRagStore(s => s.ingested);
  const chunksStale = useRagStore(s => s.chunksStale);
  const hasDoc = useRagStore(s => s.cleanedPages.length > 0);
  const hasQuery = useRagStore(s => s.queryVec !== null);

  const setChunkParam = <K extends keyof RagParams>(k: K, v: RagParams[K]) => {
    setParam(k, v);
    if (hasDoc) rechunkLocal();
  };
  const setRetrievalParam = <K extends keyof RagParams>(k: K, v: RagParams[K]) => {
    setParam(k, v);
    if (hasQuery) rescoreLocal();
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 28 }}>
      <div>
        <p style={{ ...eyebrow, marginBottom: 14, color: T.blue }}>chunking</p>
        <Slider
          label="chunk size" value={params.chunkSize} min={200} max={1600} step={50}
          format={v => `${v} chars`} onChange={v => setChunkParam("chunkSize", v)}
          hint="small = precise retrieval · large = more context"
        />
        <Slider
          label="chunk overlap" value={params.chunkOverlap} min={0} max={300} step={20}
          format={v => `${v} chars`} onChange={v => setChunkParam("chunkOverlap", v)}
          hint="prevents facts being split at boundaries"
        />
        {chunksStale && (
          <button
            onClick={() => reembed()}
            style={{
              width: "100%", padding: "11px 14px", borderRadius: 10, cursor: "pointer",
              background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.5)",
              fontFamily: T.mono, fontSize: 12.5, color: T.amber, fontWeight: 600,
            }}
          >
            ↻ chunks changed — re-embed &amp; re-index
          </button>
        )}
      </div>

      <div>
        <p style={{ ...eyebrow, marginBottom: 14, color: T.cyan }}>retrieval</p>
        <Slider
          label="top-K" value={params.topK} min={1} max={8} step={1}
          onChange={v => setRetrievalParam("topK", v)}
          hint="chunks handed to the LLM"
        />
        <Slider
          label="hybrid α (semantic ↔ keyword)" value={params.hybridAlpha} min={0} max={1} step={0.05}
          format={v => v.toFixed(2)} onChange={v => setRetrievalParam("hybridAlpha", v)}
          hint="1.0 = pure semantic · 0.0 = pure keyword"
        />
        <Slider
          label="similarity threshold" value={params.threshold} min={0} max={0.8} step={0.05}
          format={v => v.toFixed(2)} onChange={v => setRetrievalParam("threshold", v)}
          hint="chunks scoring below are discarded"
        />
        <Toggle label="LLM re-ranking (gpt-5-mini)" value={params.useRerank} onChange={v => setParam("useRerank", v)} />
      </div>

      <div>
        <p style={{ ...eyebrow, marginBottom: 14, color: T.violet }}>generation</p>
        <Slider
          label="max output tokens" value={params.maxTokens} min={128} max={1500} step={64}
          onChange={v => setParam("maxTokens", v)}
        />
        <Slider
          label="context budget" value={params.contextBudget} min={500} max={6000} step={250}
          format={v => `${v} tok`} onChange={v => setParam("contextBudget", v)}
          hint="token cap for retrieved chunks in the prompt"
        />
        <Slider
          label="temperature" value={params.temperature} min={0} max={1.4} step={0.1}
          format={v => v.toFixed(1)} onChange={v => setParam("temperature", v)}
          hint="gpt-5-mini may ignore non-default values"
        />
      </div>

      <div>
        <p style={{ ...eyebrow, marginBottom: 14, color: T.green }}>system prompt</p>
        <textarea
          value={params.systemPrompt}
          onChange={e => setParam("systemPrompt", e.target.value)}
          rows={7}
          spellCheck={false}
          style={{
            width: "100%", resize: "vertical", padding: "12px 14px", borderRadius: 10,
            background: T.inset, border: `1px solid ${T.border}`,
            fontFamily: T.mono, fontSize: 12.5, color: T.fgSec, lineHeight: 1.65, outline: "none",
          }}
        />
        <p style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, marginTop: 5 }}>
          applies to the next question{ingested ? "" : " · ingest a document first"}
        </p>
      </div>
    </div>
  );
}
