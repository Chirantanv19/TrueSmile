"use client";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { BookingForm } from "@/components/forms/booking-form";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  return (
    <main className="relative min-h-screen w-full bg-white md:bg-transparent flex flex-col md:flex-row md:items-center md:justify-center md:p-8">

      {/* Ambient Background - Desktop Only to keep mobile clean */}
      <div className="hidden md:block">
        <AmbientBackground />
      </div>

      {/* ===========================================================================
         MOBILE LAYOUT (Scrollable & Matches Screenshot)
         Visible only on md:hidden
      =========================================================================== */}
      <div className="md:hidden w-full min-h-screen flex flex-col bg-white overflow-y-auto pb-24">

        {/* 1. Top Graphic Section (Teeth Radar) */}
        <div className="relative w-full h-[340px] bg-slate-900 shrink-0 overflow-hidden flex items-center justify-center rounded-b-[40px]">
          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[300px] h-[300px] border border-white/20 rounded-full absolute" />
            <div className="w-[220px] h-[220px] border border-dashed border-white/20 rounded-full absolute" />
            <div className="w-[140px] h-[140px] border border-white/10 rounded-full absolute" />
          </div>

          {/* Teeth Glow Placeholder */}
          <div className="relative z-10 w-40 h-24 bg-slate-200 blur-2xl opacity-20 rounded-full animate-pulse" />
          <div className="absolute z-20 text-center">
            <div className="text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2">Analysis Complete</div>
            {/* If you have the teeth PNG, replace this text with: <img src="/teeth.png" className="w-48 opacity-80" /> */}
            <div className="text-4xl text-white/10 font-black tracking-tighter">3D SCAN</div>
          </div>

          {/* Noise Overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-noise" />
        </div>

        {/* 2. Content Container */}
        <div className="px-6 pt-10 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-slate-300"></div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              Est. 2026 • Swiss Precision
            </span>
          </div>

          {/* Typography */}
          <h1 className="text-[42px] leading-[0.9] text-slate-900 mb-8">
            <span className="block font-sans font-bold tracking-tight">Smile</span>
            <span className="block font-serif italic text-slate-400 font-light">Without</span>
            <span className="block font-sans font-bold tracking-tight">Compromise</span>
          </h1>

          <p className="text-slate-500 text-sm leading-relaxed max-w-[85%] mb-10">
            Merging anatomical data with architectural principles to engineer a smile that is unmistakably yours.
          </p>

          {/* 3. The Form */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-2 mb-12">
            <BookingForm />
          </div>

          {/* 4. Bottom "Pill" Button (Matches Screenshot) */}
          {/* This mimics the dark pill button at the bottom of your image */}
          <div className="flex items-center justify-between mt-auto gap-4">
            <Link href="/" className="group flex-1">
              <div className="bg-[#0f172a] text-white rounded-full h-16 px-2 flex items-center justify-between relative overflow-hidden shadow-xl shadow-slate-200">

                {/* Circle Icon (Left) */}
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">
                  N
                </div>

                {/* Text (Center) */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-white/40 tracking-widest uppercase mb-0.5">Back to</span>
                  <span className="text-sm font-bold tracking-widest uppercase">HOME PAGE</span>
                </div>

                {/* Arrow (Right) */}
                <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center group-active:scale-90 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Secondary Link */}
            <Link href="/cases" className="flex flex-col justify-center h-16 px-2 text-right">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-tight">
                View <br /> Case <br /> Studies
              </span>
            </Link>
          </div>

        </div>
      </div>

      {/* ===========================================================================
         DESKTOP LAYOUT (Unchanged Glass Card)
         Visible only on md:flex
      =========================================================================== */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex w-full max-w-6xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] overflow-hidden flex-row min-h-[700px]"
      >
        {/* Left Side Visuals */}
        <div className="flex-1 relative bg-slate-50 p-12 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop"
              alt="Clinic Architecture"
              className="w-full h-full object-cover opacity-80 grayscale mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white text-[10px] uppercase tracking-widest font-bold mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Accepting New Patients
            </div>
            <h1 className="text-5xl font-black text-white leading-[0.95] tracking-tight">
              The Future <br /> of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">Dentistry.</span>
            </h1>
          </div>

          <div className="relative z-10">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
            <blockquote className="text-xl text-white font-medium leading-relaxed mb-4">
              "The level of precision and care here is unmatched. It feels less like a clinic and more like an architectural studio for smiles."
            </blockquote>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 p-16 flex items-center justify-center relative">
          <div className="w-full max-w-md relative z-10">
            <BookingForm />
          </div>
        </div>
      </motion.div>
    </main>
  );
}