"use client"
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  ContactShadows,
  useGLTF,
  Html,
  useProgress,
  Environment,
  PerspectiveCamera,
  // SoftShadows removed to fix Shader Error 1282
} from "@react-three/drei";
import { EffectComposer, TiltShift2, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="text-slate-400 font-bold tracking-[0.2em] text-[9px] uppercase">
          Loading Model... {Math.round(progress)}%
        </div>
        <div className="w-24 h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-800 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

function Model() {
  const { scene } = useGLTF("/tooth.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  })

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // --- VISIBILITY & CRASH FIX ---
      // 1. Used MeshStandardMaterial (Stable & High Performance)
      // 2. Color set to #f1f5f9 (Slate-100). 
      //    NOTE: We don't use pure white (#ffffff) because in 3D, 
      //    white lights on white object = invisible blown out pixels.
      //    This off-white grey looks "White" when lit bright.
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f1f5f9"),
        roughness: 0.3,                    // Slightly rougher to catch shadows
        metalness: 0.1,
        envMapIntensity: 2.0,
      });
    }
  });

  return (
    <group ref={meshRef}>
      <primitive
        object={scene}
        scale={2.8}
        position={[0, -0.5, 0]}
        rotation={[0, 0.5, 0]}
      />
    </group>
  );
}

export default function SmileModel() {
  return (
    <div className="h-full w-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          // Adjusted exposure so the grey teeth look white, not dark
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={25} />

        {/* --- LIGHTING RIG --- */}

        {/* 1. Ambient: Moderate to fill shadows */}
        <ambientLight intensity={0.6} color="#ffffff" />

        {/* 2. Key Light: Strong Directional light for shape */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize={[1024, 1024]} // Higher res shadows
        />

        {/* 3. Rim Light: Blue-Teal to separate from background */}
        <spotLight
          position={[-8, 5, -5]}
          intensity={2}
          color="#0ea5e9" // Vivid Blue-500
          angle={0.5}
          penumbra={1}
        />

        {/* 4. Warm Fill: Subtle warmth from below */}
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#fcd34d" />

        <Environment preset="city" />

        {/* REMOVED <SoftShadows /> TO FIX CRASH */}

        <Suspense fallback={<Loader />}>
          <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            floatingRange={[-0.1, 0.1]}
          >
            <Model />
          </Float>

          <EffectComposer enableNormalPass={false}>
            <TiltShift2 blur={0.1} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={0.4} />
          </EffectComposer>
        </Suspense>

        {/* ContactShadows provides the soft floor shadow without crashing */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.5}
          scale={15}
          blur={2.5}
          far={4.5}
          color="#1e293b"
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

useGLTF.preload("/tooth.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.7/");