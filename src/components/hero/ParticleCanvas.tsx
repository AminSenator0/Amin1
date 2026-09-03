"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 2.0;
const MAX_CONNECTIONS_PER_PARTICLE = 3;
const MOUSE_INFLUENCE_RADIUS = 3.5;
const MAX_LINES = 350;

interface ConstellationProps {
  brandColor: string;
}

function ConstellationNetwork({ brandColor }: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector3(100, 100, 100));

  const { positions, originals } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const orig = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = orig[i * 3] = x;
      pos[i * 3 + 1] = orig[i * 3 + 1] = y;
      pos[i * 3 + 2] = orig[i * 3 + 2] = z;
    }
    return { positions: pos, originals: orig };
  }, []);

  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []);

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 7;
      mouse.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 5;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    const posAttr = pointsGeo.attributes.position as THREE.BufferAttribute;
    const lineAttr = linesGeo.attributes.position as THREE.BufferAttribute;

    // Animate particles with gentle orbit drift
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const phase = i * 0.37;

      positions[idx] = originals[idx] + Math.sin(t * 0.25 + phase) * 0.5;
      positions[idx + 1] = originals[idx + 1] + Math.cos(t * 0.2 + phase) * 0.35;
      positions[idx + 2] = originals[idx + 2] + Math.sin(t * 0.15 + phase * 0.5) * 0.2;

      // Mouse repulsion
      const dx = positions[idx] - mouse.current.x;
      const dy = positions[idx + 1] - mouse.current.y;
      const dz = positions[idx + 2] - mouse.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0.01) {
        const force = ((MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS) * 0.15;
        const inv = 1 / dist;
        positions[idx] += dx * inv * force;
        positions[idx + 1] += dy * inv * force;
        positions[idx + 2] += dz * inv * force;
      }
    }
    posAttr.needsUpdate = true;

    // Build dynamic connections
    let lineIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_LINES * 2; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];
      let conn = 0;

      for (
        let j = i + 1;
        j < PARTICLE_COUNT && conn < MAX_CONNECTIONS_PER_PARTICLE && lineIdx < MAX_LINES * 2;
        j++
      ) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const ddx = x1 - x2;
        const ddy = y1 - y2;
        const ddz = z1 - z2;
        const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

        if (d < CONNECTION_DISTANCE) {
          lineAttr.setXYZ(lineIdx++, x1, y1, z1);
          lineAttr.setXYZ(lineIdx++, x2, y2, z2);
          conn++;
        }
      }
    }

    // Hide unused line segments
    for (let i = lineIdx; i < MAX_LINES * 2; i++) {
      lineAttr.setXYZ(i, 0, 0, 0);
    }
    lineAttr.needsUpdate = true;

    // Slow group rotation
    groupRef.current.rotation.y = t * 0.012;
    groupRef.current.rotation.x = Math.sin(t * 0.008) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.05}
          color={brandColor}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          color={brandColor}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function getBrandColor(): string {
  if (typeof window === "undefined") return "#0891b2";
  const el = document.createElement("div");
  el.style.color = "var(--brand-background-strong)";
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);

  if (computed && computed !== "rgba(0, 0, 0, 0)") {
    // Convert rgb(r,g,b) to hex
    const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, "0");
      const g = parseInt(match[2]).toString(16).padStart(2, "0");
      const b = parseInt(match[3]).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    }
  }
  return "#0891b2";
}

export default function ParticleCanvas() {
  const [brandColor, setBrandColor] = useState("#0891b2");

  useEffect(() => {
    const update = () => setBrandColor(getBrandColor());
    update();

    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ConstellationNetwork brandColor={brandColor} />
      </Canvas>
    </div>
  );
}