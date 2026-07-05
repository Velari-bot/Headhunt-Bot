const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { updateAllInfoEmbeds } = require('../utils/serverSetup');
const { EmbedBuilder } = require('discord.js');
const { colors } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('updateinfo')
    .setDescription('Replace all info embeds with the latest versions (hearts, economy, FAQ, etc.)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const count = await updateAllInfoEmbeds(interaction.guild);

      const summary = new EmbedBuilder()
        .setTitle('✅ Info Embeds Updated')
        .setDescription(
          `Replaced **${count}** embed(s) across your server with the latest HeadHunt Survival info.\n\n` +
            'Updated channels include hearts, lives, economy, market, price guide, FAQ, and more.'
        )
        .setColor(colors.green)
        .setTimestamp();

      await interaction.editReply({ embeds: [summary] });
    } catch (error) {
      console.error('[UpdateInfo] Error:', error);
      await interaction.editReply({ content: `❌ Update failed: ${error.message}` });
    }
  },
};
