// src/db/schema.ts
import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// 1. Admin Table (For Login)
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(), // Will store Argon2 hash
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. Appointments Table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  
  // Customer Details
  patientName: text("patient_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(), // E.g. "+971501234567"
  
  // Booking Status
  status: text("status", { enum: ["PENDING", "CONFIRMED", "REJECTED"] })
    .default("PENDING")
    .notNull(),
  
  // Slot Details
  requestedDate: timestamp("requested_date").notNull(), // The day they want
  
  // Admin Assigned Slot (Nullable until confirmed)
  slotStart: timestamp("slot_start"),
  slotEnd: timestamp("slot_end"),
  
  // Admin Internal Notes
  notes: text("notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
});