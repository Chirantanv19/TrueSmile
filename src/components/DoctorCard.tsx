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
       <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-5xl mx-auto p-4">

            {/* 3D Card Area */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full max-w-[350px] aspect-[3/4] rounded-[30px] bg-gradient-to-br from-gray-800 to-black overflow-hidden border border-white/10 shrink-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url('${doctor.image}')` }}
                />

                <div style={{ transform: "translateZ(50px)" }} className="absolute bottom-8 left-8 pr-4">
                    <h3 className="text-3xl font-black tracking-tighter text-white uppercase leading-none mb-1">
                        {doctor.name}
                    </h3>
                    <p className="text-cyan-400 font-bold tracking-[0.2em] text-[10px] uppercase">
                        {doctor.role}
                    </p>
                </div>
            </motion.div>

            {/* Info Area */}
            <div className="flex-1 max-w-lg flex flex-col justify-center">
                <div className="flex gap-1 mb-4">
                    {[...Array(doctor.stars)].map((_, i) => (
                        <Star key={i} size={16} className="fill-cyan-400 text-cyan-400" />
                    ))}
                </div>

                <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase text-white">
                    The Man Behind <br /> The Science.
                </h2>

                <p className="text-gray-400 leading-relaxed mb-6 text-base">
                    {doctor.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {doctor.stats.map((stat, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                            <Award className="text-cyan-400 mb-2 w-5 h-5" />
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* The New Button */}
                <Link href={`/doctors/${doctor.id}`}>
                    <button className="group flex items-center gap-3 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all w-fit">
                        View Full Profile
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
}