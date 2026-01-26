"use client";

import { format } from "date-fns";
import { Mail, MessageCircle } from "lucide-react"; // Import Icons
import { cn } from "@/lib/utils";
import { ReviewModal } from "./review-modal";

// Define the shape of our data
type Appointment = {
    id: number;
    patientName: string;
    email: string;
    phone: string;
    requestedDate: Date;
    status: "PENDING" | "CONFIRMED" | "REJECTED";
    createdAt: Date | null;
};

export function AppointmentsTable({ data }: { data: Appointment[] }) {
    return (
        <div className="rounded-md border bg-white shadow-sm">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-slate-100/50">
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">Patient</th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">Contact</th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">Requested Date</th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-slate-500">
                                    No appointments found.
                                </td>
                            </tr>
                        ) : (
                            data.map((apt) => (
                                <tr key={apt.id} className="border-b transition-colors hover:bg-slate-50">
                                    <td className="p-4 align-middle text-slate-800 font-medium">
                                        {apt.patientName}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex flex-col mb-2">
                                            <span className="text-xs text-slate-500">{apt.email}</span>
                                            <span className="text-xs text-slate-500">{apt.phone}</span>
                                        </div>
                                        {/* 👇 ADDED: Manual Notification Buttons */}
                                        <ManualNotificationButtons
                                            name={apt.patientName}
                                            phone={apt.phone}
                                            email={apt.email}
                                            date={apt.requestedDate}
                                            slotStart={apt.requestedDate}
                                        />
                                    </td>
                                    <td className="p-4 align-middle text-slate-600">
                                        {format(new Date(apt.requestedDate), "PPP")}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <StatusBadge status={apt.status} />
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        {apt.status === "PENDING" ? (
                                            <ReviewModal
                                                appointment={apt}
                                                trigger={
                                                    <button className="text-blue-600 hover:underline text-xs font-medium">
                                                        Review
                                                    </button>
                                                }
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-400">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- NEW COMPONENT: Manual Notification Buttons ---
// --- NEW COMPONENT: Manual Notification Buttons ---
// --- NEW COMPONENT: Manual Notification Buttons ---
// --- NEW COMPONENT: Manual Notification Buttons ---
function ManualNotificationButtons({
    name,
    phone,
    email,
    date,
    slotStart

}: {
    name: string;
    phone: string;
    email: string;
    date: Date
    slotStart: Date;
}) {
    // 1. Format the Date and Time
    const dateObj = new Date(date);
    const slotObhj = new Date(slotStart);
    const dateStr = dateObj.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
    const timeStr = slotObhj.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
    // const timeStr = slotStart.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })  ;

    // ---------------------------------------------------------
    // 🎨 WHATSAPP MESSAGE DESIGN
    // WhatsApp supports *bold*, _italics_, and ~strikethrough~
    // ---------------------------------------------------------
    const waMessage =
        `*APPOINTMENT CONFIRMED* ✅

Hello ${name} 👋,

Your appointment has been successfully booked at *TrueSmile Clinic*.

📅 *Date:* ${dateStr}
⏰ *Time:* ${timeStr}

_Please arrive 10 minutes early to complete any necessary paperwork._

See you soon! 🦷✨`;

    // ---------------------------------------------------------
    // 📧 GMAIL MESSAGE DESIGN
    // Gmail Links only support PLAIN TEXT (No Bold/Colors allowed via URL)
    // We use emojis and spacing to make it look professional.
    // ---------------------------------------------------------
    const emailSubject = `✅ Appointment Confirmed - ${dateStr}`;
    const emailBody =
        `Hello ${name},

Your appointment has been successfully booked.

📅 Date: ${dateStr}
⏰ Time: ${timeStr}
📍 Location: TrueSmile Clinic

Please arrive 10 minutes early.

Best regards,
TrueSmile Team`;

    // 3. Create Links
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

    // Note: We use 'encodeURIComponent' to handle spaces and emojis correctly in URLs
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return (
        <div className="flex gap-2 mt-2">
            {/* WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors gap-2 border border-green-200"
                title="Send WhatsApp"
            >
                <MessageCircle size={14} />
                <span className="text-xs font-semibold">WhatsApp</span>
            </a>

            {/* Gmail Button */}
            <a
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors gap-2 border border-blue-200"
                title="Send via Gmail"
            >
                <Mail size={14} />
                <span className="text-xs font-semibold">Gmail</span>
            </a>
        </div>
    );
}

// Helper Component for the Status Pill
function StatusBadge({ status }: { status: string }) {
    const styles = {
        PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
        CONFIRMED: "bg-green-100 text-green-800 border-green-200",
        REJECTED: "bg-red-100 text-red-800 border-red-200",
    };

    const className = styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                className
            )}
        >
            {status}
        </span>
    );
}