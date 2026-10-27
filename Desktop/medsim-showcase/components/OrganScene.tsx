"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Bounds, useGLTF, Html, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type OrganSceneProps = {
  modelPath: string;
  autoRotate: boolean;
  resetTrigger: number;
};

function LoadingProgress() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center border-2 border-ink bg-white p-6 text-center shadow-lg min-w-[260px]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-panel border-t-accent mb-3" />
        <span className="font-heading text-[20px] font-bold text-ink">
          Loading 3D Organ…
        </span>
        <span className="mt-1 font-mono text-[16px] font-bold text-accent">
          {Math.round(progress)}% loaded
        </span>
        <div className="mt-3 h-2 w-full border border-ink bg-panel overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

function ModelMesh({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export default function OrganScene({
  modelPath,
  autoRotate,
  resetTrigger,
}: OrganSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetTrigger]);

  return (
    <div className="relative h-full w-full bg-white select-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={["#f8fafc"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={1.0} />
        <directionalLight position={[0, -10, 0]} intensity={0.6} />
        <hemisphereLight intensity={0.8} groundColor="#c4d1db" />

        <Suspense fallback={<LoadingProgress />}>
          <Bounds fit clip observe margin={1.25}>
            <Center>
              <ModelMesh url={modelPath} />
            </Center>
          </Bounds>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={1.8}
          minDistance={0.5}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}
