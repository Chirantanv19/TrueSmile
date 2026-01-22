"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Doctor } from "@/lib/doctors";

interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

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
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-12 items-center justify-center w-full max-w-6xl mx-auto px-4 py-4 lg:py-8">

            {/* 3D Card Area */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                // UPDATED: max-w-[250px] for mobile (smaller), sm:max-w-[320px] for tablet/desktop
                className="relative w-full max-w-[200px] sm:max-w-[250px] aspect-[3/4] rounded-2xl lg:rounded-[32px] bg-white overflow-hidden border border-slate-200 shadow-xl shrink-0 group"
            >
                <div
                    className="absolute inset-0 transition-all duration-700 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105"
                    style={{
                        backgroundImage: `url('${doctor.image}')`,
                        backgroundPosition: 'center 20%',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />

                {/* UPDATED: Adjusted positioning for smaller mobile card */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 z-10">
                    {/* UPDATED: text-xl for mobile, text-3xl for desktop */}
                    <h3 className="text-xl lg:text-3xl font-bold tracking-tight text-white leading-tight mb-1 lg:mb-2">
                        {doctor.name}
                    </h3>
                    <p className="text-teal-300 font-bold tracking-[0.2em] text-[9px] lg:text-[10px] uppercase">
                        {doctor.role}
                    </p>
                </div>
            </motion.div>

            {/* Info Area */}
            <div className="flex-1 max-w-xl flex flex-col justify-center w-full">
                <div className="flex gap-1 mb-3 lg:mb-4">
                    {[...Array(doctor.stars)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 lg:mb-4 text-slate-900 leading-tight">
                    The Person Behind <br />
                    <span className="text-teal-600 font-serif italic">The Science.</span>
                </h2>

                <p className="text-slate-600 leading-relaxed mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg font-light">
                    {doctor.description}
                </p>

                <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                    {doctor.stats.map((stat, index) => (
                        <div key={index} className="bg-white border border-slate-200 p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-all">
                            <Award className="text-teal-600 mb-2 w-4 h-4 lg:w-5 lg:h-5" />
                            <p className="text-lg lg:text-xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-[9px] lg:text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <Link href={`/doctors/${doctor.id}`} className="w-full sm:w-auto">
                    <button className="group flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-slate-900 hover:bg-slate-800 text-white text-sm lg:text-base font-semibold rounded-full transition-all w-full sm:w-auto shadow-lg shadow-slate-900/20">
                        View Full Profile
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
}