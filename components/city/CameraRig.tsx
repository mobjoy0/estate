"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCityStore } from "@/lib/store";

export function CameraRig() {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const autoOrbit = useCityStore((s) => s.autoOrbit);
  const focusTarget = useCityStore((s) => s.focusTarget);

  const desiredTarget = useRef(new THREE.Vector3(0, 6, 0));
  const desiredPos = useRef(new THREE.Vector3(46, 38, 46));

  useEffect(() => {
    if (focusTarget) {
      const [fx, fy, fz] = focusTarget;
      desiredTarget.current.set(fx, fy * 0.6, fz);
      // pull the camera toward the building from its current direction
      const dir = new THREE.Vector3(fx, 24, fz)
        .sub(new THREE.Vector3(0, 0, 0))
        .normalize();
      desiredPos.current.set(fx + dir.x * 26 + 12, 26, fz + dir.z * 26 + 12);
    } else {
      desiredTarget.current.set(0, 6, 0);
      desiredPos.current.set(46, 38, 46);
    }
  }, [focusTarget]);

  useFrame((_, delta) => {
    if (!controls.current) return;
    const k = Math.min(1, delta * 2.2);
    if (focusTarget) {
      controls.current.target.lerp(desiredTarget.current, k);
      camera.position.lerp(desiredPos.current, k);
    }
    controls.current.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoOrbit}
      autoRotateSpeed={0.45}
      minDistance={18}
      maxDistance={90}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2.15}
      target={[0, 6, 0]}
    />
  );
}
