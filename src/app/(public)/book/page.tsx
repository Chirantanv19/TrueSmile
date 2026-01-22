"use client";

import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { BookingForm } from "@/components/forms/booking-form";
import { motion } from "framer-motion";
import { Star, Home } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <AmbientBackground />

      <div className="relative z-10 min-h-screen w-full flex items-start md:items-center justify-center px-4 py-8">
        {/* Main Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* LEFT SIDE: Visuals & Context (Desktop Only) */}
            {/* Kept hidden on mobile to prioritize the form, as requested */}
            <div className="hidden md:block relative h-full min-h-[600px]">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/90" />
              </div>

              {/* Content z-10 */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
                  >
                    ✨ Accepting New Patients
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-4 leading-tight"
                  >
                    The Future of<br />Dentistry.
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-3 leading-relaxed">
                    "The level of precision and care here is unmatched. It feels less like a clinic and more like an architectural studio for smiles."
                  </p>
                  <p className="text-xs opacity-70">
                    <span className="font-semibold">Elena R.</span><br />
                    Verified Patient
                  </p>
                </motion.div>
              </div>
            </div>

            {/* RIGHT SIDE: The Form */}
            <div className="p-6 md:p-8 lg:p-12">
              {/* MOBILE ONLY: Context Header */}
              {/* This ensures mobile users still see the branding without the massive image */}
              <div className="md:hidden mb-6">
                <div className="inline-block px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full text-sm font-medium mb-4 text-white">
                  ✨ New Patients
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  The Future of<br />Dentistry.
                </h1>
              </div>

              <BookingForm />

              {/* MOBILE ONLY: Bottom Navigation */}
              <div className="md:hidden mt-8 pb-8 flex flex-col gap-4">
                <Link
                  href="/home"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 text-white rounded-full hover:bg-slate-800/70 transition-all"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}