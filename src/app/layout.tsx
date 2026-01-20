import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your preferred font
import "./globals.css";
import { Toaster } from "sonner"; // Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" /> {/* Add this line */}
      </body>
    </html>
  );
}