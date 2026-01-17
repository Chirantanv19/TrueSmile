"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CompareSlider() {
  const [position, setPosition] = useState(50);

  return (
    <section className="py-24 px-12 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Visual Results</h2>
          <p className="text-gray-500 tracking-widest text-xs uppercase mt-2">Drag to see the TrueSmile difference</p>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          {/* AFTER IMAGE (The "Success") */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593022356769-11f09a79a24e?q=80&w=2000')` }}
          >
             <div className="absolute bottom-10 right-10 glass px-6 py-2 rounded-full text-xs font-bold">AFTER TRUESMILE</div>
          </div>
          
          {/* BEFORE IMAGE (The "Overlay") */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1593022356769-11f09a79a24e?q=80&w=2000')`,
              clipPath: `inset(0 ${100 - position}% 0 0)` 
            }}
          >
            <div className="absolute bottom-10 left-10 border border-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold bg-black/40">BEFORE TREATMENT</div>
          </div>

          {/* SLIDER HANDLE */}
          <input 
            type="range" 
            min="0" max="100" 
            value={position} 
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 z-20"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center border-cyan-400/50">
               <div className="flex gap-1">
                 <div className="w-1 h-1 bg-white rounded-full"></div>
                 <div className="w-1 h-1 bg-white rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}