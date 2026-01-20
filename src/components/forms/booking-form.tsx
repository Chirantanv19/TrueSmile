// src/components/forms/booking-form.tsx
"use client";

import { useActionState, useState, useEffect } from "react";
import { createBooking } from "@/server/appointments";
import { Loader2, Calendar, User, Mail, Smartphone, CheckCircle2, AlertCircle } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function BookingForm() {
    const [state, formAction, isPending] = useActionState(createBooking, {
        success: false,
        message: "",
    });

    const [phoneValue, setPhoneValue] = useState<string>();

    useEffect(() => {
        if (state.message) {
            state.success ? toast.success(state.message) : toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="w-full relative">
            <form action={formAction} className="space-y-6">

                {/* Name Field */}
                <div className="space-y-1.5 group">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Full Name
                    </label>
                    <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                        <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <User className="h-5 w-5" />
                        </div>
                        <input
                            name="name"
                            placeholder="Jane Doe"
                            required
                            disabled={isPending}
                            className="w-full pl-10 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
                        />
                    </div>
                    <ErrorMessage message={state.errors?.name?.[0]} />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5 group">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Email Address
                    </label>
                    <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                        <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <Mail className="h-5 w-5" />
                        </div>
                        <input
                            name="email"
                            type="email"
                            placeholder="jane@example.com"
                            required
                            disabled={isPending}
                            className="w-full pl-10 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
                        />
                    </div>
                    <ErrorMessage message={state.errors?.email?.[0]} />
                </div>

                {/* Phone Input (Custom styled wrapper) */}
                <div className="space-y-1.5 group">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Phone Number
                    </label>
                    <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                        {/* We use a wrapper to make the library input look like our custom inputs */}
                        <div className="flex items-center w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <input type="hidden" name="phone" value={phoneValue || ""} />
                            <PhoneInput
                                international
                                defaultCountry="AE"
                                value={phoneValue}
                                onChange={setPhoneValue}
                                disabled={isPending}
                                numberInputProps={{
                                    className: "bg-transparent border-none focus:ring-0 text-slate-900 font-medium placeholder:text-slate-400 h-full w-full focus:outline-none ml-2", // Remove default styles
                                }}
                                className="flex w-full items-center"
                            />
                        </div>
                    </div>
                    <ErrorMessage message={state.errors?.phone?.[0]} />
                </div>

                {/* Date Picker */}
                <div className="space-y-1.5 group">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                        Preferred Date
                    </label>
                    <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                        <div className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <input
                            name="requestedDate"
                            type="date"
                            required
                            disabled={isPending}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-500 placeholder:text-slate-400 disabled:opacity-50"
                        />
                    </div>
                    <ErrorMessage message={state.errors?.requestedDate?.[0]} />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                        "w-full relative overflow-hidden group h-12 rounded-xl font-bold text-white shadow-lg transition-all duration-300 active:scale-[0.98]",
                        isPending
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 hover:shadow-blue-500/40"
                    )}
                >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                        {isPending ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Processing Request...</span>
                            </>
                        ) : (
                            <>
                                <span>Confirm Appointment</span>
                                <CheckCircle2 className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </>
                        )}
                    </div>

                    {/* Shine Effect on Hover */}
                    {!isPending && (
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    )}
                </button>

                {/* Success Message Area */}
                {state.success && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 text-emerald-800">
                        <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-emerald-600" />
                        <div className="text-sm">
                            <p className="font-semibold">Request Received!</p>
                            <p className="text-emerald-700/80 mt-0.5">We will confirm your slot via WhatsApp shortly.</p>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

// Helper for error messages
function ErrorMessage({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
            <AlertCircle className="h-3.5 w-3.5" />
            {message}
        </div>
    );
}