"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Scan, Cpu, Microscope, Zap, Crosshair } from "lucide-react";

export default function TheLab() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      // Changed: bg-black -> bg-white, border-white/10 -> border-slate-100
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-white border-y border-slate-100"
    >
      {/* 1. DYNAMIC BACKGROUND IMAGE (Parallax) */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-100"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          // Kept the same image, it works well in light mode too
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2000&auto=format&fit=crop')" }}
        />
        {/* Changed: Dark Gradient -> White Overlay for readability */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
      </motion.div>

      {/* 2. TECH GRID OVERLAY - Dark lines on light bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 3. ANIMATED SCANNING LINE (The "Laser") - Adjusted to Blue/Teal */}
      {/* <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.4)] z-0 pointer-events-none"
      /> */}

      {/* 4. MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT: Text Content */}
        <div className="text-left space-y-8">
          <div className="flex items-center gap-2 mb-2">
            {/* Changed: bg-red-500 -> bg-teal-500 to match theme */}
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-[0.3em] text-teal-600 uppercase">Live Analysis</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Lab.</span>
            <br />
            {/* Changed: text-white/20 -> text-slate-300 */}
            <span className="text-slate-300 text-4xl md:text-6xl">Zero Error.</span>
          </h2>

          {/* Changed: text-gray-400 -> text-slate-500, border-cyan-500 -> border-teal-500 */}
          <p className="text-slate-500 max-w-md text-sm md:text-base leading-relaxed border-l-2 border-teal-500 pl-6">
            We don't guess. We calculate. Utilizing military-grade CNC milling and 8K Stereolithography to ensure every aesthetic decision is backed by mathematical certainty.
          </p>

          <button className="group flex items-center gap-3 px-6 py-3 border border-slate-200 hover:border-teal-500 bg-white/50 hover:bg-white rounded-none transition-all duration-300 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-teal-600">View Tech Specs</span>
            <Scan size={16} className="text-teal-600" />
          </button>
        </div>

        {/* RIGHT: Visual "Tech Specs" Floating Cards */}
        <div className="relative h-[400px] w-full hidden md:block">
          {/* Center Piece: Abstract Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-slate-300 rounded-full opacity-50"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-teal-500/5 blur-[80px] rounded-full" />

          {/* Floating Cards */}
          <FloatingCard
            icon={<Microscope size={20} />}
            label="Resolution"
            value="8K Ultra"
            className="top-10 left-10 delay-0"
          />
          <FloatingCard
            icon={<Crosshair size={20} />}
            label="Tolerance"
            value="±0.005mm"
            className="top-1/2 right-0 delay-700"
          />
          <FloatingCard
            icon={<Cpu size={20} />}
            label="Processing"
            value="Neural Eng."
            className="bottom-10 left-20 delay-1000"
          />
        </div>
      </div>
    </section>
  );
}

// Sub-component for the floating glass cards
function FloatingCard({ icon, label, value, className }: { icon: any, label: string, value: string, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      // Changed: Dark glass -> White glass with shadow
      className={`absolute ${className} p-4 bg-white/80 backdrop-blur-md border border-slate-200 flex items-center gap-4 w-48 shadow-xl rounded-xl`}
    >
      {/* Changed: Icon bg colors */}
      <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{label}</div>
        <div className="text-lg font-bold text-slate-900">{value}</div>
      </div>
    </motion.div>
  );
}