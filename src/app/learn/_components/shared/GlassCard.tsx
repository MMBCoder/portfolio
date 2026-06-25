"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "purple" | "green" | "cyan" | "none";
  hover?: boolean;
}

const GLOW_STYLES: Record<NonNullable<GlassCardProps["glow"]>, React.CSSProperties> = {
  blue: { boxShadow: "0 0 0 1px rgba(37,99,235,0.15), 0 4px 24px rgba(37,99,235,0.08)" },
  purple: { boxShadow: "0 0 0 1px rgba(124,58,237,0.15), 0 4px 24px rgba(124,58,237,0.08)" },
  green: { boxShadow: "0 0 0 1px rgba(16,185,129,0.15), 0 4px 24px rgba(16,185,129,0.08)" },
  cyan: { boxShadow: "0 0 0 1px rgba(6,182,212,0.15), 0 4px 24px rgba(6,182,212,0.08)" },
  none: { boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" },
};

export default function GlassCard({
  children,
  className,
  glow = "none",
  hover = false,
  style,
  ...motionProps
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" } : undefined}
      className={cn(className)}
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(229,229,229,0.8)",
        borderRadius: "16px",
        ...GLOW_STYLES[glow],
        ...style,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
