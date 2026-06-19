"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { DISTRICTS } from "@/lib/data/city";

// Ground plate, waterfront, road network and parks — the city "table".
export function Terrain() {
  return (
    <group>
      <GroundPlate />
      <Waterfront />
      <Roads />
      <Parks />
      <DistrictPads />
    </group>
  );
}

function GroundPlate() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <planeGeometry args={[140, 130]} />
      <meshStandardMaterial color="#070b14" metalness={0.4} roughness={0.85} />
    </mesh>
  );
}

function Waterfront() {
  return (
    <group>
      {/* Sea on the west / marina edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-52, 0.01, -4]}>
        <planeGeometry args={[40, 120]} />
        <meshStandardMaterial
          color="#0a2540"
          emissive="#0e4b6e"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* glints */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-52, 0.02, -4]}>
        <planeGeometry args={[40, 120]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

function Roads() {
  const lines = useMemo(() => {
    const out: { pos: [number, number, number]; size: [number, number] }[] = [];
    // Avenues (run along Z)
    for (let x = -36; x <= 36; x += 12) {
      out.push({ pos: [x, 0.015, 0], size: [1.4, 110] });
    }
    // Streets (run along X)
    for (let z = -36; z <= 36; z += 12) {
      out.push({ pos: [0, 0.015, z], size: [104, 1.4] });
    }
    return out;
  }, []);

  return (
    <group>
      {lines.map((l, i) => (
        <group key={i}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={l.pos}>
            <planeGeometry args={l.size} />
            <meshStandardMaterial
              color="#0c1422"
              metalness={0.6}
              roughness={0.5}
            />
          </mesh>
          {/* glowing centre line */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[l.pos[0], 0.02, l.pos[2]]}
          >
            <planeGeometry
              args={
                l.size[0] > l.size[1]
                  ? [l.size[0], 0.08]
                  : [0.08, l.size[1]]
              }
            />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Parks() {
  const parks = useMemo(
    () => [
      { pos: [-6, 20] as [number, number], r: 7 },
      { pos: [18, -18] as [number, number], r: 5 },
      { pos: [-20, 30] as [number, number], r: 4.5 },
    ],
    []
  );
  return (
    <group>
      {parks.map((p, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[p.pos[0], 0.03, p.pos[1]]}
        >
          <circleGeometry args={[p.r, 48]} />
          <meshStandardMaterial
            color="#0c2a1c"
            emissive="#1f7a4d"
            emissiveIntensity={0.25}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function DistrictPads() {
  return (
    <group>
      {DISTRICTS.map((d) => (
        <mesh
          key={d.id}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[d.center[0], 0.025, d.center[1]]}
        >
          <ringGeometry args={[13.2, 13.6, 64]} />
          <meshBasicMaterial
            color={d.accent}
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
