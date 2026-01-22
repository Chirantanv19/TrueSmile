"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceGrid from "@/components/ServiceGrid";
import CompareSlider from "@/components/CompareSlider";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import DoctorCarousel from "@/components/DoctorCarousel";

// NEW COMPONENTS
import ProcessTimeline from "@/components/ProcessTimeline";
import PrecisionStats from "@/components/PrecisionStats";
import TheLab from "@/components/TheLab";
import { ArrowRight } from "lucide-react"; // Import for the button arrow

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (window.scrollY === 0 && e.deltaY < -20) {
                // Optional: Logic to go back if needed
            }
        };
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [router]);

    return (
        <SmoothScroll>
            <main className="bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white relative">

                {/* TEXTURE: Subtle grain overlay */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply z-0 fixed"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 transition-all">
                    <div className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1" onClick={() => router.push('/')}>
                        TRUE<span className="text-teal-600">SMILE</span>
                    </div>
                    <div className="hidden md:block text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        Architecture of Aesthetics
                    </div>
                </nav>

                <div className="pt-24 relative z-10">

                    {/* =========================================================
                        1. NEW HERO SECTION (Matches your first Screenshot)
                       ========================================================= */}
                    

                    {/* 2. Stats */}
                    <div className="bg-white border-b border-slate-200 shadow-sm">
                        <PrecisionStats />
                    </div>

                    {/* 3. Services */}
                    <section id="tech">
                        <ServiceGrid />
                    </section>

                    {/* 4. The Lab */}
                    <div className="bg-white border-y border-slate-200">
                        <TheLab />
                    </div>

                    {/* 5. Process */}
                    <ProcessTimeline />

                    {/* 6. Results */}
                    <section id="results" className="bg-slate-100 border-y border-slate-200 py-12">
                        <CompareSlider />
                    </section>

                    {/* 7. Doctors Section - UPDATED FOR MOBILE */}
                    <section id="team" className="py-12 md:py-24 bg-slate-100 border-y border-slate-200 overflow-hidden">
                        <div className="max-w-7xl mx-auto w-full space-y-8 md:space-y-12">
                            {/* Added px-6 to ensure header doesn't touch edge */}
                            <h2 className="text-3xl md:text-6xl font-black text-center uppercase tracking-tighter text-slate-900 px-6">
                                Meet The <span className="text-teal-600 font-serif italic">Architects</span>
                            </h2>

                            {/* Removed px-2 to allow full width swipe on mobile, handled container in component */}
                            <div className="w-full px-0 md:px-6">
                                <DoctorCarousel />
                            </div>
                        </div>
                    </section>

                    {/* 8. FAQ */}
                    <div className="bg-slate-100 border-b border-slate-200">
                        <FAQ />
                    </div>

                    {/* 9. Contact */}
                    <section id="contact" className="py-24 bg-slate-50">
                        <div className="max-w-4xl mx-auto px-6">
                            <ContactForm />
                        </div>
                    </section>
                </div>

                <Footer />
            </main>
        </SmoothScroll>
    );
}