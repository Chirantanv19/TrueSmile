export default function TheLab() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none flex items-center justify-center">
        <h2 className="text-[20vw] font-black leading-none text-white whitespace-nowrap opacity-10 uppercase tracking-tighter">
          DIGITAL PRECISION • DIGITAL PRECISION
        </h2>
      </div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
          Architecting <span className="text-outline">Confidence.</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto uppercase tracking-widest text-[10px] leading-loose">
          Our laboratory uses CNC milling and 8K 3D printing to ensure every aesthetic decision is backed by mathematical certainty.
        </p>
      </div>
    </section>
  );
}