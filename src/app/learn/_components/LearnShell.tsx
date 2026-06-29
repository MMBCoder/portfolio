"use client";

import { useReducer, useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOTAL_SCENES, SCENE_DURATIONS, SCENE_TRANSITION_MS, SCENE_META } from "./constants";
import SceneManager from "./SceneManager";
import ProgressBar from "./ProgressBar";
import PlaybackControls from "./PlaybackControls";
import SceneLabel from "./SceneLabel";
import { useNarration } from "./useNarration";

// ─── State ───────────────────────────────────────────────────────────────────

interface PlaybackState {
  scene: number;
  isPlaying: boolean;
  isTransitioning: boolean;
}

type Action =
  | { type: "NEXT_SCENE" }
  | { type: "PREV_SCENE" }
  | { type: "GOTO_SCENE"; scene: number }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "REPLAY" }
  | { type: "TRANSITION_END" };

function reducer(state: PlaybackState, action: Action): PlaybackState {
  const lastScene = TOTAL_SCENES - 1;

  switch (action.type) {
    case "NEXT_SCENE":
      if (state.scene >= lastScene || state.isTransitioning) return state;
      return { ...state, scene: state.scene + 1, isTransitioning: true };

    case "PREV_SCENE":
      if (state.scene <= 0 || state.isTransitioning) return state;
      return { ...state, scene: state.scene - 1, isTransitioning: true };

    case "GOTO_SCENE":
      if (action.scene < 0 || action.scene >= TOTAL_SCENES || state.isTransitioning) return state;
      return { ...state, scene: action.scene, isTransitioning: true };

    case "PAUSE":
      return { ...state, isPlaying: false };

    case "RESUME":
      return { ...state, isPlaying: true };

    case "REPLAY":
      return { scene: 0, isPlaying: true, isTransitioning: true };

    case "TRANSITION_END":
      return { ...state, isTransitioning: false };

    default:
      return state;
  }
}

const INITIAL_STATE: PlaybackState = {
  scene: 0,
  isPlaying: false, // paused until user dismisses intro overlay
  isTransitioning: false,
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LearnShell() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isMuted, setIsMuted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Narration — plays voice-over for each scene automatically
  const { triggerManualNav } = useNarration(state.scene, state.isPlaying, isMuted);

  const handleToggleMute = useCallback(() => setIsMuted(prev => !prev), []);

  const handleStartExperience = useCallback(() => {
    setShowIntro(false);
    dispatch({ type: "RESUME" });
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-advance timer
  useEffect(() => {
    clearTimer();

    const duration = SCENE_DURATIONS[state.scene];
    if (!state.isPlaying || duration === 0 || state.isTransitioning) return;

    timerRef.current = setTimeout(() => {
      dispatch({ type: "NEXT_SCENE" });
    }, duration);

    return clearTimer;
  }, [state.scene, state.isPlaying, state.isTransitioning, clearTimer]);

  // Clear transitioning flag after animation completes
  useEffect(() => {
    if (!state.isTransitioning) return;
    const id = setTimeout(() => dispatch({ type: "TRANSITION_END" }), SCENE_TRANSITION_MS + 50);
    return () => clearTimeout(id);
  }, [state.isTransitioning]);

  // Keyboard bindings
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          triggerManualNav();
          dispatch({ type: "NEXT_SCENE" });
          break;
        case "ArrowLeft":
          e.preventDefault();
          triggerManualNav();
          dispatch({ type: "PREV_SCENE" });
          break;
        case " ":
          e.preventDefault();
          dispatch({ type: state.isPlaying ? "PAUSE" : "RESUME" });
          break;
        case "r":
        case "R":
          e.preventDefault();
          triggerManualNav();
          dispatch({ type: "REPLAY" });
          break;
        default:
          if (e.key >= "1" && e.key <= "9") {
            const idx = parseInt(e.key, 10) - 1;
            if (idx < TOTAL_SCENES) {
              triggerManualNav();
              dispatch({ type: "GOTO_SCENE", scene: idx });
            }
          }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state.isPlaying, triggerManualNav]);

  // Touch swipe bindings
  useEffect(() => {
    let touchStartX = 0;
    const SWIPE_THRESHOLD = 60;

    const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      triggerManualNav();
      dispatch({ type: dx > 0 ? "NEXT_SCENE" : "PREV_SCENE" });
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [triggerManualNav]);

  const handlePause = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const handleResume = useCallback(() => dispatch({ type: "RESUME" }), []);
  const handleNext = useCallback(() => {
    triggerManualNav();
    dispatch({ type: "NEXT_SCENE" });
  }, [triggerManualNav]);
  const handlePrev = useCallback(() => {
    triggerManualNav();
    dispatch({ type: "PREV_SCENE" });
  }, [triggerManualNav]);
  const handleReplay = useCallback(() => {
    triggerManualNav();
    dispatch({ type: "REPLAY" });
  }, [triggerManualNav]);
  const handleGoto = useCallback((s: number) => {
    triggerManualNav();
    dispatch({ type: "GOTO_SCENE", scene: s });
  }, [triggerManualNav]);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        paddingTop: "68px",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
      aria-label="Interactive CDP and AI learning experience"
    >
      {/* Intro overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 50,
              background: "linear-gradient(135deg, #0b1640 0%, #111827 60%, #0f172a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{ textAlign: "center", maxWidth: "520px" }}
            >
              <p style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#2563EB",
                marginBottom: "16px",
                fontWeight: 700,
              }}>
                Interactive Experience
              </p>
              <h1 style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                lineHeight: 1,
                marginBottom: "16px",
                textTransform: "lowercase",
              }}>
                cdp & ai demo.
              </h1>
              <p style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}>
                An 11-scene interactive walkthrough of how enterprise AI and Customer Data Platform technology transforms financial services.
              </p>

              {/* Keyboard shortcuts */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}>
                {[
                  { key: "→ / ←", label: "navigate" },
                  { key: "space", label: "play / pause" },
                  { key: "R", label: "replay" },
                ].map(({ key, label }) => (
                  <div key={key} style={{ textAlign: "center" }}>
                    <kbd style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "6px",
                    }}>
                      {key}
                    </kbd>
                    <p style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                    }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={handleStartExperience}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "14px 36px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                }}
              >
                start experience →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Scene ${state.scene + 1} of ${TOTAL_SCENES}`}
      </div>

      <ProgressBar
        scene={state.scene}
        isPlaying={state.isPlaying}
        onGoto={handleGoto}
      />

      <SceneLabel scene={state.scene} />

      <SceneManager
        scene={state.scene}
        isPlaying={state.isPlaying}
        isTransitioning={state.isTransitioning}
      />

      <PlaybackControls
        scene={state.scene}
        isPlaying={state.isPlaying}
        isMuted={isMuted}
        onPause={handlePause}
        onResume={handleResume}
        onNext={handleNext}
        onPrev={handlePrev}
        onReplay={handleReplay}
        onToggleMute={handleToggleMute}
      />
    </main>
  );
}
