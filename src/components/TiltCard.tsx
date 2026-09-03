"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltAmount?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className,
  style,
  tiltAmount = 12,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), springConfig);

  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "inherit",
        }}
      >
        {children}

        {/* Glare overlay */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,${isHovered ? glareOpacity : 0}), transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            mixBlendMode: "overlay",
            zIndex: 10,
          }}
        />
      </motion.div>
    </motion.div>
  );
}