// src/db/seed.ts
import { config } from "dotenv";

// 1. Load .env.local immediately
config({ path: ".env.local" });

import argon2 from "argon2";
import { admins } from "./schema";

async function main() {
    // 2. Import the DB connection INSIDE the async function
    // This ensures .env is loaded first, and avoids "Top-level await" errors
    const { db } = await import("./index");

    const email = "admin@hospital.com";
    const password = "password123";

    console.log("🌱 Seeding admin...");

    // Check if admin exists
    const existingAdmin = await db.query.admins.findFirst({
        where: (admins, { eq }) => eq(admins.email, email),
    });

    if (existingAdmin) {
        console.log("⚠️ Admin already exists. Skipping creation.");
        process.exit(0);
    }

    // Hash and Insert
    const passwordHash = await argon2.hash(password);

    await db.insert(admins).values({
        email,
        passwordHash,
        name: "Master Admin",
    });

    console.log("✅ Admin created successfully!");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    process.exit(0);
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});