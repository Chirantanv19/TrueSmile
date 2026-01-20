// src/lib/validations.ts
import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone number is too short"),
  requestedDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Date must be in the future",
  }),
});