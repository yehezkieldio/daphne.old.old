import { DaphneIdentifiers } from "@/typings/identifier";
import { DEVELOPERS } from "@/utils/constants";
import { Precondition } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

export class DeveloperOnlyPrecondition extends Precondition {
    public constructor(context: Precondition.LoaderContext, options: Precondition.Options) {
        super(context, {
            ...options,
            name: DaphneIdentifiers.DeveloperOnly,
        });
    }

    public async chatInputRun(interaction: CommandInteraction) {
        if (DEVELOPERS.includes(interaction.user.id)) {
            return this.ok();
        }

        return this.error({
            message: "This command is only available to developers.",
            identifier: DaphneIdentifiers.DeveloperOnly,
        });
    }
}

declare module "@sapphire/framework" {
    interface Preconditions {
        DeveloperOnly: never;
    }
}
