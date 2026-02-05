import type { Config } from "drizzle-kit";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

// REDACTED