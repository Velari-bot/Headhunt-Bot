const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { teamPricingEmbed } = require('../utils/economyEmbeds');
const { embedChannels } = require('../config');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postteams')
    .setDescription('Post the team pricing embed in #team-pricing')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);
    try {
      const channel = await postEmbedToChannel(interaction.guild, embedChannels.teamPricing, teamPricingEmbed());
      await safeReply(interaction, { content: `✅ Teams embed posted in ${channel}.` });
    } catch (error) {
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
