// src/components/forms/booking-form.tsx
"use client";

import { useActionState } from "react";
import { createBooking } from "@/server/appointments";
import { Loader2, CalendarIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Essential CSS
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(createBooking, {
    success: false,
    message: "",
  });

  const [phoneValue, setPhoneValue] = useState<string>();

  // Show Toast on Success/Error
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        // Optional: Reset form here if needed
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            required
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Phone Input (UAE Default) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          {/* Hidden input to send actual value to Server Action */}
          <input type="hidden" name="phone" value={phoneValue || ""} />
          
          <PhoneInput
            international
            defaultCountry="AE"
            value={phoneValue}
            onChange={setPhoneValue}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500"
          />
          {state.errors?.phone && (
            <p className="text-sm text-red-500">{state.errors.phone[0]}</p>
          )}
        </div>

        {/* Date Picker (Native for simplicity, fully accessible) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Date</label>
          <div className="relative">
            <input
              name="requestedDate"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]} // Disable past dates
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          {state.errors?.requestedDate && (
            <p className="text-sm text-red-500">{state.errors.requestedDate[0]}</p>
          )}
        </div>

      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking...
          </>
        ) : (
          "Request Appointment"
        )}
      </button>

      {state.success && (
        <div className="rounded-md bg-green-50 p-4 text-green-800">
          <p className="text-sm font-medium">Success!</p>
          <p className="text-sm">Your appointment request has been sent.</p>
        </div>
      )}
    </form>
  );
}