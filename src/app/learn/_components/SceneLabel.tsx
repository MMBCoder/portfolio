"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TOTAL_SCENES, SCENE_META } from "./constants";
import { useIsMobile } from "./shared/useIsMobile";

interface SceneLabelProps {
  scene: number;
}

export default function SceneLabel({ scene }: SceneLabelProps) {
  const meta = SCENE_META[scene];
  const number = String(scene + 1).padStart(2, "0");
  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 24,
        zIndex: 50,
        textAlign: "right",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#BBBBBB",
            marginBottom: 2,
          }}>
            {number} / {String(TOTAL_SCENES).padStart(2, "0")}
          </div>
          <div style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#CCCCCC",
            maxWidth: 160,
          }}>
            {meta.title}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
