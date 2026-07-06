import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { BotCommand } from "../types/command";
import { deferEphemeral, requireAdministrator, safeReply } from "../utils/interactionReply";
import { runFullSetup } from "../utils/serverSetup";
import { setupSuccessEmbed } from "../utils/embeds";

export const setupCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Create HeadHunt Survival categories, channels, roles, and permissions")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    const denied = requireAdministrator(interaction);
    if (denied) {
      await safeReply(interaction, { content: denied });
      return;
    }

    if (!interaction.guild) {
      await safeReply(interaction, { content: "This command can only be used in a server." });
      return;
    }

    await deferEphemeral(interaction);

    try {
      const summary = await runFullSetup(interaction.guild);
      await safeReply(interaction, { embeds: [setupSuccessEmbed(summary)] });
    } catch (error) {
      console.error("[Setup] Error:", error);
      await safeReply(interaction, {
        content: `Setup failed: ${(error as Error).message}`,
      });
    }
  },
};
