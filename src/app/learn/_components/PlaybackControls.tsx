"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TOTAL_SCENES, COLORS } from "./constants";
import { useIsMobile } from "./shared/useIsMobile";

interface PlaybackControlsProps {
  scene: number;
  isPlaying: boolean;
  isMuted: boolean;
  onPause: () => void;
  onResume: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReplay: () => void;
  onToggleMute: () => void;
}

// ── Icon components with AnimatePresence-compatible enter/exit ────────────────

function PlayIcon() {
  return (
    <motion.svg
      key="play"
      width="17" height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      initial={{ opacity: 0, scale: 0.55 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.55 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </motion.svg>
  );
}

function PauseIcon() {
  return (
    <motion.svg
      key="pause"
      width="17" height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      initial={{ opacity: 0, scale: 0.55 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.55 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </motion.svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

// ── Speaker / mute icons ──────────────────────────────────────────────────────

function SpeakerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function PlaybackControls({
  scene, isPlaying, isMuted, onPause, onResume, onNext, onPrev, onToggleMute,
}: PlaybackControlsProps) {
  const [appeared, setAppeared] = useState(false);
  const [idle, setIdle] = useState(false);
  const [dockHover, setDockHover] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion() ?? false;

  const isFirst = scene === 0;
  const isLast = scene === TOTAL_SCENES - 1;

  // Initial entrance delay
  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Keep isPlaying accessible inside stable callbacks
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const startIdleTimer = useCallback(() => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => setIdle(true), 2500);
  }, [clearIdleTimer]);

  const onActivity = useCallback(() => {
    setIdle(false);
    if (isPlayingRef.current) startIdleTimer();
  }, [startIdleTimer]);

  // Auto-hide: only when playing and not hovering over dock
  useEffect(() => {
    if (!isPlaying || dockHover) {
      setIdle(false);
      clearIdleTimer();
      return;
    }
    startIdleTimer();
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("touchstart", onActivity, { passive: true });
    return () => {
      clearIdleTimer();
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
    };
  }, [isPlaying, dockHover, startIdleTimer, clearIdleTimer, onActivity]);

  const isHidden = idle && !dockHover;

  // Compute opacity target: not appeared → 0, idle → 0.18, else → 1
  const opacityTarget = !appeared ? 0 : isHidden ? 0.18 : 1;
  const yTarget = appeared ? 0 : 12;

  const btnSize = isMobile ? 48 : 44;
  const playBtnSize = isMobile ? 52 : 48;

  const neutralColor = "rgba(0,0,0,0.45)";
  const neutralHover = "rgba(0,0,0,0.85)";
  const disabledColor = "rgba(0,0,0,0.18)";

  return (
    <motion.div
      animate={{
        opacity: reduced ? 1 : opacityTarget,
        y: reduced ? 0 : yTarget,
      }}
      transition={{
        opacity: { duration: isHidden ? 0.5 : 0.3, ease: "easeOut" },
        y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseEnter={() => setDockHover(true)}
      onMouseLeave={() => {
        setDockHover(false);
        if (isPlayingRef.current) startIdleTimer();
      }}
      style={{
        position: "fixed",
        bottom: isMobile
          ? "calc(20px + env(safe-area-inset-bottom, 0px))"
          : 36,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        willChange: "opacity, transform",
      }}
      role="toolbar"
      aria-label="Presentation controls"
    >
      {/* ── Glass dock ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? 6 : 4,
          padding: isMobile ? "10px 18px" : "10px 22px",
          background: "rgba(255,255,255,0.58)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.72)",
          borderRadius: 24,
          boxShadow: [
            "0 8px 40px rgba(0,0,0,0.09)",
            "0 2px 6px rgba(0,0,0,0.05)",
            "inset 0 1px 0 rgba(255,255,255,0.9)",
          ].join(", "),
        }}
      >
        {/* ── Prev ─────────────────────────────────────────────────────────── */}
        <motion.button
          onClick={isFirst ? undefined : onPrev}
          disabled={isFirst}
          aria-label="Previous scene"
          whileHover={!isFirst && !reduced ? { scale: 1.05 } : undefined}
          whileTap={!isFirst && !reduced ? { scale: 0.93 } : undefined}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: btnSize,
            height: btnSize,
            border: "none",
            background: "transparent",
            cursor: isFirst ? "default" : "pointer",
            color: isFirst ? disabledColor : neutralColor,
            borderRadius: 12,
            flexShrink: 0,
            WebkitTapHighlightColor: "transparent",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!isFirst) (e.currentTarget as HTMLElement).style.color = neutralHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = isFirst ? disabledColor : neutralColor;
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid rgba(37,99,235,0.4)";
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
        >
          <svg
            width="18" height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>

        {/* ── Play / Pause ──────────────────────────────────────────────────── */}
        <motion.button
          onClick={isPlaying ? onPause : onResume}
          aria-label={isPlaying ? "Pause presentation" : "Resume presentation"}
          whileHover={!reduced ? { scale: 1.05 } : undefined}
          whileTap={!reduced ? { scale: 0.93 } : undefined}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: playBtnSize,
            height: playBtnSize,
            border: "none",
            background: COLORS.blue,
            color: "#FFFFFF",
            borderRadius: 14,
            cursor: "pointer",
            flexShrink: 0,
            boxShadow: "0 2px 12px rgba(37,99,235,0.30)",
            WebkitTapHighlightColor: "transparent",
            transition: "box-shadow 0.22s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 22px rgba(37,99,235,0.48)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 12px rgba(37,99,235,0.30)";
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid rgba(37,99,235,0.55)";
            e.currentTarget.style.outlineOffset = "3px";
          }}
          onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying
              ? <PauseIcon key="pause" />
              : <PlayIcon key="play" />
            }
          </AnimatePresence>
        </motion.button>

        {/* ── Next ─────────────────────────────────────────────────────────── */}
        <motion.button
          onClick={isLast ? undefined : onNext}
          disabled={isLast}
          aria-label="Next scene"
          whileHover={!isLast && !reduced ? { scale: 1.05 } : undefined}
          whileTap={!isLast && !reduced ? { scale: 0.93 } : undefined}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: btnSize,
            height: btnSize,
            border: "none",
            background: "transparent",
            cursor: isLast ? "default" : "pointer",
            color: isLast ? disabledColor : neutralColor,
            borderRadius: 12,
            flexShrink: 0,
            WebkitTapHighlightColor: "transparent",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!isLast) (e.currentTarget as HTMLElement).style.color = neutralHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = isLast ? disabledColor : neutralColor;
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid rgba(37,99,235,0.4)";
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
        >
          <svg
            width="18" height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>

        {/* ── Separator + Mute toggle ───────────────────────────────────────── */}
        <div style={{
          width: 1,
          height: 20,
          background: "rgba(0,0,0,0.10)",
          flexShrink: 0,
          marginLeft: isMobile ? 2 : 4,
          marginRight: isMobile ? 2 : 4,
        }} />

        <motion.button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute narration" : "Mute narration"}
          aria-pressed={isMuted}
          whileHover={!reduced ? { scale: 1.05 } : undefined}
          whileTap={!reduced ? { scale: 0.93 } : undefined}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? 40 : 36,
            height: isMobile ? 40 : 36,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: isMuted ? "rgba(0,0,0,0.22)" : neutralColor,
            borderRadius: 10,
            flexShrink: 0,
            WebkitTapHighlightColor: "transparent",
            transition: "color 0.22s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = isMuted ? "rgba(0,0,0,0.45)" : neutralHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = isMuted ? "rgba(0,0,0,0.22)" : neutralColor;
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = "2px solid rgba(37,99,235,0.4)";
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMuted
              ? (
                <motion.span
                  key="muted"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex" }}
                >
                  <MutedIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="speaker"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex" }}
                >
                  <SpeakerIcon />
                </motion.span>
              )
            }
          </AnimatePresence>
        </motion.button>
      </div>


    </motion.div>
  );
}
