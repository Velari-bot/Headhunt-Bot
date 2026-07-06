import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { embedChannels } from "../config/channels";
import { BotCommand } from "../types/command";
import { deferEphemeral, requireAdministrator, safeReply } from "../utils/interactionReply";
import {
  economyInfoEmbed,
  ghostBuybackEmbed,
  priceGuideEmbed,
} from "../utils/embeds";
import { postEmbedToChannel } from "../utils/serverSetup";

export const posteconomyCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("posteconomy")
    .setDescription("Post economy, price guide, and ghost buyback embeds")
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

    const posts: [string, ReturnType<typeof economyInfoEmbed>][] = [
      [embedChannels.economyInfo, economyInfoEmbed()],
      [embedChannels.priceGuide, priceGuideEmbed()],
      [embedChannels.ghostBuyback, ghostBuybackEmbed()],
    ];

    try {
      const posted: string[] = [];
      for (const [channelName, embed] of posts) {
        const channel = await postEmbedToChannel(interaction.guild, channelName, embed);
        posted.push(channel.toString());
      }

      await safeReply(interaction, {
        content: `Economy embeds posted in:\n${posted.join("\n")}`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `${(error as Error).message}` });
    }
  },
};
