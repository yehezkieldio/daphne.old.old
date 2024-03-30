import { env } from "@/environment";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const db = drizzle(postgres(env.DATABASE_CONNECTING_STRING));
