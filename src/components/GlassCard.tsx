"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function GlassCard({ children, style }: GlassCardProps) {
  return (
    <div
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        background:
          "color-mix(in srgb, var(--surface-background) 65%, transparent)",
        border:
          "1px solid color-mix(in srgb, var(--brand-background-strong) 18%, transparent)",
        borderRadius: "24px",
        padding: "32px",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}