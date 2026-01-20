import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db"; // Points to src/db/index.ts
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { z } from "zod";

// Define the schema for login validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // 1. Authorize Function
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 2. Find user in DB
        const [admin] = await db
          .select()
          .from(admins)
          .where(eq(admins.email, email))
          .limit(1);

        if (!admin) return null;

        // 3. Verify Password
        const isValid = await argon2.verify(admin.passwordHash, password);

        if (!isValid) return null;

        // 4. Return User (Success)
        return {
          id: String(admin.id),
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // Redirect here if not logged in
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is in .env.local
});