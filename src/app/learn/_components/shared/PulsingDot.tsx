"use client";

import { motion } from "framer-motion";

interface PulsingDotProps {
  color?: string;
  size?: number;
  delay?: number;
  style?: React.CSSProperties;
}

export default function PulsingDot({
  color = "#2563EB",
  size = 10,
  delay = 0,
  style,
}: PulsingDotProps) {
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }}
      aria-hidden="true"
    >
      {/* Outer pulse ring */}
      <motion.span
        style={{
          position: "absolute",
          width: size * 2.4,
          height: size * 2.4,
          borderRadius: "50%",
          background: color,
          opacity: 0,
        }}
        animate={{ scale: [0.6, 1.6], opacity: [0.35, 0] }}
        transition={{ delay, duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Inner solid dot */}
      <motion.span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          display: "block",
          flexShrink: 0,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
