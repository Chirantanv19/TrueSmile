export default function PrecisionStats() {
  return (
    <section className="py-24 bg-white/5 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { label: "Precision", value: "0.01mm" },
          { label: "Success Rate", value: "99.8%" },
          { label: "Digital Cases", value: "12k+" },
          { label: "Bio-Materials", value: "24k" },
        ].map((stat, i) => (
          <div key={i} className="text-center md:text-left">
            <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2 italic">
               {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#00f2ff] font-bold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}