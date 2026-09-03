"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { SmartImage } from "@/once-ui/components";

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  speed?: number;
  radius?: string;
  style?: React.CSSProperties;
}

export function ParallaxImage({
  src,
  alt,
  aspectRatio = "16 / 9",
  speed = 0.15,
  radius = "m",
  style,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius === "m" ? "12px" : "16px",
        aspectRatio,
        ...style,
      }}
    >
      <motion.div style={{ y, position: "absolute", inset: "-20%" }}>
        <SmartImage
          src={src}
          alt={alt}
          aspectRatio={aspectRatio}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>
    </div>
  );
}