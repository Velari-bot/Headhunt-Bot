const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { marketPricesEmbed } = require('../utils/economyEmbeds');
const { embedChannels } = require('../config');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postmarket')
    .setDescription('Post the market prices embed in #market-prices')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);
    try {
      const channel = await postEmbedToChannel(interaction.guild, embedChannels.marketPrices, marketPricesEmbed());
      await safeReply(interaction, { content: `✅ Market embed posted in ${channel}.` });
    } catch (error) {
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
