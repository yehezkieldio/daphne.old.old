import { env } from "@/environment";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const db = postgres(env.DATABASE_CONNECTING_STRING, {
    max: 1,
});

export const migrator = drizzle(db);

export async function migrateDatabase() {
    console.log("DatabaseMigration: Migrating database...");
    await migrate(migrator, {
        migrationsFolder: "migrations",
    });
    console.log("DatabaseMigration: Database migrated successfully.");

    await db.end();
}

void migrateDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("DatabaseMigration: Failed to migrate database.");
        console.error(error);
        process.exit(1);
    });
