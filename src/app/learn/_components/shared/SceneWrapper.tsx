"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "../constants";

interface SceneWrapperProps {
  sceneIndex: number;
  title: string;
  children: React.ReactNode;
}

export default function SceneWrapper({ sceneIndex, title, children }: SceneWrapperProps) {
  const sceneNumber = String(sceneIndex + 1).padStart(2, "0");

  return (
    <motion.section
      key={sceneIndex}
      role="region"
      aria-label={`Scene ${sceneNumber}: ${title}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 24px 80px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {children}
    </motion.section>
  );
}
