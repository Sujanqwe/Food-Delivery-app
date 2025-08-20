import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";
import * as schema from "../db/schema.js";

let db;

try {
  if (!ENV.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL not found. Did you set it in .env?");
  }

  const sql = neon(ENV.DATABASE_URL);
  db = drizzle(sql, { schema });
  console.log("✅ Database connected successfully");
} catch (err) {
  console.error("❌ Failed to initialize database:", err.message);
  process.exit(1); // Exit gracefully instead of crashing later
}

export { db };
