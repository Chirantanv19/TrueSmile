// src/app/(admin)/admin/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-muted-foreground">
          Welcome to the TrueSmile Admin System. Select "Appointments" to manage bookings.
        </p>
      </div>
    </div>
  );
}