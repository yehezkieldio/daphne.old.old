import type { DaphneClientOptions } from "@/extensions/client";
import { LogLevel } from "@sapphire/framework";
import { ActivityType, GatewayIntentBits } from "discord.js";

export const configuration: DaphneClientOptions = {
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true,
    loadSubcommandErrorListeners: true,
    loadDefaultErrorListeners: true,
    defaultPrefix: "dp.",
    presence: {
        activities: [
            {
                type: ActivityType.Playing,
                name: "a blissful, peaceful state of mind. ✨",
            },
        ],
        status: "dnd",
    },
    typing: true,
    logger: {
        level: LogLevel.Debug,
    },
};
