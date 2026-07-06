import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { embedChannels } from "../config/channels";
import { BotCommand } from "../types/command";
import { deferEphemeral, requireAdministrator, safeReply } from "../utils/interactionReply";
import {
  consoleJoinGuideEmbed,
  howToJoinEmbed,
  linkYourAccountComponents,
  linkYourAccountEmbed,
  welcomeEmbed,
} from "../utils/embeds";
import { postEmbedToChannel } from "../utils/serverSetup";

export const postlinkingCommand: BotCommand = {
  data: new SlashCommandBuilder()
    .setName("postlinking")
    .setDescription("Post account linking and join guide embeds")
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

    const posts: {
      channel: string;
      embed: ReturnType<typeof linkYourAccountEmbed>;
      components?: ReturnType<typeof linkYourAccountComponents>;
    }[] = [
      {
        channel: embedChannels.welcome,
        embed: welcomeEmbed(),
      },
      {
        channel: embedChannels.linkYourAccount,
        embed: linkYourAccountEmbed(),
        components: linkYourAccountComponents(),
      },
      {
        channel: embedChannels.consoleJoinGuide,
        embed: consoleJoinGuideEmbed(),
      },
      {
        channel: embedChannels.howToJoin,
        embed: howToJoinEmbed(),
      },
    ];

    try {
      const posted: string[] = [];
      for (const post of posts) {
        const channel = await postEmbedToChannel(interaction.guild, post.channel, post.embed, {
          components: post.components,
        });
        posted.push(channel.toString());
      }

      await safeReply(interaction, {
        content: `Linking embeds posted in:\n${posted.join("\n")}`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `${(error as Error).message}` });
    }
  },
};
