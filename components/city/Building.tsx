"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Building as BuildingType } from "@/lib/data/types";
import { useCityStore } from "@/lib/store";
import { makeWindowTexture } from "./windowTexture";

export function Building({ building }: { building: BuildingType }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [localHover, setLocalHover] = useState(false);

  const hovered = useCityStore((s) => s.hoveredBuildingId === building.id);
  const selected = useCityStore((s) => s.selectedBuildingId === building.id);
  const highlighted = useCityStore((s) =>
    s.highlightedBuildingIds.has(building.id)
  );
  const anyHighlight = useCityStore((s) => s.highlightedBuildingIds.size > 0);
  const setHovered = useCityStore((s) => s.setHovered);
  const selectBuilding = useCityStore((s) => s.selectBuilding);
  const setFocusTarget = useCityStore((s) => s.setFocusTarget);

  const tex = useMemo(() => makeWindowTexture(building.accent), [building.accent]);
  const facadeTex = useMemo(() => {
    const t = tex.clone();
    t.needsUpdate = true;
    t.repeat.set(Math.max(1, Math.round(building.width / 2)), building.floors / 3);
    return t;
  }, [tex, building.width, building.floors]);

  const accent = useMemo(() => new THREE.Color(building.accent), [building.accent]);
  const [x, y, z] = building.position;

  const active = hovered || localHover || selected;
  const dimmed = anyHighlight && !highlighted && !selected;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetLift = active ? 0.6 : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetLift,
      Math.min(1, delta * 6)
    );
    const targetScale = active ? 1.03 : 1;
    const s = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      Math.min(1, delta * 6)
    );
    groupRef.current.scale.set(s, active ? targetScale : s, s);

    if (matRef.current) {
      const targetEmissive =
        selected || highlighted ? 1.5 : active ? 1.0 : dimmed ? 0.12 : 0.55;
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        Math.min(1, delta * 6)
      );
    }
  });

  return (
    <group position={[x, 0, z]}>
      <group ref={groupRef}>
        {/* Tower body */}
        <mesh
          position={[0, building.height / 2, 0]}
          castShadow
          receiveShadow
          onPointerOver={(e) => {
            e.stopPropagation();
            setLocalHover(true);
            setHovered(building.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setLocalHover(false);
            setHovered(null);
            document.body.style.cursor = "auto";
          }}
          onClick={(e) => {
            e.stopPropagation();
            selectBuilding(building.id);
            setFocusTarget([x, building.height * 0.5, z]);
          }}
        >
          <boxGeometry args={[building.width, building.height, building.depth]} />
          <meshStandardMaterial
            ref={matRef}
            color={dimmed ? "#0a0f18" : "#10192b"}
            emissive={accent}
            emissiveMap={facadeTex}
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.22}
            envMapIntensity={1.1}
          />
        </mesh>

        {/* Glow roof cap */}
        <mesh position={[0, building.height + 0.06, 0]}>
          <boxGeometry args={[building.width * 0.96, 0.12, building.depth * 0.96]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={selected || highlighted ? 4 : active ? 2.4 : 1.2}
            toneMapped={false}
          />
        </mesh>

        {/* Crown beam when selected/highlighted */}
        {(selected || highlighted) && (
          <mesh position={[0, building.height + 14, 0]}>
            <cylinderGeometry args={[0.06, 0.18, 28, 8, 1, true]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.22}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>

      {/* Hover label */}
      {(hovered || localHover) && !selected && (
        <Html position={[0, building.height + 1.6, 0]} center distanceFactor={26}>
          <div className="pointer-events-none select-none whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            <span className="text-gradient font-semibold">{building.name}</span>
            <span className="mx-1.5 text-white/30">·</span>
            <span className="text-white/70">{building.status}</span>
          </div>
        </Html>
      )}
    </group>
  );
}
