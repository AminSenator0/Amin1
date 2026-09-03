"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']"
        )
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']"
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: "50%",
          border: "1.5px solid #ffffff",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
        animate={{ width: isHovering ? 48 : 32, height: isHovering ? 48 : 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Center dot */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}