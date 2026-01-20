// src/app/(admin)/admin/dashboard/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserNav } from "@/components/dashboard/user-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      {/* Sidebar: Hidden on mobile, Fixed on Desktop */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:pl-72 h-full">
        {/* Top Navbar */}
        <div className="flex items-center justify-end p-4 border-b h-16">
           <div className="mr-4 text-sm text-gray-500">Admin Mode</div>
           <UserNav />
        </div>
        
        {/* Page Content */}
        <div className="p-8 pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}