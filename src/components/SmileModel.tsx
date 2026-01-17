"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";

export default function SmileModel() {
  return (
    <div className="h-[500px] w-full cursor-grab">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
          <mesh>
            {/* Using a Capsule as a placeholder for a 3D Tooth Model */}
            <capsuleGeometry args={[0.8, 1.2, 32, 64]} />
            <MeshDistortMaterial 
              color="#ffffff" 
              speed={2} 
              distort={0.1} 
              radius={1}
              emissive="#00f2ff"
              emissiveIntensity={0.05}
              roughness={0}
            />
          </mesh>
        </Float>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}