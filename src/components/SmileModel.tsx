"use client"
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  ContactShadows,
  useGLTF,
  Html,
  useProgress
} from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 w-64">
        <div className="text-accent font-black tracking-widest text-[10px] uppercase">
          Neural Mapping {Math.round(progress)}%
        </div>
        <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

function Model() {
  // Use 'draco' in the loader to handle the compression
  const { scene } = useGLTF("/tooth-draco.glb", true);
  const [hovered, setHovered] = useState(false);

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, -0.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

export default function SmileModel() {
  return (
    <div className="h-[600px] w-full cursor-grab active:cursor-grabbing relative">
      <Canvas
        shadows
        dpr={[1, 2]} // Performance optimization
        camera={{ position: [0, 0, 10], fov: 25 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} color="#00f2ff" intensity={5} />

        <Suspense fallback={<Loader />}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Model />
          </Float>

          {/* REPAIRED EFFECT COMPOSER */}
          <EffectComposer multisampling={4}>
            <Bloom
              mipmapBlur
              intensity={1.2}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
            />
            <Noise opacity={0.03} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.3}
          scale={10}
          blur={3}
          far={4}
        />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

// Ensure the loader is aware of the Draco decoder if you compressed it
useGLTF.preload("/tooth-draco.glb");