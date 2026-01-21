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
    // Changed: bg-[#080808] -> bg-slate-50, border-white/10 -> border-slate-200
    <section className="relative py-24 border-y border-slate-200 bg-slate-50 overflow-hidden">

      {/* Background Tech Grid Pattern - Light Mode (Dark dots on light bg) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Changed: divide-white/10 -> divide-slate-200 */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">

          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center p-8 ${i % 2 === 0 ? '' : 'md:border-none'}`}>

              {/* Changed: text-white -> text-slate-900 */}
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-2 flex items-baseline">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              <div className="flex flex-col items-center gap-1">
                {/* Changed: text-[#00f2ff] -> text-teal-600 */}
                <span className="text-teal-600 text-[10px] font-bold uppercase tracking-[0.25em]">
                  {stat.label}
                </span>
                {/* Changed: text-gray-600 -> text-slate-400 */}
                <span className="text-slate-400 text-[9px] uppercase tracking-widest font-medium hidden md:block">
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