import { db } from "@/database";
import { DaphneCommand } from "@/extensions/command";
import { serversTable } from "@/schema/server";
import { DEVELOPMENT_SERVERS } from "@/utils/constants";
import { RegisterBehavior } from "@sapphire/framework";
import { type Guild, SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";

export class CheckGuildIntegrityCommand extends DaphneCommand {
    public constructor(context: DaphneCommand.Context, options: DaphneCommand.Options) {
        super(context, {
            name: "check-guild",
            description: "Perform a manual integrity check on the current guild settings and other related data.",
            requiredClientPermissions: ["SendMessages"],
            preconditions: ["GuildOnly", "DeveloperOnly"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: DaphneCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: DEVELOPMENT_SERVERS,
            idHints: [],
        });
    }

    public async chatInputRun(interaction: DaphneCommand.ChatInputCommandInteraction) {
        const guild = interaction.guild as Guild;

        const processes: string[] = [
            "Performing a integrity check for this server, this may take a while, please wait...",
            "Could not find a guild settings for this server. Creating a new one...",
            "Successfully created a new guild settings for the server.",
            "Guild settings are verified and synced for the server",
        ];

        await interaction.reply({
            content: processes[0],
        });
        const guildQuery = await db.select().from(serversTable).where(eq(serversTable.discordId, guild.id));
        if (guildQuery.length === 0) {
            await interaction.editReply(`${processes[0]}\n${processes[1]}`);

            await db.insert(serversTable).values({
                discordId: guild.id,
            });

            await interaction.editReply(`${processes[0]}\n${processes[1]}\n${processes[2]}`);
        }
        await interaction.editReply(`${processes[0]}\n${processes[1]}\n${processes[2]}\n${processes[3]}`);
    }
}
