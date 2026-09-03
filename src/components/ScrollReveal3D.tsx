"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollReveal3DProps {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal3D({
  children,
  direction = "left",
  className,
  style,
}: ScrollReveal3DProps) {
  return (
    <motion.div
      className={className}
      style={{ width: "100%", ...style }}
      initial={{
        opacity: 0,
        x: direction === "left" ? -40 : 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}