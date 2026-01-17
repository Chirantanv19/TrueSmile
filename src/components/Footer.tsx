import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-12 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-20">
        <div>
          <div className="text-2xl font-black tracking-tighter mb-6">TRUE<span className="text-cyan-400">SMILE</span></div>
          <p className="text-gray-500 text-xs tracking-widest leading-loose uppercase">
            Architecting the future of human aesthetics through digital precision.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-cyan-400">Services</a>
            <a href="#" className="hover:text-cyan-400">Case Studies</a>
            <a href="#" className="hover:text-cyan-400">Privacy</a>
          </div>
          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-cyan-400">Instagram</a>
            <a href="#" className="hover:text-cyan-400">LinkedIn</a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Based in</p>
          <p className="text-sm font-bold uppercase">Bengaluru, India</p>
        </div>
      </div>
      <div className="text-center text-[10px] tracking-[0.8em] text-white/20 uppercase border-t border-white/5 pt-12">
        ESTABLISHED 2026 • ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}