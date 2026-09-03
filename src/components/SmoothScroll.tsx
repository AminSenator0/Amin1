"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links → Lenis scroll
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor?.hash && anchor.hash.startsWith("#")) {
        e.preventDefault();
        instance.scrollTo(anchor.hash, { offset: -80 });
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      instance.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}