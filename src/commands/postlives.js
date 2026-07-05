const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { livesHeadsHeartsBasicsEmbed } = require('../utils/embeds');
const { ghostBuybackEmbed, headReclaimingEmbed } = require('../utils/economyEmbeds');
const { embedChannels } = require('../config');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postlives')
    .setDescription('Post lives/hearts basics and Ghost system embeds')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);
    try {
      const basics = await postEmbedToChannel(interaction.guild, embedChannels.livesHeadsHearts, livesHeadsHeartsBasicsEmbed());
      const ghost = await postEmbedToChannel(interaction.guild, 'ghost-buyback', ghostBuybackEmbed());
      const reclaim = await postEmbedToChannel(interaction.guild, 'head-reclaiming', headReclaimingEmbed());
      await safeReply(interaction, {
        content: `✅ Posted in ${basics}, ${ghost}, and ${reclaim}.`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
