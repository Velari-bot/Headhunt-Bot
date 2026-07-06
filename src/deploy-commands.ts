import { REST, Routes } from "discord.js";
import { requireBotEnv } from "./config/env";
import { commands } from "./commands";

const { token, clientId, guildId } = requireBotEnv();

const body = commands.map((command) => command.data.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(`[Deploy] Registering ${body.length} slash command(s)...`);

    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
      console.log(`[Deploy] Registered guild commands for guild ${guildId}`);
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body });
      console.log("[Deploy] Registered global commands (may take up to 1 hour)");
    }
  } catch (error) {
    console.error("[Deploy] Failed to register commands:", error);
    process.exit(1);
  }
})();
