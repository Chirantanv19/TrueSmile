"use client";
import { Shield, Sparkles, Zap, CreditCard, HeartPulse } from 'lucide-react';

export default function ServiceGrid() {
  const services = [
    {
      title: "3D Implants",
      icon: <Zap />,
      desc: "Anatomic precision mapping.",
      // Featured Card: Medical Teal background, White text
      size: "md:col-span-2 md:row-span-2 bg-teal-600 text-white shadow-lg shadow-teal-900/20",
      isDark: false
    },
    {
      title: "Digital Whitening",
      icon: <Sparkles />,
      desc: "Laser-guided shade matching.",
      // Standard Card: White background, Slate border
      size: "col-span-1 bg-white border border-slate-200 shadow-sm",
      isDark: true
    },
    {
      title: "24/7 Support",
      icon: <HeartPulse />,
      desc: "Emergency dental line.",
      size: "col-span-1 bg-white border border-slate-200 shadow-sm",
      isDark: true
    },
    {
      title: "Insurance",
      icon: <Shield />,
      desc: "95% Providers Accepted.",
      size: "col-span-1 bg-white border border-slate-200 shadow-sm",
      isDark: true
    },
    {
      title: "Flex Pay",
      icon: <CreditCard />,
      desc: "0% EMI options available.",
      size: "col-span-1 bg-white border border-slate-200 shadow-sm",
      isDark: true
    },
  ];

  return (
    // Changed: bg-slate-50 to provide contrast against the white cards
    <section className="py-24 px-6 md:px-12 relative z-10 bg-slate-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className={`
              ${s.size} 
              p-8 rounded-[32px] 
              flex flex-col justify-between 
              hover:shadow-xl hover:-translate-y-1 
              transition-all duration-500 group
            `}
          >
            {/* Icon Wrapper: Adapts to card type */}
            <div className={`
              w-fit p-3 rounded-xl transition-colors duration-300
              ${s.isDark
                ? 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white' // Standard Card Behavior
                : 'bg-white/20 text-white backdrop-blur-sm' // Featured Card Behavior
              }
            `}>
              {s.icon}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tight leading-none">
                {s.title}
              </h3>
              <p className={`text-sm font-medium ${s.isDark ? 'text-slate-500' : 'text-teal-50'}`}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}