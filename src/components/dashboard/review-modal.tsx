"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Clock, Calendar, Phone, Mail, User, CheckCircle2, ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { confirmBooking } from "@/server/appointments";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Helper to format date for input (YYYY-MM-DDTHH:MM)
const toLocalISO = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function ReviewModal({ appointment, trigger }: { appointment: any, trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(confirmBooking, { success: false, message: "" });

    // Default times logic
    const baseDate = new Date(appointment.requestedDate);
    baseDate.setHours(9, 0, 0, 0);
    const [start, setStart] = useState(toLocalISO(baseDate));

    const baseEndDate = new Date(baseDate);
    baseEndDate.setMinutes(30);
    const [end, setEnd] = useState(toLocalISO(baseEndDate));

    // Close modal on success
    useEffect(() => {
        if (state.success && open) {
            setOpen(false);
            toast.success(state.message);
        }
    }, [state.success, state.message, open]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Portal>
                {/* Backdrop with Blur */}
                <Dialog.Overlay className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[90] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                {/* Modal Content */}
                <Dialog.Content className="fixed left-[50%] top-[50%] z-[100] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <div>
                            <Dialog.Title className="text-xl font-bold text-slate-900">
                                Confirm Appointment
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-slate-500 mt-1">
                                Review details and assign a time slot.
                            </Dialog.Description>
                        </div>
                        <Dialog.Close className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                            <X className="h-5 w-5" />
                        </Dialog.Close>
                    </div>

                    <form action={formAction}>
                        <input type="hidden" name="id" value={appointment.id} />

                        <div className="p-6 space-y-6">

                            {/* Patient Card */}
                            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{appointment.patientName}</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Patient</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100/50">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        {appointment.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        {new Date(appointment.requestedDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Time Slot Inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> Time Slot
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="slotStart"
                                        value={start}
                                        onChange={(e) => setStart(e.target.value)}
                                        className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                               <div className="hidden space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> End Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="slotEnd"
                                        value={end}
                                        onChange={(e) => setEnd(e.target.value)}
                                        className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    /> 
                                </div> 
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                            <Dialog.Close asChild>
                                <button type="button" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </Dialog.Close>

                            <button
                                type="submit"
                                disabled={isPending}
                                className={cn(
                                    "inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]",
                                    isPending
                                        ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40"
                                )}
                            >
                                {isPending ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        Confirm  <ArrowRight className="h-4 w-4 opacity-50" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}