"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is 3D Smile Design painful?", a: "Not at all. The 3D mapping process is 100% non-invasive and digital." },
  { q: "How long does the transformation take?", a: "Most patients complete their journey in 2-4 visits using our rapid-prototyping tech." },
  { q: "Do you offer international consultations?", a: "Yes, we offer virtual 3D consultations for our global clients." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black uppercase tracking-widest mb-12 text-center">Inquiries</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-white/10 pb-4">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center py-4 text-left group"
            >
              <span className="text-lg font-bold group-hover:text-cyan-400 transition">{faq.q}</span>
              {openIndex === i ? <Minus size={20}/> : <Plus size={20}/>}
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden text-gray-500 text-sm leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}