"use client"
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

// Component Imports
import SmoothScroll from "@/components/SmoothScroll";
import SmileModel from "@/components/SmileModel";
import CompareSlider from "@/components/CompareSlider";
import ServiceGrid from "@/components/ServiceGrid";
import DoctorCard from "@/components/DoctorCard";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-[#050505] text-white overflow-hidden">
        {/* TOP 1% UI ELEMENTS */}
        <CustomCursor />

        {/* GLOBAL BACKGROUND GLOW */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,242,255,0.15),transparent_70%)]" />
        </div>

        {/* 1. NAVIGATION BAR */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 backdrop-blur-md border-b border-white/5">
          <div className="text-2xl font-black tracking-tighter">
            TRUE<span className="text-accent">SMILE</span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-400">
            <a href="#tech" className="hover:text-accent transition">The Tech</a>
            <a href="#results" className="hover:text-accent transition">Results</a>
            <a href="#contact" className="hover:text-accent transition">Contact</a>
          </div>
          <button className="glass px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/10">
            Reserve Slot
          </button>
        </nav>

        {/* 2. HERO SECTION */}
        <section className="flex flex-col lg:flex-row items-center justify-between px-12 pt-40 min-h-screen relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-accent mb-6"
            >
              <div className="h-[1px] w-8 bg-accent"></div>
              <span className="text-xs font-bold uppercase tracking-[0.4em]">3D Smile Engineering</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-8"
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
              <button className="bg-accent text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4 shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                Book Transformation <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* 3D Model Column - DOUBLED SIZE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full lg:w-1/2 h-[700px] md:h-[850px] flex items-center justify-center"
          >
            {/* <SmileModel /> */}

            {/* Floating Data Badge */}
            <div className="absolute top-10 right-0 glass p-6 rounded-3xl max-w-[220px] border border-white/10 backdrop-blur-xl z-20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-accent" size={18} />
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Structural Scan</span>
              </div>
              <p className="text-sm font-bold leading-tight">Hyper-Realistic <br /> 3D Mapping Active</p>
            </div>

            <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full scale-75 -z-10" />
          </motion.div>
        </section>

        {/* 3. CORE SECTIONS */}
        <section id="tech"><ServiceGrid /></section>
        <section id="results"><CompareSlider /></section>
        <DoctorCard />
        <FAQ />
        <section id="contact"><ContactForm /></section>

        {/* 4. FOOTER */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}