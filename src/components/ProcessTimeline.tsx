"use client"
import { motion } from "framer-motion"
import { ScanFace, Box, Printer } from "lucide-react"

const steps = [
  {
    no: "01",
    icon: <ScanFace size={32} />,
    title: "Neural Scan",
    desc: "40,000 data points captured in sub-millimeter precision using Lidar-assisted mapping."
  },
  {
    no: "02",
    icon: <Box size={32} />,
    title: "Digital Twin",
    desc: "We build a complete virtual architecture of your facial structure to simulate results before touching a tooth."
  },
  {
    no: "03",
    icon: <Printer size={32} />,
    title: "Bio-Fabrication",
    desc: "Final prosthetics are milled from aerospace-grade ceramic blocks for diamond-like durability."
  },
]

export default function ProcessTimeline() {
  return (
    <section className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* Background Connecting Line (Desktop) */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-12 hidden md:block" />

      <div className="grid md:grid-cols-3 gap-12 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative"
          >
            {/* Step Number (Big & Stylized) */}
            <div className="absolute -top-16 -left-4 text-9xl font-black text-white/[0.03] group-hover:text-[#00f2ff]/10 transition-colors duration-500 select-none z-0">
              {step.no}
            </div>

            {/* Icon Box */}
            <div className="relative z-10 w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:border-[#00f2ff] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)] transition-all duration-500">
              <div className="group-hover:text-[#00f2ff] transition-colors duration-300">
                {step.icon}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 pl-2">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4 group-hover:text-white transition-colors text-gray-200">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#00f2ff]/50 transition-colors">
                {step.desc}
              </p>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00f2ff] group-hover:w-full transition-all duration-700 ease-out mt-8" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}