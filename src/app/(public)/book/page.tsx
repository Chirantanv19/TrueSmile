// src/app/(public)/book/page.tsx
import { BookingForm } from "@/components/forms/booking-form";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Book your Visit
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Fill out the form below and we will confirm your slot shortly.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <BookingForm />
        </div>
      </div>
      
    </div>
  );
}