"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE_OUT } from "../constants";
import { useIsMobile } from "./useIsMobile";

interface SceneWrapperProps {
  sceneIndex: number;
  title: string;
  children: React.ReactNode;
}

export default function SceneWrapper({ sceneIndex, title, children }: SceneWrapperProps) {
  const isMobile = useIsMobile();

  /* Subtle mouse-parallax tilt on the scene content plane */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(mx, { stiffness: 55, damping: 20 });
  const rotateX = useSpring(my, { stiffness: 55, damping: 20 });
  const secRef = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = secRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 4);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -3);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.section
      ref={secRef}
      key={sceneIndex}
      role="region"
      aria-label={title}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
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
          perspective: 1600,
        }}
      >
        <motion.div
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
