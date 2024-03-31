import { env } from "@/environment";
import { DaphneClient } from "@/extensions/client";
import "@sapphire/plugin-logger/register";
import { configuration } from "./configuration";

/**
 * The main entrypoint for the bot.
 * @see DaphneClient
 */
const main = async (): Promise<void> => {
    void new DaphneClient(configuration).login(env.DISCORD_BOT_TOKEN);
};

void main();
