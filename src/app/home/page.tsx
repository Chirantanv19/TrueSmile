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
                    <section className="relative w-full flex flex-col items-center pb-12">
                        {/* Mobile: Top Graphic (Teeth Radar) */}
                        <div className="md:hidden w-full h-[320px] bg-slate-900 overflow-hidden flex items-center justify-center relative mb-8">
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <div className="w-[120%] h-[120%] border border-white/30 rounded-full absolute" />
                                <div className="w-[80%] h-[80%] border border-white/20 rounded-full absolute" />
                            </div>
                            {/* Placeholder for 3D Teeth Image */}
                            <div className="relative z-10 w-48 h-32 bg-gradient-to-b from-slate-200 to-slate-400 opacity-90 rounded-[3rem] blur-sm shadow-[0_0_40px_rgba(255,255,255,0.2)] animate-pulse">
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold tracking-widest opacity-40">3D MODEL</div>
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="px-6 md:px-12 w-full max-w-7xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-[1px] w-12 bg-slate-400"></div>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                                    Est. 2026 • Swiss Precision
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-8xl leading-[0.9] text-slate-900 mb-8">
                                <span className="block font-sans font-bold tracking-tight">Smile</span>
                                <span className="block font-serif italic text-slate-400 font-light">Without</span>
                                <span className="block font-sans font-bold tracking-tight">Compromise</span>
                            </h1>

                            <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-md mb-8">
                                Merging anatomical data with architectural principles to engineer a smile that is unmistakably yours.
                            </p>

                            <div className="flex items-center justify-between md:justify-start md:gap-8">
                                <button onClick={() => router.push('/booking')} className="group flex items-center gap-2 bg-slate-900 text-white pl-4 pr-2 py-2 rounded-full shadow-xl">
                                    <span className="text-xs font-bold tracking-widest uppercase pl-2">Consultation</span>
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                                <button className="text-[10px] font-bold tracking-widest uppercase text-slate-900 border-b border-slate-300 pb-1">
                                    View Case Studies
                                </button>
                            </div>
                        </div>
                    </section>

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