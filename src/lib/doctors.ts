// lib/doctors.ts

export interface Doctor {
    id: string;
    name: string;
    role: string;
    image: string;
    stars: number;
    description: string;
    stats: {
        label: string;
        value: string;
    }[];
}

// lib/doctors.ts

export const doctors: Doctor[] = [
    {
        id: "aryan-sterling",
        name: "Dr. Aryan Sterling",
        role: "Lead Aesthetic Architect",
        // NEW IMAGE: Male, professional, confident lighting
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop",
        stars: 5,
        description: "With over 15 years of reconstructive experience, Dr. Sterling treats teeth as structural art. Fellow of the Global Institute.",
        stats: [
            { label: "IVY League Grad", value: "Columbia" },
            { label: "Smiles Built", value: "12k+" }
        ]
    },
    // ... (Elara and Julian stay the same)
    {
        id: "elara-vance",
        name: "Dr. Elara Vance",
        role: "Orthodontic Visionary",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1000&auto=format&fit=crop",
        stars: 5,
        description: "Specializing in invisible alignment and facial symmetry. Dr. Vance pioneers non-invasive structural correction techniques.",
        stats: [
            { label: "Awards Won", value: "15+" },
            { label: "Happy Teens", value: "8k+" }
        ]
    },
    {
        id: "julian-thorne",
        name: "Dr. Julian Thorne",
        role: "Implant Specialist",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop",
        stars: 5,
        description: "Restoring full function with military-grade precision. Dr. Thorne is the region's leading expert in titanium osseointegration.",
        stats: [
            { label: "Implants Set", value: "5000+" },
            { label: "Success Rate", value: "99.8%" }
        ]
    },
    {
        id: "sophia-kang",
        name: "Dr. Sophia Kang",
        role: "Pediatric Gentle Care",
        // Updated high-resolution professional image
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1000&auto=format&fit=crop",
        stars: 5,
        description: "Creating a fear-free environment for the next generation. Focused on preventative care and early alignment intervention.",
        stats: [
            { label: "Kids Treated", value: "20k+" },
            { label: "Pain Free", value: "100%" }
        ]
    },
    {
        id: "marcus-reynolds",
        name: "Dr. Marcus Reynolds",
        role: "Cosmetic Surgeon",
        // (This one was working, but just in case, here is a backup male ID if needed: photo-1537368910025-700350fe46c7)
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop",
        stars: 4,
        description: "Where science meets vanity. Dr. Reynolds specializes in veneers, whitening, and complete smile makeovers for celebrities.",
        stats: [
            { label: "Celeb Clients", value: "50+" },
            { label: "Years Exp", value: "20" }
        ]
    }
];