// src/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);

// We export 'db' to use in our Server Actions
export const db = drizzle(sql, { schema });