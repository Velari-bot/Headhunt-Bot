import { ChannelType, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { env } from "../config/env";
import { colors } from "../config/colors";
import { categories } from "../config/channels";
import { roles } from "../config/roles";
import { BotCommand } from "../types/command";
import { portalClient } from "../services/portalClient";
import { deferEphemeral, safeReply } from "../utils/interactionReply";

const startedAt = Date.now();

export const statusCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Show bot and portal sync status")
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);

    const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;

    const portalPing = await portalClient.ping();

    const guild = interaction.guild;
    const headhuntCategories = categories.filter((c) =>
      guild?.channels.cache.some(
        (ch) => ch.name === c.name && ch.type === ChannelType.GuildCategory,
      ),
    ).length;

    const embed = new EmbedBuilder()
      .setTitle("HeadHunt Bot Status")
      .setColor(colors.green)
      .addFields(
        {
          name: "Bot",
          value: `Online • Uptime ${hours}h ${minutes}m ${seconds}s`,
          inline: false,
        },
        {
          name: "Guild",
          value: guild ? `${guild.name} (${guild.id})` : "DM / unknown",
          inline: false,
        },
        {
          name: "Portal URL",
          value: env.portalUrl ?? "Not configured",
          inline: false,
        },
        {
          name: "Portal Reachability",
          value: portalPing.message,
          inline: false,
        },
        {
          name: "Portal Event Sync",
          value: portalClient.isConfigured()
            ? "Configured (polling `/api/bot/events` when available)"
            : "Not configured — set HEADHUNT_PORTAL_URL and HEADHUNT_BOT_SECRET",
          inline: false,
        },
        {
          name: "Server Layout",
          value: guild
            ? `${headhuntCategories}/${categories.length} categories • ${roles.length} configured roles`
            : "Run /setup in your guild",
          inline: false,
        },
      )
      .setTimestamp();

    await safeReply(interaction, { embeds: [embed] });
  },
};
