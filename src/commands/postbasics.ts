import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { embedChannels } from "../config/channels";
import { BotCommand } from "../types/command";
import { deferEphemeral, requireAdministrator, safeReply } from "../utils/interactionReply";
import {
  howToStartEmbed,
  livesHeadsHeartsEmbed,
  marketTeamsBountiesEmbed,
  quickRulesEmbed,
  whatIsHeadhuntEmbed,
} from "../utils/embeds";
import { postEmbedToChannel } from "../utils/serverSetup";

export const postbasicsCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("postbasics")
    .setDescription("Post SERVER BASICS embeds")
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

    const posts: [string, ReturnType<typeof whatIsHeadhuntEmbed>][] = [
      [embedChannels.whatIsHeadhunt, whatIsHeadhuntEmbed()],
      [embedChannels.quickRules, quickRulesEmbed()],
      [embedChannels.livesHeadsHearts, livesHeadsHeartsEmbed()],
      [embedChannels.marketTeamsBounties, marketTeamsBountiesEmbed()],
      [embedChannels.howToStart, howToStartEmbed()],
    ];

    try {
      const posted: string[] = [];
      for (const [channelName, embed] of posts) {
        const channel = await postEmbedToChannel(interaction.guild, channelName, embed);
        posted.push(channel.toString());
      }

      await safeReply(interaction, {
        content: `SERVER BASICS embeds posted in:\n${posted.join("\n")}`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `${(error as Error).message}` });
    }
  },
};
