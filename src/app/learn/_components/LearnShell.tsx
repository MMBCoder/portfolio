"use client";

import { useReducer, useEffect, useCallback, useRef, useState } from "react";
import { TOTAL_SCENES, SCENE_DURATIONS, SCENE_TRANSITION_MS } from "./constants";
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
  isPlaying: true,
  isTransitioning: false,
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LearnShell() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Narration — plays voice-over for each scene automatically
  const { triggerManualNav } = useNarration(state.scene, state.isPlaying, isMuted);

  const handleToggleMute = useCallback(() => setIsMuted(prev => !prev), []);

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
