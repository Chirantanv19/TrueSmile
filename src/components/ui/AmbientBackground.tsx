"use client";
import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#FAFAFA] -z-10">
      {/* Floating Organic Orb 1 */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-[120px]"
      />
      
      {/* Floating Organic Orb 2 */}
      <motion.div
        animate={{
          x: [0, -70, 30, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-teal-200/20 rounded-full blur-[120px]"
      />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}