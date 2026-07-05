const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { whatIsHeadhuntEmbed, howToStartBasicsEmbed } = require('../utils/embeds');
const { embedChannels } = require('../config');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postfaq')
    .setDescription('Post overview embeds in #what-is-headhunt and #how-to-start')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);
    try {
      const overview = await postEmbedToChannel(interaction.guild, embedChannels.whatIsHeadhunt, whatIsHeadhuntEmbed());
      const start = await postEmbedToChannel(interaction.guild, embedChannels.howToStart, howToStartBasicsEmbed());
      await safeReply(interaction, {
        content: `✅ Posted in ${overview} and ${start}.`,
      });
    } catch (error) {
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
