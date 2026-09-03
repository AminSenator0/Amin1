"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  name: string;
  color?: string;
}

function SkillNode({
  position,
  name,
  color,
}: {
  position: [number, number, number];
  name: string;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.lookAt(state.camera.position);
  });

  return (
    <group ref={ref} position={position}>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: "color-mix(in srgb, var(--surface-background) 80%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${color}`,
            borderRadius: "8px",
            padding: "6px 14px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--neutral-on-background-strong)",
            whiteSpace: "nowrap",
            boxShadow: `0 0 16px ${color}30`,
            userSelect: "none",
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

function OrbitRing({ radius, rotation }: { radius: number; rotation: [number, number, number] }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      rotation={rotation}
      color="var(--neutral-alpha-medium)"
      transparent
      opacity={0.15}
      lineWidth={1}
    />
  );
}

function Scene({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      pts.push([x * 3.2, y * 3.2, z * 3.2]);
    }
    return pts;
  }, [skills]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + mouse.current.y * 0.15;
  });

  const colors = [
    "#06b6d4",
    "#8b5cf6",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#ec4899",
    "#3b82f6",
    "#14b8a6",
  ];

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={positions[i]}
          name={skill.name}
          color={skill.color || colors[i % colors.length]}
        />
      ))}
      <OrbitRing radius={3.2} rotation={[0, 0, 0]} />
      <OrbitRing radius={3.2} rotation={[Math.PI / 3, 0, 0]} />
      <OrbitRing radius={3.2} rotation={[-Math.PI / 3, 0, 0]} />
    </group>
  );
}

export function SkillSphere({ skills }: { skills: Skill[] }) {
  const [brandColor, setBrandColor] = useState("#06b6d4");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.createElement("div");
    el.style.color = "var(--brand-background-strong)";
    document.body.appendChild(el);
    const c = getComputedStyle(el).color;
    document.body.removeChild(el);
    const m = c.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (m) {
      const hex = [m[1], m[2], m[3]].map((v) => parseInt(v).toString(16).padStart(2, "0")).join("");
      setBrandColor(`#${hex}`);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene skills={skills} />
      </Canvas>
    </div>
  );
}