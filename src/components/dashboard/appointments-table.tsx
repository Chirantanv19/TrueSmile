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
function ManualNotificationButtons({
    name,
    phone,
    email,
    date
}: {
    name: string;
    phone: string;
    email: string;
    date: Date
}) {
    // 1. Format the Date and Time
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

    // 2. Prepare the Message Text
    const messageBody = `Hello ${name}, your appointment at TrueSmile is confirmed for ${dateStr} at ${timeStr}. Please arrive 10 mins early.`;

    // 3. Create WhatsApp Link
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageBody)}`;

    // 4. Create Email Link
    const emailSubject = "Appointment Confirmation - TrueSmile";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageBody)}`;

    return (
        <div className="flex gap-2 mt-1">
            {/* WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                title="Send WhatsApp"
            >
                <MessageCircle size={16} />
            </a>

            {/* Email Button */}
            <a
                href={mailtoLink}
                target="_blank"             // 👈 ADDED: Forces browser to handle the action
                rel="noopener noreferrer"   // 👈 ADDED: Security best practice
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Send Email"
            >
                <Mail size={16} />
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