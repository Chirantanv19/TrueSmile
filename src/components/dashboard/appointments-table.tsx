// src/components/dashboard/appointments-table.tsx
"use client";

import { format } from "date-fns";
import { Badge } from "lucide-react"; // Import issue fix below
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
                        <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">
                                Patient
                            </th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">
                                Contact
                            </th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">
                                Requested Date
                            </th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500">
                                Status
                            </th>
                            <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">
                                Actions
                            </th>
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
                                <tr
                                    key={apt.id}
                                    className="border-b transition-colors hover:bg-slate-50"
                                >
                                    <td className="p-4 align-middle text-slate-800 font-medium">
                                        {apt.patientName}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500">{apt.email}</span>
                                            <span className="text-xs text-slate-500">{apt.phone}</span>
                                        </div>
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