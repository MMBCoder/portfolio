"use client";

import { motion } from "framer-motion";

interface FlowLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  delay?: number;
  duration?: number;
  pulse?: boolean;
}

export default function FlowLine({
  x1, y1, x2, y2,
  color = "#2563EB",
  width = 1.5,
  delay = 0,
  duration = 0.6,
  pulse = false,
}: FlowLineProps) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <g>
      {/* Static base line (faint) */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={width * 0.4}
        strokeOpacity={0.15}
      />

      {/* Animated drawing line */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration, ease: "easeInOut" }}
        style={{ pathLength: undefined }}
      />

      {/* Pulse dot travelling along the line */}
      {pulse && (
        <motion.circle
          r={3}
          fill={color}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            delay: delay + duration,
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            offsetPath: `path("M ${x1} ${y1} L ${x2} ${y2}")`,
            offsetDistance: "0%",
          } as React.CSSProperties}
        />
      )}

      {/* Invisible wider hit-area so line is easy to see for a11y descriptions */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="transparent"
        strokeWidth={Math.max(width * 4, 8)}
        aria-hidden="true"
      />
      {/* Store length to avoid unused-var lint error */}
      {length > 0 && null}
    </g>
  );
}
