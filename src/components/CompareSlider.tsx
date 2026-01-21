"use client"
import { useState, useEffect, useRef } from 'react';

export default function CompareSlider() {
  const [position, setPosition] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const beforeImage = "/teeth1.png";
  const afterImage = "/teeth2.png";

  // Auto-Move Animation Logic
  useEffect(() => {
    const animate = () => {
      if (!isHovering) {
        timeRef.current += 0.01;
        const newPos = 50 + 45 * Math.sin(timeRef.current);
        setPosition(newPos);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!isHovering) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovering]);

  return (
    // Changed: bg-background (dark) -> bg-white
    <section className="py-24 px-6 md:px-12 bg-white relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Compact Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* Changed: Text Slate-900, Teal Serif Accent */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 uppercase">
              Visual <span className="text-teal-600 font-serif italic">Results</span>
            </h2>
            <p className="text-slate-400 tracking-widest text-[10px] uppercase mt-2 font-bold">
              {isHovering ? "Manual Control Active" : "Auto-Scanning Mode"}
            </p>
          </div>
          {/* Changed: Glass -> Clean Slate Badge */}
          <div className="hidden md:block bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-[10px] tracking-widest text-slate-500 uppercase font-bold">
            Phase 01 — Structural Alignment
          </div>
        </div>

        {/* Image Container */}
        <div
          // Changed: Border/Shadows to soft medical look
          className="relative aspect-[21/9] max-h-[450px] w-full rounded-[32px] overflow-hidden border border-slate-200 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] bg-slate-100 group cursor-ew-resize"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
        >

          {/* AFTER IMAGE (Background) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={afterImage}
              alt="After"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
            {/* Changed: Label to White Badge */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase z-10 text-slate-900 shadow-sm">
              After
            </div>
          </div>

          {/* BEFORE IMAGE (Clipped overlay) */}
          <div
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={beforeImage}
              alt="Before"
              className="w-full h-full object-cover object-center"
            />
            {/* Changed: Label to Dark Slate Badge for contrast */}
            <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold text-white uppercase shadow-sm">
              Before
            </div>
          </div>

          {/* SLIDER CONTROL (Invisible) */}
          <div className="absolute inset-0 z-30">
            <input
              type="range"
              min="0" max="100"
              value={position}
              onChange={(e) => {
                setIsHovering(true);
                setPosition(Number(e.target.value));
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>

          {/* VISUAL LINE & HANDLE */}
          <div
            // Changed: Neon Blue -> Clean White Line with shadow
            className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.2)]"
            style={{ left: `${position}%` }}
          >
            {/* Changed: Handle to White Circle with Slate Notches */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-200 scale-100 group-hover:scale-110">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-slate-300 rounded-full"></div>
                <div className="w-0.5 h-4 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}