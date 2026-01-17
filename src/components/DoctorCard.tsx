"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Star } from "lucide-react";

export default function DoctorCard() {
    // Magnetic effect logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="py-24 px-12 flex flex-col md:flex-row gap-16 items-center max-w-6xl mx-auto">
            {/* Global Mouse Follower Glow (Optional but very cool) */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full md:w-[400px] aspect-[3/4] rounded-[40px] bg-gradient-to-br from-gray-800 to-black overflow-hidden border border-white/10"
            >
                {/* Replace this with a real photo of a dentist in a dark studio setting */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" />

                <div style={{ transform: "translateZ(50px)" }} className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-black tracking-tighter">DR. ARYAN STERLING</h3>
                    <p className="text-cyan-400 font-bold tracking-[0.2em] text-[10px] uppercase">Lead Aesthetic Architect</p>
                </div>
            </motion.div>

            <div className="flex-1">
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-cyan-400 text-cyan-400" />)}
                </div>
                <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase">The Man Behind <br /> The Science.</h2>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                    With over 15 years of reconstructive experience, Dr. Sterling treats teeth as structural art. He is a fellow of the Global Institute of Dental Architecture.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="glass p-4 rounded-2xl">
                        <Award className="text-cyan-400 mb-2" />
                        <p className="text-xs font-bold uppercase">IVY League Grad</p>
                    </div>
                    <div className="glass p-4 rounded-2xl">
                        <Award className="text-cyan-400 mb-2" />
                        <p className="text-xs font-bold uppercase">12k+ Smiles Built</p>
                    </div>
                </div>
            </div>
        </section>
    );
}