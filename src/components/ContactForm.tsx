"use client";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function ContactForm() {
  return (
    // Changed: bg-white/5 -> bg-white with shadow
    <section className="py-24 px-6 md:px-12 bg-white rounded-[60px] mx-6 mb-12 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* Left: Branding & Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 uppercase text-slate-900">
            Ready for <br />
            <span className="text-teal-600 font-serif italic">The Change?</span>
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-sm leading-relaxed">
            Reserve your diagnostic 3D scan today. Our specialists will contact you within 24 hours to architect your new smile.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group cursor-pointer">
              {/* Icon Box: Light Teal Background */}
              <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Headquarters</span>
                <span className="text-sm font-bold tracking-wider text-slate-900">123 ART DISTRICT, BEVERLY HILLS</span>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Concierge Line</span>
                <span className="text-sm font-bold tracking-wider text-slate-900">+1 (800) TRUE-SMILE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Modern Form */}
        {/* Changed: Glass -> White Card with Border */}
        <div className="bg-slate-50 p-8 md:p-12 rounded-[40px] border border-slate-200">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Full Name</label>
                {/* Inputs: Slate-50 background -> White on Focus */}
                <input
                  type="text"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                  placeholder="Ex. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Phone</label>
                <input
                  type="tel"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                  placeholder="+1 (555)..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 ml-1">Interest</label>
              <div className="relative">
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer">
                  <option>3D Dental Implants</option>
                  <option>Veneers & Aesthetics</option>
                  <option>Digital Whitening</option>
                  <option>Full Mouth Reconstruction</option>
                </select>
                {/* Custom Chevron */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              </div>
            </div>

            {/* Button: Dark Slate for high contrast */}
            <button className="w-full bg-slate-900 text-white font-bold uppercase tracking-[0.2em] py-5 rounded-xl hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/20 transition-all duration-300 flex items-center justify-center gap-3 group mt-4">
              Send Request
              <span className="bg-white/20 p-1 rounded-full group-hover:bg-white group-hover:text-teal-600 transition-colors">
                <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}