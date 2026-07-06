import "dotenv/config";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export const env = {
  discordToken: optional("DISCORD_TOKEN"),
  discordClientId: optional("DISCORD_CLIENT_ID"),
  discordGuildId: optional("DISCORD_GUILD_ID"),
  portalUrl: optional("HEADHUNT_PORTAL_URL"),
  botSecret: optional("HEADHUNT_BOT_SECRET"),
};

export function requireBotEnv() {
  return {
    token: required("DISCORD_TOKEN"),
    clientId: required("DISCORD_CLIENT_ID"),
    guildId: optional("DISCORD_GUILD_ID"),
  };
}
