"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface SpotlightButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function SpotlightButton({
  children,
  className,
  style,
  onClick,
  href,
  variant = "secondary",
}: SpotlightButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const borderColors = {
    primary: "var(--brand-background-strong)",
    secondary: "var(--neutral-alpha-medium)",
    ghost: "transparent",
  };

  const bgColors = {
    primary: "var(--brand-background-strong)",
    secondary: "var(--surface-background)",
    ghost: "transparent",
  };

  const content = (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: "12px",
        padding: "1px",
        overflow: "hidden",
        cursor: "pointer",
        display: "inline-flex",
        ...style,
      }}
    >
      {/* Moving spotlight border */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px",
          background: `radial-gradient(250px circle at ${pos.x}% ${pos.y}%, ${borderColors[variant]}, transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />

      {/* Inner content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: bgColors[variant],
          borderRadius: "11px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", display: "inline-flex" }}>
        {content}
      </a>
    );
  }

  return content;
}