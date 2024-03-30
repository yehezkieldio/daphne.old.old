import { Subcommand, type SubcommandOptions } from "@sapphire/plugin-subcommands";
import type { ChatInputCommand } from "@sapphire/framework";

export abstract class DaphneCommand extends Subcommand {
    protected constructor(context: Subcommand.LoaderContext, options: SubcommandOptions) {
        super(context, {
            ...options,
        });
    }

    // @ts-expect-error: Promise<unknown> instead of Promise<void>
    public async chatInputRun(interaction: ChatInputCommand.Interaction, context: ChatInputCommand.RunContext): Promise<unknown> {
        return super.chatInputRun(interaction, context);
    }
}

export declare namespace DaphneCommand {
    type Options = SubcommandOptions;
    type JSON = Subcommand.JSON;
    type Context = Subcommand.LoaderContext;
    type RunInTypes = Subcommand.RunInTypes;
    type ChatInputCommandInteraction = Subcommand.ChatInputCommandInteraction;
    type ContextMenuCommandInteraction = Subcommand.ContextMenuCommandInteraction;
    type AutocompleteInteraction = Subcommand.AutocompleteInteraction;
    type Registry = Subcommand.Registry;
}
