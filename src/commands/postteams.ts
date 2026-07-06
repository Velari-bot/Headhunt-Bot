import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { embedChannels } from "../config/channels";
import { BotCommand } from "../types/command";
import { deferEphemeral, requireAdministrator, safeReply } from "../utils/interactionReply";
import { teamInfoEmbed } from "../utils/embeds";
import { postEmbedToChannel } from "../utils/serverSetup";

export const postteamsCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("postteams")
    .setDescription("Post team info embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    const denied = requireAdministrator(interaction);
    if (denied) {
      await safeReply(interaction, { content: denied });
      return;
    }

    if (!interaction.guild) return;

    await deferEphemeral(interaction);

    try {
      const channel = await postEmbedToChannel(
        interaction.guild,
        embedChannels.teamInfo,
        teamInfoEmbed(),
      );
      await safeReply(interaction, {
        content: `Team info embed posted in ${channel}.`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `${(error as Error).message}` });
    }
  },
};
