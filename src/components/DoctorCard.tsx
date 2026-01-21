"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Doctor } from "@/lib/doctors"; // Import the type

interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    // Magnetic effect logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Reduced rotation range for a more stable, elegant feel
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-5xl mx-auto p-4">

            {/* 3D Card Area */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                // Changed: Dark Gradient -> White bg with soft shadow
                className="relative w-full max-w-[350px] aspect-[3/4] rounded-[32px] bg-white overflow-hidden border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] shrink-0 group"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105"
                    style={{ backgroundImage: `url('${doctor.image}')` }}
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-90" />

                <div style={{ transform: "translateZ(30px)" }} className="absolute bottom-8 left-8 pr-4">
                    <h3 className="text-3xl font-bold tracking-tight text-white leading-none mb-2">
                        {doctor.name}
                    </h3>
                    {/* Changed: Cyan -> Teal-200 (Light Teal for dark bg contrast) */}
                    <p className="text-teal-200 font-bold tracking-[0.2em] text-[10px] uppercase">
                        {doctor.role}
                    </p>
                </div>
            </motion.div>

            {/* Info Area */}
            <div className="flex-1 max-w-lg flex flex-col justify-center">
                <div className="flex gap-1 mb-4">
                    {[...Array(doctor.stars)].map((_, i) => (
                        // Changed: Cyan -> Yellow (Gold Standard)
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>

                {/* Changed: Text White -> Slate-900 */}
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">
                    The Person Behind <br />
                    <span className="text-teal-600 font-serif italic">The Science.</span>
                </h2>

                {/* Changed: Text Gray-400 -> Slate-500 */}
                <p className="text-slate-500 leading-relaxed mb-8 text-lg font-light">
                    {doctor.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {doctor.stats.map((stat, index) => (
                        // Changed: Dark glass -> Light card
                        <div key={index} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <Award className="text-teal-600 mb-2 w-5 h-5" />
                            <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* The New Button - Changed to Slate-900 */}
                <Link href={`/doctors/${doctor.id}`}>
                    <button className="group flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full transition-all w-fit shadow-lg shadow-slate-900/20">
                        View Full Profile
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
}