import { db } from "@/database";
import { serversTable } from "@/schema/server";
import { DaphneEvents } from "@/typings/events";
import { Listener } from "@sapphire/framework";
import type { Guild } from "discord.js";
import { eq } from "drizzle-orm";

export class GuildCreateListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: DaphneEvents.GuildCreate,
        });
    }

    public async run(guild: Guild) {
        if (!guild.available) return;

        this.container.logger.info(`GuildCreateListener: Detected new guild: ${guild.name} (${guild.id}) with ${guild.memberCount} members. Syncing and verifying guild settings...`);
        const guildQuery = await db.select().from(serversTable).where(eq(serversTable.discordId, guild.id));
        if (guildQuery.length === 0) {
            this.container.logger.info(`GuildCreateListener: ${guild.name} (${guild.id}) is not detected on the database! Creating a new guild settings..`);

            await db.insert(serversTable).values({
                discordId: guild.id,
            });

            this.container.logger.info(`GuildCreateListener: Successfully created new guild settings for ${guild.name} (${guild.id})`);
        }

        this.container.logger.info(`GuildCreateListener: Successfully synced and verified guild settings for ${guild.name} (${guild.id})`);
    }
}
