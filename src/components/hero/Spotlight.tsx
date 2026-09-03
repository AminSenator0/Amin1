"use client";

import { useState, useEffect } from "react";

export function Spotlight() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, color-mix(in srgb, var(--brand-background-strong) 12%, transparent), transparent 40%)`,
        pointerEvents: "none",
        zIndex: 1,
        transition: "background 0.3s ease-out",
      }}
    />
  );
}