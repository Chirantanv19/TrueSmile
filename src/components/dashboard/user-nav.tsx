// src/components/dashboard/user-nav.tsx
"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function UserNav() {
  return (
    <div className="flex items-center gap-x-4">
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-x-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  );
}