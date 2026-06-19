"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  Sparkles,
  Stars,
  AdaptiveDpr,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import { BUILDINGS } from "@/lib/data/city";
import { useCityStore } from "@/lib/store";
import { Building } from "./Building";
import { Terrain } from "./Terrain";
import { MapMarkers } from "./MapMarkers";
import { CameraRig } from "./CameraRig";

export default function CityScene() {
  const selectBuilding = useCityStore((s) => s.selectBuilding);
  const setFocusTarget = useCityStore((s) => s.setFocusTarget);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [46, 38, 46], fov: 38, near: 0.1, far: 400 }}
      onPointerMissed={() => {
        selectBuilding(null);
        setFocusTarget(null);
      }}
    >
      <color attach="background" args={["#05070d"]} />
      <fog attach="fog" args={["#05070d", 70, 165]} />

      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <hemisphereLight args={["#9fc7ff", "#0a0f1a", 0.5]} />
        <directionalLight
          position={[28, 50, 18]}
          intensity={1.6}
          color="#cfe5ff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-70}
          shadow-camera-right={70}
          shadow-camera-top={70}
          shadow-camera-bottom={-70}
          shadow-bias={-0.0004}
        />
        <pointLight position={[-40, 18, -20]} intensity={120} color="#5eead4" distance={120} />
        <pointLight position={[30, 16, 30]} intensity={90} color="#a78bfa" distance={120} />

        {/* Sky + atmosphere */}
        <Stars radius={120} depth={60} count={1800} factor={3} saturation={0} fade speed={0.4} />
        <Sparkles count={60} scale={[120, 30, 120]} size={2.2} speed={0.25} color="#8fd9ff" opacity={0.5} />

        {/* City */}
        <Terrain />
        {BUILDINGS.map((b) => (
          <Building key={b.id} building={b} />
        ))}
        <MapMarkers />

        <ContactShadows
          position={[0, 0.04, 0]}
          opacity={0.55}
          scale={150}
          blur={2.4}
          far={40}
          color="#000000"
        />

        {/* Reflections without external HDR (local lightformers) */}
        <Environment resolution={256}>
          <Lightformer
            intensity={2}
            color="#bfe3ff"
            position={[0, 30, -10]}
            scale={[40, 12, 1]}
          />
          <Lightformer
            intensity={1.4}
            color="#5eead4"
            position={[-30, 8, 10]}
            scale={[12, 30, 1]}
          />
          <Lightformer
            intensity={1.2}
            color="#a78bfa"
            position={[30, 8, 10]}
            scale={[12, 30, 1]}
          />
        </Environment>

        <Preload all />
      </Suspense>

      <CameraRig />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
