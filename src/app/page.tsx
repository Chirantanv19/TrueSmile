"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import SmileModel from "@/components/SmileModel";

export default function Showcase() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 50 && !isExiting) {
        setIsExiting(true);
        setTimeout(() => router.push("/home"), 300);
      }
    };
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [router, isExiting]);

  return (
    <main className="h-screen w-full bg-white text-slate-900 overflow-hidden relative selection:bg-slate-900 selection:text-white">

      {/* Background Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="flex h-full w-full flex-col lg:flex-row relative z-10">

        {/* LEFT: Typography & Content */}
        <div className="w-full lg:w-[55%] h-full flex flex-col justify-center px-8 md:px-20 relative order-2 lg:order-1 bg-white/50 backdrop-blur-sm lg:bg-transparent">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-[1px] bg-slate-900"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
              Est. 2026 • Swiss Precision
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-[90px] lg:text-[110px] font-medium leading-[0.9] tracking-tight mb-8 text-slate-900">
              Smile <br />
              <span className="font-serif italic text-slate-400">Without</span> <br />
              Compromise.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-500 text-lg md:text-xl max-w-md mb-12 font-light leading-relaxed"
          >
            Merging anatomical data with architectural principles to engineer a smile that is unmistakably yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-8"
          >
            <button
              onClick={() => router.push('/book')}
              className="group bg-slate-900 text-white pl-8 pr-6 py-5 rounded-full font-medium text-sm uppercase tracking-wider flex items-center gap-4 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Consultation
              <span className="bg-white/20 p-1 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-colors">
                <ArrowRight size={16} />
              </span>
            </button>
            <button className="text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-slate-500 transition-colors">
              View Case Studies
            </button>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-8 md:left-20 flex items-center gap-4 text-slate-400"
          >
            <div className="p-2 border border-slate-200 rounded-full animate-bounce">
              <MoveDown size={14} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll to Discover</span>
          </motion.div>
        </div>

        {/* RIGHT: 3D Model Container */}
        {/* MODIFIED BACKGROUND: Added a subtle slate gradient to provide contrast for the white teeth */}
        <div className="w-full lg:w-[45%] h-[50vh] lg:h-full relative order-1 lg:order-2 bg-gradient-to-br from-slate-500 via-[#f1f5f9] to-[#e2e8f0] lg:rounded-bl-[60px] overflow-hidden shadow-[inset_10px_0_30px_-10px_rgba(0,0,0,0.05)]">
          {/* Decorative Circle (made subtly darker) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-slate-200/60 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full border border-dashed border-slate-200/60 z-0" />

          <div className="relative z-10 w-full h-full">
            <SmileModel />
          </div>

          {/* Floating Badge */}
          <div className="absolute top-12 right-12 hidden lg:flex flex-col items-end gap-1">
            <div className="text-4xl font-light text-slate-900">01</div>
            <div className="w-12 h-[1px] bg-slate-300 mb-1" />
            <div className="text-[10px] uppercase tracking-widest text-slate-500">Digital Twin</div>
          </div>
        </div>

      </div>

      {/* Page Transition Curtain */}
      {isExiting && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-slate-900 z-50 origin-bottom"
        />
      )}
    </main>
  );
}