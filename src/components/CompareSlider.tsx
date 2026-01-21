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
        // Increment time for the sine wave
        timeRef.current += 0.01;
        // Calculate position: Center (50) + Range (45) * Sin(time)
        // This creates a smooth oscillation between 5% and 95%
        const newPos = 50 + 45 * Math.sin(timeRef.current);
        setPosition(newPos);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation if not hovering
    if (!isHovering) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Stop animation if hovering
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovering]);

  return (
    // Reduced padding (py-12 instead of py-24) to keep it compact
    <section className="py-12 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Compact Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              Visual <span className="text-outline">Results</span>
            </h2>
            <p className="text-gray-500 tracking-[0.2em] text-[10px] uppercase mt-2">
              {isHovering ? "Manual Control Active" : "Auto-Scanning Mode"}
            </p>
          </div>
          <div className="hidden md:block glass px-4 py-2 rounded-xl text-[9px] tracking-widest text-gray-400 uppercase border-white/5">
            Phase 01 — Structural Alignment
          </div>
        </div>

        {/* Height Constrained Container */}
        <div
          className="relative aspect-[21/9] max-h-[450px] w-full rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group cursor-ew-resize"
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
            <div className="absolute bottom-6 right-6 glass px-4 py-1.5 rounded-full text-[9px] tracking-widest font-bold uppercase z-10">
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
            <div className="absolute bottom-6 left-6 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] tracking-widest font-bold bg-black/40 uppercase">
              Before
            </div>
          </div>

          {/* SLIDER CONTROL (Invisible Range Input) */}
          <div className="absolute inset-0 z-30">
            <input
              type="range"
              min="0" max="100"
              value={position}
              onChange={(e) => {
                setIsHovering(true); // Ensure manual control takes over immediately
                setPosition(Number(e.target.value));
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>

          {/* VISUAL LINE & HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-[#00f2ff] z-20 pointer-events-none shadow-[0_0_15px_rgba(0,242,255,0.5)]"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center border-[#00f2ff]/30 shadow-[0_0_20px_rgba(0,242,255,0.2)] transition-transform duration-200 scale-100 group-hover:scale-110">
              <div className="flex gap-1">
                <div className="w-0.5 h-3 bg-white/90 rounded-full"></div>
                <div className="w-0.5 h-3 bg-white/90 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}