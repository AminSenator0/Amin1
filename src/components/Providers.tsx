"use client";

import { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";
import PageTransition from "./PageTransition";
import CustomCursor from "./CustomCursor";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <PageTransition>{children}</PageTransition>
      <CustomCursor />
    </SmoothScroll>
  );
}