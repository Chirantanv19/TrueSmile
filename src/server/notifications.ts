// src/server/notifications.ts
"use server";

import { Resend } from "resend";
// import ConfirmationEmail from "@/components/emails/confirmation-email"; <--- Comment this out for now
import twilio from "twilio";

// --- CONFIG ---
const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// --- HELPER 1: EMAIL (Standard HTML Mode) ---
export async function sendConfirmationEmail(
    email: string,
    name: string,
    slotStart: Date
) {
    console.log(`[Email Debug] Sending to: ${email}`);

    try {
        const dateStr = slotStart.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
        const timeStr = slotStart.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        // ⚡ FIX: Use 'html' string instead of 'react' component to avoid Next.js 16 conflicts
        const { data, error } = await resend.emails.send({
            from: "TrueSmile <onboarding@resend.dev>", // Keep this as is for Test Mode
            to: [email],
            subject: "Appointment Confirmed - TrueSmile",
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #0f172a;">Appointment Confirmed</h1>
          <p>Hi ${name},</p>
          <p>Your appointment has been successfully booked.</p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${dateStr}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${timeStr}</p>
          </div>
          <p>Please arrive 10 minutes early.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">TrueSmile Clinic Automated System</p>
        </div>
      `,
        });

        if (error) {
            console.error("[Email Debug] ❌ Error:", error);
            return { success: false, error };
        }

        console.log("[Email Debug] ✅ Success! ID:", data?.id);
        return { success: true, id: data?.id };
    } catch (err) {
        console.error("[Email Debug] 💥 CRITICAL FAILURE:", err);
        return { success: false };
    }
}

// --- HELPER 2: WHATSAPP (Twilio) ---
export async function sendConfirmationWhatsApp(
    phone: string,
    name: string,
    slotStart: Date
) {
    console.log(`[WhatsApp Debug] Sending to: ${phone}`);

    try {
        const dateStr = slotStart.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
        const timeStr = slotStart.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const message = `Hello ${name}! ✅\n\nYour appointment at TrueSmile Clinic is confirmed.\n\n📅 Date: ${dateStr}\n⏰ Time: ${timeStr}\n\nPlease arrive 10 mins early.\nSee you soon!`;

        const response = await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${phone}`,
        });

        console.log("[WhatsApp Debug] ✅ Sent! SID:", response.sid);
        return { success: true, sid: response.sid };
    } catch (error) {
        console.error("[WhatsApp Debug] ❌ Failed:", error);
        return { success: false };
    }
}