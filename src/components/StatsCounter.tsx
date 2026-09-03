"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsCounterProps {
  stats: StatItem[];
}

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  const display = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsub = display.on("change", (v) => setDisplayValue(v));
    return unsub;
  }, [display]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        width: "100%",
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            delay: index * 0.12,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <GlassCard
            style={{
              textAlign: "center",
              padding: "32px 24px",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: "12px",
                color: "var(--neutral-on-background-strong)",
                fontFamily: "var(--font-family-secondary)",
              }}
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--neutral-on-background-weak)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {stat.label}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}