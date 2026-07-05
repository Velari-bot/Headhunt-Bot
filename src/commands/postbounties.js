const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { bountyPricingEmbed } = require('../utils/economyEmbeds');
const { embedChannels } = require('../config');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postbounties')
    .setDescription('Post the bounty pricing embed in #bounty-pricing')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);
    try {
      const channel = await postEmbedToChannel(interaction.guild, embedChannels.bountyPricing, bountyPricingEmbed());
      await safeReply(interaction, { content: `✅ Bounty embed posted in ${channel}.` });
    } catch (error) {
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
