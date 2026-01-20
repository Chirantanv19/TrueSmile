// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load .env.local to get the DATABASE_URL
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",  // Pointing to your schema inside src
  out: "./drizzle",              // Where migration files will be saved
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
