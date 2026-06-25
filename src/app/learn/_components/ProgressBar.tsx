"use client";

import { motion } from "framer-motion";
import { TOTAL_SCENES, SCENE_DURATIONS, SCENE_META, COLORS } from "./constants";

interface ProgressBarProps {
  scene: number;
  isPlaying: boolean;
  onGoto: (scene: number) => void;
}

export default function ProgressBar({ scene, isPlaying, onGoto }: ProgressBarProps) {
  const segmentWidth = 100 / TOTAL_SCENES;

  return (
    <nav
      aria-label="Scene navigation"
      style={{
        position: "fixed",
        top: "68px",
        left: 0,
        right: 0,
        zIndex: 50,
        height: "3px",
        background: "#F0F0F0",
        display: "flex",
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
              width: `${segmentWidth}%`,
              height: "100%",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {/* Completed segment */}
            {isCompleted && (
              <div style={{ position: "absolute", inset: 0, background: COLORS.blue }} />
            )}

            {/* Active segment — animates from 0 to 100% */}
            {isActive && (
              <motion.div
                key={`active-${scene}`}
                style={{
                  position: "absolute",
                  top: 0, left: 0, bottom: 0,
                  background: COLORS.blue,
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPlaying && duration > 0 ? 1 : undefined }}
                transition={
                  isPlaying && duration > 0
                    ? { duration: duration / 1000, ease: "linear" }
                    : { duration: 0 }
                }
              />
            )}

            {/* Segment divider */}
            <div style={{
              position: "absolute",
              top: 0, right: 0, bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.5)",
            }} />
          </button>
        );
      })}
    </nav>
  );
}
