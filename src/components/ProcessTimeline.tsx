// "use client"
// import { motion } from "framer-motion";

// const steps = [
//   { no: "01", title: "Neural Scan", desc: "40,000 data points captured in sub-millimeter precision." },
//   { no: "02", title: "3D Prototyping", desc: "Digital architecture of your smile designed in a virtual environment." },
//   { no: "03", title: "Bio-Material Print", desc: "Custom veneers milled from aerospace-grade ceramic." },
// ];

// export default function ProcessTimeline() {
//   return (
//     <section className="py-32 px-12 max-w-7xl mx-auto">
//       <div className="grid md:grid-cols-3 gap-12">
//         {steps.map((step, i) => (
//           <motion.div 
//             key={i}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.2 }}
//             className="group"
//           >
//             <div className="text-6xl font-black text-white/5 group-hover:text-[#00f2ff]/20 transition-colors duration-500 mb-4">
//               {step.no}
//             </div>
//             <h3 className="text-xl font-bold uppercase tracking-widest mb-4">{step.title}</h3>
//             <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
//             <div className="mt-6 h-[1px] w-full bg-white/10 group-hover:bg-[#00f2ff]/50 transition-all duration-700" />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }