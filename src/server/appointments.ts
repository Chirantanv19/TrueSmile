// src/server/appointments.ts
"use server";

import { db } from "@/db";
import { appointments } from "@/db/schema";
import { bookingSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { sendConfirmationEmail , sendConfirmationWhatsApp} from "./notifications";

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
    console.log("\n🛑 --- STARTED CONFIRM ACTION --- 🛑");

    const id = Number(formData.get("id"));
    const slotStart = String(formData.get("slotStart"));
    const slotEnd = String(formData.get("slotEnd"));

    console.log(`Checking ID: ${id}`);

    const validation = confirmSchema.safeParse({ id, slotStart, slotEnd });
    if (!validation.success) {
        console.error("❌ Validation Failed:", validation.error);
        return { success: false, message: "Invalid time slots provided." };
    }

    try {
        // 1. Perform Update
        console.log("Attempting DB Update...");
        await db
            .update(appointments)
            .set({
                status: "CONFIRMED",
                slotStart: new Date(slotStart),
                slotEnd: new Date(slotEnd),
            })
            .where(eq(appointments.id, id));

        console.log("✅ DB Update Successful. Fetching updated record...");

        // 2. Fetch Explicitly (Safer than returning in some drivers)
        const booking = await db.query.appointments.findFirst({
            where: eq(appointments.id, id)
        });

        if (!booking) {
            console.error("❌ CRITICAL: Could not find booking after update.");
            return { success: false, message: "Error: Booking lost." };
        }

        console.log(`✅ Record Found. Email: ${booking.email}, Phone: ${booking.phone}`);

        // 3. Send Notifications
        console.log("🚀 Triggering Notifications...");

        // We await them individually to see which one fails in the logs
        const emailRes = await sendConfirmationEmail(
            booking.email,
            booking.patientName,
            booking.slotStart!
        );
        console.log(`📧 Email Result: ${emailRes.success ? "Sent" : "Failed"}`);

        const waRes = await sendConfirmationWhatsApp(
            booking.phone,
            booking.patientName,
            booking.slotStart!
        );
        console.log(`💬 WhatsApp Result: ${waRes.success ? "Sent" : "Failed"}`);

        revalidatePath("/admin/dashboard/appointments");
        return { success: true, message: "Confirmed & Notified!" };

    } catch (error) {
        console.error("💥 SERVER ACTION CRASHED:", error);
        return { success: false, message: "Server Error during confirmation." };
    }
}

// ... (Keep createBooking as it was) ...
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