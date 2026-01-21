"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // 1. Import Variants type
import { ChevronUp, ChevronDown } from "lucide-react";
import DoctorCard from "./DoctorCard";
import { doctors } from "@/lib/doctors";

export default function DoctorCarousel() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextDoctor();
        }, 6000);
        return () => clearInterval(timer);
    }, [index]);

    const nextDoctor = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % doctors.length);
    };

    const prevDoctor = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    };

    // 2. Explicitly type this object as 'Variants'
    const variants: Variants = {
        enter: (direction: number) => ({
            y: direction > 0 ? 120 : -120,
            opacity: 0,
            scale: 0.8,
            rotateX: direction > 0 ? -45 : 45,
        }),
        center: {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            zIndex: 1,
            transition: {
                y: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.4 },
                rotateX: { duration: 0.6 },
            },
        },
        exit: (direction: number) => ({
            y: direction > 0 ? -120 : 120,
            opacity: 0,
            scale: 0.8,
            rotateX: direction > 0 ? 45 : -45,
            zIndex: 0,
            transition: {
                y: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.4 },
            },
        }),
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center perspective-[1000px]">

            {/* Navigation Controls */}
            <div className="hidden md:flex flex-col gap-4 absolute left-0 top-1/2 -translate-y-1/2 z-20">
                <button
                    onClick={prevDoctor}
                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500 hover:text-black transition-all"
                >
                    <ChevronUp />
                </button>
                <div className="flex flex-col items-center gap-2">
                    {doctors.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-cyan-400 h-4' : 'bg-gray-700'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextDoctor}
                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500 hover:text-black transition-all"
                >
                    <ChevronDown />
                </button>
            </div>

            {/* The Wheel Window */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={doctors[index].id}
                        custom={direction}
                        variants={variants} // 3. The error should be gone now
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute w-full flex justify-center"
                    >
                        <DoctorCard doctor={doctors[index]} />
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}