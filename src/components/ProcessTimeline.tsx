"use client"
import { motion } from "framer-motion"
import { ScanFace, Box, Printer } from "lucide-react"

const steps = [
  {
    no: "01",
    icon: <ScanFace size={28} />,
    title: "Neural Scan",
    desc: "40,000 data points captured in sub-millimeter precision using Lidar-assisted mapping."
  },
  {
    no: "02",
    icon: <Box size={28} />,
    title: "Digital Twin",
    desc: "We build a complete virtual architecture of your facial structure to simulate results before touching a tooth."
  },
  {
    no: "03",
    icon: <Printer size={28} />,
    title: "Bio-Fabrication",
    desc: "Final prosthetics are milled from aerospace-grade ceramic blocks for diamond-like durability."
  },
]

export default function ProcessTimeline() {
  return (
    // Changed: bg-white instead of dark background
    <section className="relative py-32 px-6 md:px-12 max-w-8xl mx-auto overflow-hidden bg-white">

      {/* Background Connecting Line (Desktop) - Changed to slate-100 */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-12 hidden md:block" />

      <div className="grid md:grid-cols-3 gap-16 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative"
          >
            {/* Step Number (Big & Stylized) - Changed to very light slate/teal */}
            <div className="absolute -top-14 -left-6 text-9xl font-black text-slate-50 group-hover:text-teal-50 transition-colors duration-500 select-none z-0">
              {step.no}
            </div>

            {/* Icon Box - Changed to white box with shadow */}
            <div className="relative z-10 w-16 h-16 bg-white border border-slate-200 shadow-lg shadow-slate-200/50 rounded-2xl flex items-center justify-center text-slate-400 mb-8 group-hover:border-teal-500 group-hover:text-teal-600 group-hover:scale-110 transition-all duration-500">
              {step.icon}
            </div>

            {/* Content */}
            <div className="relative z-10 pl-2">
              {/* Changed: text-slate-900 */}
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4 text-slate-900 transition-colors">
                {step.title}
              </h3>
              {/* Changed: text-slate-500, border-slate-200 */}
              <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-slate-200 pl-4 group-hover:border-teal-500 transition-colors">
                {step.desc}
              </p>
            </div>

            {/* Bottom Accent Line - Changed to Teal */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal-500 group-hover:w-full transition-all duration-700 ease-out mt-8" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}