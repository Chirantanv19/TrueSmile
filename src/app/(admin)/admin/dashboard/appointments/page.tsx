// src/app/(admin)/admin/dashboard/appointments/page.tsx
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AppointmentsTable } from "@/components/dashboard/appointments-table";
import { AppointmentsHeader } from "@/components/dashboard/appointments-header";

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
      <AppointmentsHeader />

      {/* 2. Pass data to the Client Component */}
      <AppointmentsTable data={data} />
    </div>
  );
}