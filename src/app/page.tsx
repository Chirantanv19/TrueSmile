"use client"
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import SmileModel from "@/components/SmileModel";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1% NAV BAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 backdrop-blur-sm">
        <div className="text-2xl font-black tracking-tighter">
          TRUE<span className="text-cyan-400">SMILE</span>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-400">
          <a href="#" className="hover:text-white transition">The Tech</a>
          <a href="#" className="hover:text-white transition">Case Studies</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
        </div>
        <button className="glass px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Reserve Slot
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-12 pt-40 min-h-screen">
        <div className="max-w-2xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-cyan-400 mb-6"
          >
            <div className="h-[1px] w-8 bg-cyan-400"></div>
            <span className="text-xs font-bold uppercase tracking-[0.4em]">3D Smile Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-8"
          >
            SMILE <br />
            <span className="text-outline">WITHOUT</span> <br />
            LIMITS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-sm mb-12 font-light leading-relaxed"
          >
            We merge anatomical precision with aesthetic artistry to build your perfect smile in 3D before we ever touch a tooth.
          </motion.p>

          <div className="flex flex-wrap gap-6">
            <button className="bg-cyan-500 text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4">
              Book Transformation <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 3D Model Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 h-full"
        >
          <SmileModel />

          {/* Floating Data Badge */}
          <div className="absolute top-20 right-0 glass p-6 rounded-3xl max-w-[200px]">
            <Zap className="text-cyan-400 mb-2" size={20} />
            <p className="text-[10px] uppercase tracking-widest text-gray-400">AI Precision</p>
            <p className="text-sm font-bold">0.01mm Structural Accuracy</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}