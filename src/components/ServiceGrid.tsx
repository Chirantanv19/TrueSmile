import { Shield, Sparkles, Zap, CreditCard, HeartPulse } from 'lucide-react';

export default function ServiceGrid() {
  const services = [
    {
      title: "3D Implants",
      icon: <Zap />,
      desc: "Anatomic precision mapping.",
      // Changed to use your 'accent' color from globals.css
      size: "md:col-span-2 md:row-span-2 bg-accent text-black",
      isDark: false
    },
    {
      title: "Digital Whitening",
      icon: <Sparkles />,
      desc: "Laser-guided shade matching.",
      size: "col-span-1 bg-white/5",
      isDark: true
    },
    {
      title: "24/7 Support",
      icon: <HeartPulse />,
      desc: "Emergency dental line.",
      size: "col-span-1 bg-white/5",
      isDark: true
    },
    {
      title: "Insurance",
      icon: <Shield />,
      desc: "95% Providers Accepted.",
      size: "col-span-1 bg-white/5",
      isDark: true
    },
    {
      title: "Flex Pay",
      icon: <CreditCard />,
      desc: "0% EMI options available.",
      size: "col-span-1 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
      isDark: true
    },
  ];

  return (
    <section className="py-24 px-12 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {services.map((s, i) => (
          <div
            key={i}
            className={`
              ${s.size} 
              p-8 rounded-[32px] border border-white/5 
              flex flex-col justify-between 
              hover:scale-[1.02] hover:border-accent/50 
              transition-all duration-500 group
            `}
          >
            {/* Icon color changes based on background */}
            <div className={`${s.isDark ? 'text-accent' : 'text-black'} transition-colors`}>
              {s.icon}
            </div>

            <div>
              <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">
                {s.title}
              </h3>
              <p className={`text-sm font-medium ${s.isDark ? 'text-gray-400' : 'text-black/70'}`}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}