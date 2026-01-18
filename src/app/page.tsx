"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import SmileModel from "@/components/SmileModel";

export default function Showcase() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      // If user scrolls down (deltaY > 0)
      if (e.deltaY > 0 && !isExiting) {
        setIsExiting(true);
        router.push("/home");
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [router, isExiting]);

  return (
    <main className="h-screen w-full bg-[#050505] text-white overflow-hidden relative">
      {/* 3D Model Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pr-12">
        <div className="w-full lg:w-1/2 h-full">
          <SmileModel />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-4xl pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-[#00f2ff] mb-6"
        >
          <div className="h-[1px] w-8 bg-[#00f2ff]"></div>
          <span className="text-xs font-bold uppercase tracking-[0.4em]">3D Smile Engineering</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-8 uppercase"
        >
          Smile <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Without</span> <br />
          Limits.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg max-w-sm mb-12 font-light leading-relaxed"
        >
          We merge anatomical precision with aesthetic artistry to build your perfect smile in 3D.
        </motion.p>

        <div className="pointer-events-auto">
          <button
            onClick={() => router.push('/home')}
            className="bg-[#00f2ff] text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:scale-105 transition-transform"
          >
            Book Transformation <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-12 flex items-center gap-4 text-gray-500">
        <div className="w-12 h-[1px] bg-gray-800" />
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll down to enter</span>
      </div>
    </main>
  );
}