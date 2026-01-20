// src/server/appointments.ts
"use server";

import { db } from "@/db";
import { appointments } from "@/db/schema";
import { bookingSchema } from "@/lib/validations"; // Import from shared file
import { revalidatePath } from "next/cache";

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

export async function createBooking(prevState: BookingState, formData: FormData) {
    // Validate Fields using the imported schema
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
        // Save to Database
        await db.insert(appointments).values({
            patientName: name,
            email: email,
            phone: phone,
            requestedDate: new Date(requestedDate),
            status: "PENDING",
        });

        // Optional: Refresh the admin dashboard so they see the new booking immediately
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