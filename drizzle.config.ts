import { env } from "@/environment";
import type { Config } from "drizzle-kit";

export default {
    schema: "src/database/schema/*.ts",
    out: "migrations",
    driver: "pg",
    breakpoints: true,
    dbCredentials: {
        connectionString: env.DATABASE_CONNECTING_STRING,
    },
} satisfies Config;
