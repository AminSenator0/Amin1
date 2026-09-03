"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ReactNode } from "react";

interface VariableFontProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function VariableFont({ children, className, style }: VariableFontProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fontVar = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["'wght' 400", "'wght' 800", "'wght' 400"]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ fontVariationSettings: fontVar, ...style }}
    >
      {children}
    </motion.div>
  );
}