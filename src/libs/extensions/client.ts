import { ApplicationCommandRegistries, RegisterBehavior, SapphireClient, type SapphireClientOptions, container } from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

export interface DaphneClientOptions extends SapphireClientOptions, ClientOptions {
    overrideApplicationCommandsRegistries?: boolean;
}

export class DaphneClient extends SapphireClient {
    public constructor(options: DaphneClientOptions) {
        super(options);

        if (options.overrideApplicationCommandsRegistries) {
            container.logger.info("DaphneClient: Default behavior for application commands registries are set to BulkOverwrite.");
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }
    }
}
