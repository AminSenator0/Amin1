"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  delay?: number;
}

export function TextScramble({ text, className, style, speed = 1, delay = 0 }: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const timer = setTimeout(() => {
      started.current = true;
      let frame = 0;
      const totalFrames = text.length * 4 * (1 / speed);
      let raf: number;

      const animate = () => {
        const progress = frame / totalFrames;
        const revealed = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (i < revealed) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(result);
        frame++;

        if (frame <= totalFrames) {
          raf = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };

      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={className} style={style} aria-label={text}>
      {display || text}
    </span>
  );
}