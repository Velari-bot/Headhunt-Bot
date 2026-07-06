import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
} from "discord.js";
import { env } from "./config/env";
import { commands } from "./commands";
import { eventPoller } from "./services/eventPoller";
import { BotCommand } from "./types/command";
import { EPHEMERAL, safeReply } from "./utils/interactionReply";

if (!env.discordToken) {
  console.error("[Error] DISCORD_TOKEN is missing. Copy .env.example to .env and add your token.");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commandMap = new Collection<string, BotCommand>();
for (const command of commands) {
  commandMap.set(command.data.name, command);
  console.log(`[Bot] Loaded command: /${command.data.name}`);
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`[Bot] Logged in as ${readyClient.user.tag}`);
  console.log(`[Bot] Serving ${readyClient.guilds.cache.size} guild(s)`);
  eventPoller.start(readyClient);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commandMap.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`[Error] Command /${interaction.commandName} failed:`, error);
    await safeReply(interaction, {
      content: "There was an error executing this command.",
      flags: EPHEMERAL,
    }).catch(() => undefined);
  }
});

client.on("error", (error) => {
  console.error("[Bot] Client error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("[Bot] Unhandled rejection:", error);
});

process.on("SIGINT", () => {
  eventPoller.stop();
  client.destroy();
  process.exit(0);
});

client.login(env.discordToken).catch((error) => {
  console.error("[Error] Failed to log in:", error.message ?? error);
  process.exit(1);
});
