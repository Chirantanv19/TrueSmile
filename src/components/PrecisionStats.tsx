"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Helper component to handle the number animation
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format decimal if needed, otherwise integer
        const isFloat = value % 1 !== 0;
        ref.current.textContent = isFloat ? latest.toFixed(1) : Math.floor(latest).toString();
      }
    });
  }, [springValue, value]);

  return (
    <span className="flex">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
};

export default function PrecisionStats() {
  const stats = [
    { label: "Precision", value: 0.01, suffix: "mm", description: "Laser Tolerance" },
    { label: "Success Rate", value: 99.8, suffix: "%", description: "Patient Satisfaction" },
    { label: "Digital Cases", value: 12, suffix: "k+", description: "Smiles Architected" },
    { label: "Bio-Materials", value: 24, suffix: "k", description: "Ceramic Units Milled" },
  ];

  return (
    <section className="relative py-20 border-y border-white/10 bg-[#080808] overflow-hidden">

      {/* Background Tech Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">

          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center p-8 ${i % 2 === 0 ? '' : 'md:border-none'}`}> {/* Mobile specific styling adjustment can go here if needed, but standard grid gap works well */}

              <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2 flex items-baseline">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[#00f2ff] text-[10px] font-bold uppercase tracking-[0.25em]">
                  {stat.label}
                </span>
                <span className="text-gray-600 text-[9px] uppercase tracking-widest font-medium hidden md:block">
                  {stat.description}
                </span>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}