// src/app/(admin)/admin/dashboard/appointments/page.tsx
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AppointmentsTable } from "@/components/dashboard/appointments-table";

// This ensures the page always fetches fresh data
export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  // 1. Fetch data directly from DB
  const data = await db
    .select()
    .from(appointments)
    .orderBy(desc(appointments.createdAt)); // Newest first

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
          <p className="text-slate-500">
            Manage and schedule patient requests.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* We will add the List/Slider Toggle here later */}
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white shadow hover:bg-slate-900/90 h-9 px-4 py-2">
            Refresh
          </button>
        </div>
      </div>

      {/* 2. Pass data to the Client Component */}
      <AppointmentsTable data={data} />
    </div>
  );
}