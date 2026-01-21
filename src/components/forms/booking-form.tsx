"use client";

import { useActionState, useState, useEffect } from "react";
// Replace with your actual server action path
import { createBooking } from "@/server/appointments";
import { Loader2, Calendar, User, Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
// 1. IMPORT 'Variants' TYPE HERE
import { motion, AnimatePresence, type Variants } from "framer-motion";

// 2. EXPLICITLY TYPE YOUR VARIANTS
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

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

    // Success State View
    if (state.success) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center p-8"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-100/50">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Request Confirmed</h3>
                <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
                    We have received your appointment details. Our concierge will contact you shortly to finalize the schedule.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.form
            action={formAction}
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header within form for mobile context */}
            <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Secure Your Slot</h3>
                <p className="text-slate-400 text-sm mt-1">Please fill in your details below.</p>
            </motion.div>

            {/* Name Field */}
            <motion.div variants={itemVariants} className="space-y-1.5 group">
                <Label text="Full Name" />
                <div className="relative group/input">
                    <div className="absolute left-4 top-4 text-slate-300 group-focus-within/input:text-blue-600 transition-colors">
                        <User className="h-5 w-5" />
                    </div>
                    <input
                        name="name"
                        placeholder="Ex. Dr. Aryan Sterling"
                        required
                        disabled={isPending}
                        className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-transparent focus:bg-white hover:bg-white focus:border-blue-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-300 disabled:opacity-50 shadow-sm"
                    />
                </div>
                <ErrorMessage message={state.errors?.name?.[0]} />
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-1.5 group">
                <Label text="Email Address" />
                <div className="relative group/input">
                    <div className="absolute left-4 top-4 text-slate-300 group-focus-within/input:text-blue-600 transition-colors">
                        <Mail className="h-5 w-5" />
                    </div>
                    <input
                        name="email"
                        type="email"
                        placeholder="name@domain.com"
                        required
                        disabled={isPending}
                        className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-transparent focus:bg-white hover:bg-white focus:border-blue-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-300 disabled:opacity-50 shadow-sm"
                    />
                </div>
                <ErrorMessage message={state.errors?.email?.[0]} />
            </motion.div>

            {/* Phone Input */}
            <motion.div variants={itemVariants} className="space-y-1.5 group">
                <Label text="Mobile Number" />
                <div className="relative group/input">
                    <div className="flex items-center w-full h-14 bg-slate-50 border-2 border-transparent focus-within:bg-white hover:bg-white focus-within:border-blue-100 rounded-2xl px-4 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-sm">
                        <input type="hidden" name="phone" value={phoneValue || ""} />
                        <PhoneInput
                            international
                            defaultCountry="AE"
                            value={phoneValue}
                            onChange={setPhoneValue}
                            disabled={isPending}
                            numberInputProps={{
                                className: "bg-transparent border-none focus:ring-0 text-slate-900 font-medium placeholder:text-slate-300 h-full w-full focus:outline-none ml-2",
                            }}
                            className="flex w-full items-center"
                        />
                    </div>
                </div>
                <ErrorMessage message={state.errors?.phone?.[0]} />
            </motion.div>

            {/* Date Picker */}
            <motion.div variants={itemVariants} className="space-y-1.5 group">
                <Label text="Preferred Date" />
                <div className="relative group/input">
                    <div className="absolute left-4 top-4 text-slate-300 group-focus-within/input:text-blue-600 transition-colors pointer-events-none">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <input
                        name="requestedDate"
                        type="date"
                        required
                        disabled={isPending}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-transparent focus:bg-white hover:bg-white focus:border-blue-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-500 placeholder:text-slate-300 disabled:opacity-50 shadow-sm"
                    />
                </div>
                <ErrorMessage message={state.errors?.requestedDate?.[0]} />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                        "w-full relative overflow-hidden group h-14 rounded-2xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                        isPending
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                            : "bg-slate-900 hover:shadow-2xl hover:shadow-slate-900/20"
                    )}
                >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        {isPending ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>Confirm Appointment</span>
                                <div className="bg-white/20 p-1 rounded-full">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </>
                        )}
                    </div>
                    {!isPending && (
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                    )}
                </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold pt-4">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>256-Bit Secure SSL Encrypted</span>
            </motion.div>

        </motion.form>
    );
}

// UI Helpers
function Label({ text }: { text: string }) {
    return (
        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
            {text}
        </label>
    );
}

function ErrorMessage({ message }: { message?: string }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center gap-1.5 text-xs text-red-500 font-medium overflow-hidden"
                >
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5" />
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}