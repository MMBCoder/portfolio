"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileUp, ScanText, Eraser, Scissors, Binary, Network, Database,
  MessageCircleQuestion, Radar, ArrowDownWideNarrow, Blocks, Sparkles, Link2, Gauge,
  Check, AlertTriangle, RotateCcw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRagStore, STAGE_IDS, type StageId, type StageState } from "./ragStore";
import { INGESTION_STAGES, QUERY_STAGES, type StageDef } from "./stages";
import { T } from "./theme";

const ICONS: Record<string, LucideIcon> = {
  FileUp, ScanText, Eraser, Scissors, Binary, Network, Database,
  MessageCircleQuestion, Radar, ArrowDownWideNarrow, Blocks, Sparkles, Link2, Gauge,
};

/* ── status dot ───────────────────────────────────────────── */

function StatusBadge({ st }: { st: StageState }) {
  if (st.status === "running") {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        style={{
          width: 16, height: 16, borderRadius: "50%",
          border: "2.5px solid rgba(124,58,237,0.2)", borderTopColor: T.violet,
        }}
      />
    );
  }
  if (st.status === "done") return <Check size={16} color={T.green} strokeWidth={3} />;
  if (st.status === "error") return <AlertTriangle size={15} color={T.red} />;
  if (st.status === "stale") return <RotateCcw size={14} color={T.amber} />;
  return <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.borderStrong }} />;
}

/* ── one node card ────────────────────────────────────────── */

function NodeCard({ def, dimmed }: { def: StageDef; dimmed: boolean }) {
  const st = useRagStore(s => s.stages[def.id]);
  const selected = useRagStore(s => s.selected === def.id);
  const select = useRagStore(s => s.select);
  const Icon = ICONS[def.icon] ?? Sparkles;
  const running = st.status === "running";

  return (
    <motion.button
      layout
      onClick={() => select(selected ? null : def.id)}
      whileHover={{ y: -3 }}
      animate={{ opacity: dimmed && !running && !selected ? 0.45 : 1 }}
      aria-label={`${def.title} — ${st.status}`}
      style={{
        position: "relative", flex: "1 1 0", minWidth: 0,
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
        padding: "14px 14px", textAlign: "left", cursor: "pointer",
        background: selected ? "#F6F2FE" : running ? "#F3F7FF" : T.panel,
        border: `1.5px solid ${selected ? "rgba(124,58,237,0.55)" : running ? "rgba(37,99,235,0.55)" : T.border}`,
        borderRadius: 13,
        boxShadow: running
          ? "0 4px 22px rgba(37,99,235,0.18)"
          : selected ? "0 4px 18px rgba(124,58,237,0.15)" : T.cardShadow,
        transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
      }}
    >
      {running && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{
            position: "absolute", inset: -1.5, borderRadius: 13, pointerEvents: "none",
            border: "1.5px solid rgba(37,99,235,0.55)",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Icon size={18} color={running ? T.blue : selected ? T.violet : T.fgSec} />
        <StatusBadge st={st} />
      </div>
      <div style={{ minWidth: 0, width: "100%" }}>
        <p style={{
          fontFamily: T.disp, fontWeight: 700, fontSize: 14.5, color: T.fg,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {def.title}
        </p>
        <p style={{
          fontFamily: T.mono, fontSize: 11.5, marginTop: 4, letterSpacing: "0.01em",
          color: st.status === "error" ? T.red : st.status === "stale" ? T.amber : st.note ? T.green : T.fgMuted,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%",
        }}>
          {st.status === "error" ? (st.error ?? "failed") : (st.note ?? def.blurb)}
        </p>
      </div>
      <AnimatePresence>
        {typeof st.ms === "number" && st.status === "done" && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", top: -10, right: 8, padding: "2px 8px",
              background: T.panel, border: `1px solid ${T.border}`, borderRadius: 8,
              fontFamily: T.mono, fontSize: 10.5, color: T.fgSec, boxShadow: T.cardShadow,
            }}
          >
            {st.ms >= 1000 ? `${(st.ms / 1000).toFixed(1)}s` : `${st.ms}ms`}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── edge between nodes ───────────────────────────────────── */

function Edge({ active, vertical = false }: { active: boolean; vertical?: boolean }) {
  const size = vertical ? { width: 2.5, height: 28 } : { width: 22, height: 2.5 };
  return (
    <div style={{
      position: "relative", flexShrink: 0, alignSelf: "center",
      ...size,
      background: active ? "rgba(37,99,235,0.4)" : T.borderStrong,
      borderRadius: 2, overflow: "visible",
      transition: "background 0.3s",
    }}>
      {active && (
        <motion.div
          animate={vertical ? { y: [0, 22] } : { x: [0, 16] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: vertical ? 0 : -2.5, left: vertical ? -2.5 : 0,
            width: 7, height: 7, borderRadius: "50%",
            background: T.blue, boxShadow: "0 0 10px rgba(37,99,235,0.7)",
          }}
        />
      )}
    </div>
  );
}

/* ── the canvas ───────────────────────────────────────────── */

function edgeActive(stages: Record<StageId, StageState>, from: StageId, to: StageId): boolean {
  return stages[to].status === "running" && stages[from].status === "done";
}

export default function PipelineCanvas({ isMobile }: { isMobile: boolean }) {
  const stages = useRagStore(s => s.stages);
  const playActive = useRagStore(s => s.play.active);
  const anyRunning = STAGE_IDS.some(id => stages[id].status === "running");
  const dimmed = playActive && anyRunning;

  const Row = ({ defs, label }: { defs: StageDef[]; label: string }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: T.fgMuted }}>
        {label}
      </p>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
      }}>
        {defs.map((def, i) => (
          <div key={def.id} style={{
            display: "flex", flex: "1 1 0", minWidth: 0,
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
          }}>
            <NodeCard def={def} dimmed={dimmed} />
            {i < defs.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Edge vertical={isMobile} active={edgeActive(stages, def.id, defs[i + 1].id)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Row defs={INGESTION_STAGES} label="① Ingestion — document → vector index" />
      {/* connector from index to query */}
      <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", paddingLeft: isMobile ? 0 : 44 }}>
        <Edge vertical active={edgeActive(stages, "index", "query")} />
      </div>
      <Row defs={QUERY_STAGES} label="② Query — question → grounded answer" />
    </div>
  );
}
