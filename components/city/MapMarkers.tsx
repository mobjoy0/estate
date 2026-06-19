"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import * as THREE from "three";
import { POIS } from "@/lib/data/city";
import { LAYER_MAP } from "@/lib/data/layers";
import { useCityStore } from "@/lib/store";
import type { MapPoi } from "@/lib/data/types";

export function MapMarkers() {
  const activeLayers = useCityStore((s) => s.activeLayers);
  const visible = POIS.filter((p) => activeLayers.has(p.layer));
  return (
    <group>
      {visible.map((poi) => (
        <Marker key={poi.id} poi={poi} />
      ))}
    </group>
  );
}

function Marker({ poi }: { poi: MapPoi }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const meta = LAYER_MAP[poi.layer];
  const color = meta.color;
  const [x, , z] = poi.position;

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = (clock.getElapsedTime() % 2) / 2;
    const s = 0.6 + t * 2.6;
    ringRef.current.scale.set(s, s, s);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.5 * (1 - t);
  });

  return (
    <group position={[x, 0, z]}>
      {/* ground pulse */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.8, 1.0, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* stem */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 3.2, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {/* glowing orb */}
      <Billboard position={[0, 3.4, 0]}>
        <mesh>
          <circleGeometry args={[0.55, 24]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.85, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
        <Html center distanceFactor={30} position={[0, 0.9, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md">
            {poi.name}
          </div>
        </Html>
      </Billboard>
    </group>
  );
}
