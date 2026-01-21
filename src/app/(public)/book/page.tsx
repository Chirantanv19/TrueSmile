"use client";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { BookingForm } from "@/components/forms/booking-form";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function BookingPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <AmbientBackground />

      {/* Main Glass Card Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] overflow-hidden flex flex-col md:flex-row min-h-[700px]"
      >

        {/* LEFT SIDE: Visuals & Context (Hidden on small mobile) */}
        <div className="hidden md:flex flex-1 relative bg-slate-50 p-12 flex-col justify-between overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop"
              alt="Clinic Architecture"
              className="w-full h-full object-cover opacity-80 grayscale mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>

          {/* Content z-10 */}
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white/20 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Elena R.</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">Verified Patient</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="flex-1 p-8 md:p-16 flex items-center justify-center relative">
          <div className="w-full max-w-md relative z-10">
            <BookingForm />
          </div>
        </div>

      </motion.div>
    </main>
  );
}