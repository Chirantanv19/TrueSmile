"use server";

import { db } from "@/db";
import { appointments } from "@/db/schema";
import { bookingSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ❌ REMOVED: Import of sendConfirmationEmail / sendConfirmationWhatsApp
// import { sendConfirmationEmail, sendConfirmationWhatsApp } from "./notifications"; 

export type BookingState = {
    success?: boolean;
    message?: string;
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        requestedDate?: string[];
    };
};

const confirmSchema = z.object({
    id: z.number(),
    slotStart: z.string(),
    slotEnd: z.string(),
});

// --- ACTION: Confirm Booking ---
export async function confirmBooking(prevState: any, formData: FormData) {
    console.log("\n🛑 --- STARTED CONFIRM ACTION (MANUAL MODE) --- 🛑");

    const id = Number(formData.get("id"));
    const slotStart = String(formData.get("slotStart"));
    const slotEnd = String(formData.get("slotEnd"));

    const validation = confirmSchema.safeParse({ id, slotStart, slotEnd });
    if (!validation.success) {
        return { success: false, message: "Invalid time slots provided." };
    }

    try {
        // 1. Perform Update
        await db
            .update(appointments)
            .set({
                status: "CONFIRMED",
                slotStart: new Date(slotStart),
                slotEnd: new Date(slotEnd),
            })
            .where(eq(appointments.id, id));

        console.log("✅ DB Update Successful.");

        // ❌ REMOVED: The automated Email/WhatsApp sending block

        revalidatePath("/admin/dashboard/appointments");
        return { success: true, message: "Confirmed! Please send manual notifications now." };

    } catch (error) {
        console.error("💥 SERVER ACTION CRASHED:", error);
        return { success: false, message: "Server Error during confirmation." };
    }
}

// ... (createBooking remains unchanged) ...
export async function createBooking(prevState: BookingState, formData: FormData) {
    const validatedFields = bookingSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        requestedDate: formData.get("requestedDate"),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please fix the errors below.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, phone, requestedDate } = validatedFields.data;

    try {
        await db.insert(appointments).values({
            patientName: name,
            email: email,
            phone: phone,
            requestedDate: new Date(requestedDate),
            status: "PENDING",
        });

        revalidatePath("/admin/dashboard");

        return {
            success: true,
            message: "Booking request received! We will contact you shortly.",
        };
    } catch (error) {
        console.error("Booking Error:", error);
        return {
            success: false,
            message: "Database Error: Failed to save booking.",
        };
    }
}