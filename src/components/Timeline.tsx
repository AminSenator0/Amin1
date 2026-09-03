"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Text, Heading, Flex } from "@/once-ui/components";

interface TimelineItem {
  title: string;
  subtitle: string;
  timeframe: string;
  description?: React.ReactNode;
  side?: "left" | "right";
}

interface TimelineProps {
  items: TimelineItem[];
}

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [item.side === "right" ? 30 : -30, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [item.side === "right" ? 60 : -60, 0]
  );

  const isLeft = item.side !== "right";

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "24px",
        alignItems: "start",
        marginBottom: "48px",
        position: "relative",
      }}
    >
      {/* Left content */}
      <div
        style={{
          textAlign: "right",
          opacity: isLeft ? 1 : 0,
          pointerEvents: isLeft ? "auto" : "none",
          gridColumn: isLeft ? "1" : "3",
          gridRow: "1",
        }}
      >
        {isLeft && (
          <motion.div style={{ rotateY, opacity, x }}>
            <div
              style={{
                background:
                  "color-mix(in srgb, var(--surface-background) 70%, transparent)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--neutral-alpha-medium)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Text variant="heading-default-xs" onBackground="brand-weak">
                {item.timeframe}
              </Text>
              <Heading variant="heading-strong-m" marginTop="4" marginBottom="4">
                {item.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.subtitle}
              </Text>
              {item.description && (
                <div style={{ marginTop: "12px" }}>{item.description}</div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "var(--brand-background-strong)",
          border: "3px solid var(--surface-background)",
          boxShadow: "0 0 0 3px var(--brand-alpha-medium)",
          gridColumn: "2",
          gridRow: "1",
          justifySelf: "center",
          marginTop: "24px",
          zIndex: 2,
          flexShrink: 0,
        }}
      />

      {/* Right content */}
      <div
        style={{
          textAlign: "left",
          opacity: !isLeft ? 1 : 0,
          pointerEvents: !isLeft ? "auto" : "none",
          gridColumn: !isLeft ? "3" : "1",
          gridRow: "1",
        }}
      >
        {!isLeft && (
          <motion.div style={{ rotateY, opacity, x }}>
            <div
              style={{
                background:
                  "color-mix(in srgb, var(--surface-background) 70%, transparent)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--neutral-alpha-medium)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Text variant="heading-default-xs" onBackground="brand-weak">
                {item.timeframe}
              </Text>
              <Heading variant="heading-strong-m" marginTop="4" marginBottom="4">
                {item.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.subtitle}
              </Text>
              {item.description && (
                <div style={{ marginTop: "12px" }}>{item.description}</div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Center line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent, var(--neutral-alpha-medium), transparent)",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />
      {items.map((item, index) => (
        <TimelineEntry
          key={`${item.title}-${index}`}
          item={{ ...item, side: index % 2 === 0 ? "left" : "right" }}
          index={index}
        />
      ))}
    </div>
  );
}