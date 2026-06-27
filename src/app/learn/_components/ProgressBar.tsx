"use client";

import { motion } from "framer-motion";
import { TOTAL_SCENES, SCENE_DURATIONS, SCENE_META, COLORS } from "./constants";

interface ProgressBarProps {
  scene: number;
  isPlaying: boolean;
  onGoto: (scene: number) => void;
}

export default function ProgressBar({ scene, isPlaying, onGoto }: ProgressBarProps) {
  return (
    <nav
      aria-label="Scene navigation"
      style={{
        position: "fixed",
        top: "68px",
        left: 0,
        right: 0,
        zIndex: 50,
        height: "4px",
        display: "flex",
        gap: "2px",
        background: "transparent",
      }}
    >
      {Array.from({ length: TOTAL_SCENES }, (_, i) => {
        const isCompleted = i < scene;
        const isActive = i === scene;
        const duration = SCENE_DURATIONS[i];

        return (
          <button
            key={i}
            onClick={() => onGoto(i)}
            aria-label={`Go to Scene ${i + 1}: ${SCENE_META[i].title}`}
            aria-current={isActive ? "step" : undefined}
            title={SCENE_META[i].title}
            style={{
              position: "relative",
              flex: 1,
              height: "100%",
              background: isCompleted ? COLORS.blue : isActive ? "#BFDBFE" : "#DEDEDE",
              border: "none",
              padding: 0,
              cursor: "pointer",
              outline: "none",
              overflow: "hidden",
            }}
          >
            {isActive && (
              <motion.div
                key={`active-${scene}`}
                style={{
                  position: "absolute",
                  top: 0, left: 0, bottom: 0, right: 0,
                  background: COLORS.blue,
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPlaying && duration > 0 ? 1 : 0 }}
                transition={
                  isPlaying && duration > 0
                    ? { duration: duration / 1000, ease: "linear" }
                    : { duration: 0 }
                }
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
