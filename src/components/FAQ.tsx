"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is 3D Smile Design painful?",
    a: "Not at all. The 3D mapping process is 100% non-invasive and digital. We scan your structure without touching a single nerve."
  },
  {
    q: "How long does the transformation take?",
    a: "Most patients complete their journey in just 2-4 visits using our rapid-prototyping tech, compared to months with traditional methods."
  },
  {
    q: "Can I preview my smile before committing?",
    a: "Absolutely. Our 'Digital Twin' technology allows you to test-drive your new smile in a 3D simulation before we perform any actual work."
  },
  {
    q: "What materials do you use for veneers?",
    a: "We exclusively use high-grade lithium disilicate and feldspathic ceramics. These materials mimic natural enamel translucency and offer superior durability."
  },
  {
    q: "Do you offer international consultations?",
    a: "Yes, we prioritize our global clients. We can conduct a full preliminary assessment via 3D video link and coordinate your travel for the physical procedures."
  },
  {
    q: "Is there a warranty on the structural work?",
    a: "Yes. All our architectural procedures come with a 5-year structural integrity guarantee, provided you attend your bi-annual maintenance scans."
  },
  {
    q: "Do you offer sedation for anxious patients?",
    a: "We provide a full range of comfort options, from nitrous oxide to IV sedation, ensuring a zero-stress, sleep-like experience during treatment."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Header: Dark Slate */}
      <h2 className="text-3xl font-black uppercase tracking-widest mb-12 text-center text-slate-900">Inquiries</h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          // Border: Light Slate
          <div key={i} className="border-b border-slate-200 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center py-4 text-left group"
            >
              {/* Question: Dark Slate -> Teal Hover */}
              <span className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors pr-8">
                {faq.q}
              </span>

              {/* Icon: Teal with light background pill */}
              <div className="shrink-0 text-teal-600 bg-teal-50 p-2 rounded-full group-hover:bg-teal-100 transition-colors">
                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
              </div>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {/* Answer: Slate 500 (Soft Grey) */}
                  <p className="text-slate-500 text-sm leading-relaxed pb-4 pr-8 pl-1">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}