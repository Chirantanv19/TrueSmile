"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceGrid from "@/components/ServiceGrid";
import CompareSlider from "@/components/CompareSlider";
import DoctorCard from "@/components/DoctorCard"; // Ensure this component accepts the 'doctor' prop now
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import DoctorCarousel from "@/components/DoctorCarousel";

// NEW COMPONENTS
import ProcessTimeline from "@/components/ProcessTimeline";
import PrecisionStats from "@/components/PrecisionStats";
import TheLab from "@/components/TheLab";

// DATA IMPORT
import { doctors } from "@/lib/doctors"; // Import the seed data

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (window.scrollY === 0 && e.deltaY < -20) {
                router.push("/");
            }
        };
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [router]);

    return (
        <SmoothScroll>
            <main className="bg-[#050505] text-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-8 backdrop-blur-md border-b border-white/5">
                    <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => router.push('/')}>
                        TRUE<span className="text-[#00f2ff]">SMILE</span>
                    </div>
                    <div className="hidden md:block text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        Architecture of Aesthetics
                    </div>
                </nav>

                {/* --- PAGE BUILD --- */}
                <div className="pt-32">
                    <PrecisionStats />    {/* Authority First */}

                    <section id="tech" className="py-24">
                        <ServiceGrid />
                    </section>

                    <TheLab />            {/* Big Visual Break */}

                    <ProcessTimeline />   {/* Detailed Process */}

                    <section id="results" className="py-24">
                        <CompareSlider />
                    </section>

                    {/* --- UPDATED DOCTORS SECTION --- */}
                    <section id="team" className="py-24 px-6 min-h-[800px] flex flex-col justify-center">
                        <div className="max-w-7xl mx-auto w-full">
                            <h2 className="text-4xl md:text-6xl font-black text-center mb-12 uppercase tracking-tighter">
                                Meet The <span className="text-[#00f2ff]">Architects</span>
                            </h2>

                            {/* Replaced the map with the Carousel */}
                            <DoctorCarousel />

                        </div>
                    </section>
                    {/* ------------------------------- */}

                    <FAQ />

                    <section id="contact" className="py-24">
                        <ContactForm />
                    </section>
                </div>

                <Footer />
            </main>
        </SmoothScroll>
    );
}