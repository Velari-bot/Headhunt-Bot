const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { quickRulesBasicsEmbed } = require('../utils/embeds');
const { embedChannels } = require('../config');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postrules')
    .setDescription('Post the quick rules embed in #quick-rules')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);
    try {
      const channel = await postEmbedToChannel(interaction.guild, embedChannels.quickRules, quickRulesBasicsEmbed());
      await safeReply(interaction, { content: `✅ Rules embed posted in ${channel}.` });
    } catch (error) {
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
