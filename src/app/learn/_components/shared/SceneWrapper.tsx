"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "../constants";
import { useIsMobile } from "./useIsMobile";

interface SceneWrapperProps {
  sceneIndex: number;
  title: string;
  children: React.ReactNode;
}

export default function SceneWrapper({ sceneIndex, title, children }: SceneWrapperProps) {
  const sceneNumber = String(sceneIndex + 1).padStart(2, "0");
  const isMobile = useIsMobile();

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
        alignItems: "stretch",
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
      }}
    >
      {/*
        Using margin:auto on the inner div instead of justifyContent:center on the section.
        This correctly centers short content but allows scrolling from the top for tall content,
        avoiding the CSS bug where centered+overflow hides the top of scrollable content.
      */}
      <div
        style={{
          margin: "auto",
          width: "100%",
          boxSizing: "border-box",
          paddingTop: isMobile ? 76 : 88,
          paddingBottom: isMobile ? 112 : 100,
          paddingLeft: isMobile ? 14 : 24,
          paddingRight: isMobile ? 14 : 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </motion.section>
  );
}
