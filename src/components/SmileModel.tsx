"use client"
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  ContactShadows,
  useGLTF,
  Html,
  useProgress,
  Environment,
  PerspectiveCamera
} from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ToneMapping } from "@react-three/postprocessing";

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
  const { scene } = useGLTF("/tooth-draco.glb", true);

  // Apply a high-gloss finish to all materials in the model
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // This makes the tooth look like polished ceramic/enamel
      child.material.roughness = 0.1;
      child.material.metalness = 0.2;
      child.material.envMapIntensity = 2; // Boosts reflections
    }
  });

  return (
    <primitive
      object={scene}
      scale={2.8}
      position={[0, -0.8, 0]}
    />
  );
}

export default function SmileModel() {
  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing relative">
      <Canvas
        shadows
        gl={{ antialias: true, stencil: false, depth: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={22} />

        {/* --- TRIPLE LIGHTING ENGINE --- */}
        {/* 1. Ambient: Soft overall brightness */}
        <ambientLight intensity={1.5} />

        {/* 2. Key Light: Main Brightness from front-top */}
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={6}
          castShadow
          shadow-placeholder-bias={0.001}
        />

        {/* 3. Rim Light: Electric Cyan light from behind to pop the edges */}
        <pointLight position={[-10, 5, -5]} color="#00f2ff" intensity={15} />

        {/* 4. Fill Light: Extra brightness from the other side */}
        <pointLight position={[10, -5, 5]} intensity={8} color="#ffffff" />

        {/* 5. Environment: High-end studio lighting reflections */}
        <Environment preset="city" />

        <Suspense fallback={<Loader />}>
          <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
            <Model />
          </Float>

          <EffectComposer multisampling={4}>
            {/* Bloom: Makes the bright spots "glow" */}
            <Bloom
              mipmapBlur
              intensity={1.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <ToneMapping middleGrey={0.6} maxLuminance={16.0} />
          </EffectComposer>
        </Suspense>

        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.6}
          scale={12}
          blur={2.5}
          far={4}
        />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/tooth-draco.glb");