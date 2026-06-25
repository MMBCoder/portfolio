"use client";

import { motion } from "framer-motion";
import { TOTAL_SCENES, COLORS } from "./constants";

interface PlaybackControlsProps {
  scene: number;
  isPlaying: boolean;
  onPause: () => void;
  onResume: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReplay: () => void;
}

const BTN_BASE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid rgba(229,229,229,0.8)",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  cursor: "pointer",
  color: COLORS.fg,
  transition: "background 0.15s, border-color 0.15s",
  flexShrink: 0,
};

interface IconBtnProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  primary?: boolean;
  children: React.ReactNode;
}

function IconBtn({ onClick, label, disabled = false, primary = false, children }: IconBtnProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.08 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      style={{
        ...BTN_BASE,
        ...(primary ? {
          background: COLORS.blue,
          borderColor: COLORS.blue,
          color: "#FFFFFF",
          width: 44,
          height: 44,
        } : {}),
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}

export default function PlaybackControls({
  scene, isPlaying, onPause, onResume, onNext, onPrev, onReplay,
}: PlaybackControlsProps) {
  const isFirst = scene === 0;
  const isLast = scene === TOTAL_SCENES - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(229,229,229,0.8)",
        borderRadius: 40,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
      role="toolbar"
      aria-label="Playback controls"
    >
      {/* Replay */}
      <IconBtn onClick={onReplay} label="Replay from beginning">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 .49-3" />
        </svg>
      </IconBtn>

      {/* Prev */}
      <IconBtn onClick={onPrev} label="Previous scene" disabled={isFirst}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </IconBtn>

      {/* Play / Pause (primary) */}
      <IconBtn
        onClick={isPlaying ? onPause : onResume}
        label={isPlaying ? "Pause" : "Play"}
        primary
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </IconBtn>

      {/* Next */}
      <IconBtn onClick={onNext} label="Next scene" disabled={isLast}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </IconBtn>

      {/* Keyboard hint — desktop only */}
      <div
        className="hidden md:flex"
        style={{ alignItems: "center", gap: 4, marginLeft: 4, paddingLeft: 10, borderLeft: "1px solid #E5E5E5" }}
      >
        {["←", "Space", "→"].map((key) => (
          <kbd key={key} style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 10, color: "#888", background: "#F7F7F7",
            border: "1px solid #E5E5E5", borderRadius: 4,
            padding: "2px 5px", lineHeight: 1.4,
          }}>
            {key}
          </kbd>
        ))}
      </div>
    </motion.div>
  );
}
