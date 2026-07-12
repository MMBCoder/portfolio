"use client";

import { useReducer, useEffect, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOTAL_SCENES, SCENE_DURATIONS, SCENE_TRANSITION_MS, SCENE_META } from "./constants";
import SceneManager from "./SceneManager";
import ProgressBar from "./ProgressBar";
import PlaybackControls from "./PlaybackControls";
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
      if (showIntro) return;
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
  }, [state.isPlaying, triggerManualNav, showIntro]);

  // Touch swipe bindings
  useEffect(() => {
    let touchStartX = 0;
    const SWIPE_THRESHOLD = 60;

    const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      if (showIntro) return;
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
  }, [triggerManualNav, showIntro]);

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
              background: "#F1F2F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              overflow: "auto",
            }}
          >
            {/* Ambient blue glow */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 50% at 72% 35%, rgba(37,99,235,0.08), transparent 70%)",
            }} />

            <div className="learn-intro-grid" style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(32px,5vw,72px)",
              alignItems: "center",
              maxWidth: "1060px",
              width: "100%",
            }}>

              {/* ── Left: copy ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
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
                  fontSize: "clamp(1.9rem, 4vw, 3.1rem)",
                  letterSpacing: "-0.04em",
                  color: "#111111",
                  lineHeight: 1.02,
                  marginBottom: "18px",
                }}>
                  CDP — Customer<br />Journey Demo
                </h1>
                <p style={{
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  color: "#555555",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                  maxWidth: "440px",
                }}>
                  Follow a credit card customer from first acquisition through activation, engagement and lifetime growth — and see how an enterprise Customer Data Platform and AI power every step of the journey.
                </p>

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
                    boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                  }}
                >
                  start experience →
                </motion.button>

                <a
                  href="/learn/rag"
                  style={{
                    display: "inline-block",
                    marginTop: "16px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "#555555",
                    textDecoration: "none",
                    borderBottom: "1px dotted #999999",
                    paddingBottom: "2px",
                  }}
                >
                  new · explore the RAG pipeline visualizer →
                </a>
              </motion.div>

              {/* ── Right: 3D credit card + lifecycle journey ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}
              >
                {/* 3D floating credit card */}
                <div style={{ perspective: "1200px" }}>
                  <motion.div
                    animate={{ rotateY: [-10, 10, -10], rotateX: [5, -4, 5], y: [0, -8, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "min(340px, 72vw)",
                      aspectRatio: "1.586",
                      borderRadius: "18px",
                      background: "linear-gradient(125deg, #0E2A6E 0%, #123A9E 45%, #2563EB 100%)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      boxShadow: "0 24px 48px rgba(15,23,42,0.25), 0 8px 32px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
                      transformStyle: "preserve-3d",
                      position: "relative",
                      padding: "clamp(16px,2vw,22px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      overflow: "hidden",
                    }}
                  >
                    {/* sheen */}
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.09) 48%, transparent 62%)",
                    }} />

                    {/* Top row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        fontWeight: 700, fontSize: "12px", color: "rgba(255,255,255,0.9)",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                      }}>
                        Premier Card
                      </span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="19.5" r="0.8" fill="rgba(255,255,255,0.7)"/>
                      </svg>
                    </div>

                    {/* Chip */}
                    <div style={{
                      width: "38px", height: "28px", borderRadius: "6px",
                      background: "linear-gradient(135deg, #E8C56A 0%, #C9A445 60%, #E8C56A 100%)",
                      border: "1px solid rgba(0,0,0,0.25)",
                    }} />

                    {/* Number */}
                    <div style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "clamp(14px,1.6vw,17px)", color: "rgba(255,255,255,0.92)",
                      letterSpacing: "0.14em",
                    }}>
                      ••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;2214
                    </div>

                    {/* Bottom row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "7px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "3px" }}>Card Holder</div>
                        <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: "12px", color: "#FFFFFF", letterSpacing: "0.06em" }}>MIRZA M BAIG</div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
                        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", marginLeft: "-9px" }} />
                      </div>
                    </div>
                  </motion.div>

                  {/* floor glow */}
                  <div style={{
                    width: "70%", height: "18px", margin: "26px auto 0",
                    background: "radial-gradient(ellipse, rgba(37,99,235,0.35), transparent 70%)",
                    filter: "blur(6px)",
                  }} />
                </div>

                {/* Lifecycle journey strip */}
                <div style={{ width: "100%", maxWidth: "420px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                    <div style={{ position: "absolute", top: "5px", left: "8%", right: "8%", height: "1px", background: "#D5D8DE" }} />
                    {["acquire", "onboard", "engage", "grow", "retain"].map((stage, i) => (
                      <motion.div
                        key={stage}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.14, duration: 0.4 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}
                      >
                        <motion.div
                          animate={i === 0 ? { boxShadow: ["0 0 0 0 rgba(37,99,235,0.5)", "0 0 0 8px rgba(37,99,235,0)", "0 0 0 0 rgba(37,99,235,0)"] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            width: "11px", height: "11px", borderRadius: "50%",
                            background: i === 0 ? "#2563EB" : "#C7CCD4",
                            border: i === 0 ? "none" : "1px solid #AFB5BF",
                          }}
                        />
                        <span style={{
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase",
                          color: i === 0 ? "#2563EB" : "#8A8F98",
                        }}>
                          {stage}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <style>{`
              @media (max-width: 860px) {
                .learn-intro-grid { grid-template-columns: 1fr !important; text-align: center; }
                .learn-intro-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Scene ${state.scene + 1} of ${TOTAL_SCENES}`}
      </div>

      {!showIntro && (
        <ProgressBar
          scene={state.scene}
          isPlaying={state.isPlaying}
          onGoto={handleGoto}
        />
      )}

      <SceneManager
        scene={state.scene}
        isPlaying={state.isPlaying}
        isTransitioning={state.isTransitioning}
      />

      {!showIntro && (
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
      )}
    </main>
  );
}
