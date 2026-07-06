import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { embedChannels } from "../config/channels";
import { BotCommand } from "../types/command";
import { deferEphemeral, requireAdministrator, safeReply } from "../utils/interactionReply";
import { bountyBoardEmbed } from "../utils/embeds";
import { postEmbedToChannel } from "../utils/serverSetup";

export const postbountiesCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("postbounties")
    .setDescription("Post bounty board embed")
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
        embedChannels.bountyBoard,
        bountyBoardEmbed(),
      );
      await safeReply(interaction, {
        content: `Bounty board embed posted in ${channel}.`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `${(error as Error).message}` });
    }
  },
};
