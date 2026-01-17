import { Shield, Sparkles, Zap, Clock, CreditCard, HeartPulse } from 'lucide-react';

export default function ServiceGrid() {
  const services = [
    { title: "3D Implants", icon: <Zap />, desc: "Anatomic precision mapping.", size: "col-span-2 row-span-2 bg-cyan-500 text-black" },
    { title: "Digital Whitening", icon: <Sparkles />, desc: "Laser-guided shade matching.", size: "col-span-1 bg-white/5" },
    { title: "24/7 Support", icon: <HeartPulse />, desc: "Emergency dental line.", size: "col-span-1 bg-white/5" },
    { title: "Insurance", icon: <Shield />, desc: "95% Providers Accepted.", size: "col-span-1 bg-white/5" },
    { title: "Flex Pay", icon: <CreditCard />, desc: "0% EMI options available.", size: "col-span-1 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]" },
  ];

  return (
    <section className="py-24 px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {services.map((s, i) => (
          <div key={i} className={`${s.size} p-8 rounded-[32px] border border-white/5 flex flex-col justify-between hover:border-cyan-400/30 transition-all duration-500`}>
            <div className="mb-8">{s.icon}</div>
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">{s.title}</h3>
              <p className={`text-sm ${s.bg === 'bg-cyan-500' ? 'text-black/70' : 'text-gray-500'}`}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}