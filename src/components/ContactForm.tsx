"use client"
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="py-24 px-12 bg-white/5 rounded-[60px] mx-6 mb-12 border border-white/10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left: Branding & Info */}
        <div>
          <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase">Ready for <br/> <span className="text-cyan-400">The Change?</span></h2>
          <p className="text-gray-400 text-lg mb-12 max-w-sm">Reserve your diagnostic 3D scan today. Our specialists will contact you within 24 hours.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-bold tracking-widest">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-cyan-400"><MapPin size={20}/></div>
              123 ART DISTRICT, BEVERLY HILLS, CA
            </div>
            <div className="flex items-center gap-4 text-sm font-bold tracking-widest">
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-cyan-400"><Phone size={20}/></div>
              +1 (800) TRUE-SMILE
            </div>
          </div>
        </div>

        {/* Right: Modern Form */}
        <div className="glass p-10 rounded-[40px] border-white/20">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-400 outline-none transition" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Phone</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-400 outline-none transition" placeholder="+1..." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Interest</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-cyan-400 outline-none transition appearance-none">
                <option className="bg-black">3D Dental Implants</option>
                <option className="bg-black">Veneers & Aesthetics</option>
                <option className="bg-black">Digital Whitening</option>
              </select>
            </div>

            <button className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-6 rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 group">
              Send Request <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}