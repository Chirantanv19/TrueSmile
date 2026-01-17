"use client"
import React, { Suspense } from "react";
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
  // POINTING TO YOUR NEW TRANSFORMED FILE
  const { scene } = useGLTF("/tooth.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.7/");

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // LUXURY MATERIAL INJECTION
      child.material.color.set("#ffffff");     // Force pure white
      child.material.roughness = 0.05;         // Super shiny
      child.material.metalness = 0.3;          // Pearlescent look
      child.material.envMapIntensity = 2.5;    // High reflection

      // SUBTLE INTERNAL GLOW
      child.material.emissive.set("#00f2ff");
      child.material.emissiveIntensity = 0.15;
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
        flat // Makes colors pop more
        gl={{
          antialias: true,
          toneMappingExposure: 1.2 // Global brightness boost
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={22} />

        {/* --- LIGHTING RIG --- */}
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={8} castShadow />
        <pointLight position={[-10, 5, -5]} color="#00f2ff" intensity={20} />
        <pointLight position={[10, -5, 5]} intensity={10} color="#ffffff" />

        <Environment preset="city" />

        <Suspense fallback={<Loader />}>
          <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
            <Model />
          </Float>

          <EffectComposer multisampling={4}>
            <Bloom
              mipmapBlur
              intensity={1.8}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.8}
            />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>

        <ContactShadows position={[0, -2.8, 0]} opacity={0.6} scale={12} blur={2.5} far={4} />

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

// Preload the specific file and decoder
useGLTF.preload("/tooth.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.7/");