const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { runFullSetup } = require('../utils/serverSetup');
const { safeReply, deferEphemeral } = require('../utils/interactionReply');
const { colors } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wipeserver')
    .setDescription('Delete ALL old channels/categories and rebuild the slim pre-launch layout')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      return safeReply(interaction, {
        content: '❌ You need **Administrator** permission to run this command.',
      });
    }

    await deferEphemeral(interaction);

    try {
      const summary = await runFullSetup(interaction.guild, {
        reset: true,
        postEmbeds: true,
      });

      const result = new EmbedBuilder()
        .setTitle('✅ Server Wiped & Rebuilt')
        .setDescription(
          'Removed the old full layout and created the slim pre-launch Discord:\n\n' +
            '**PRE-SERVER** → server-preview, community-chat, launch-updates\n' +
            '**START HERE** → welcome, announcements\n' +
            '**SERVER BASICS** → 5 quick guide channels'
        )
        .addFields(
          { name: 'Channels Created', value: `${summary.channelsCreated}`, inline: true },
          { name: 'Embeds Posted', value: `${summary.embedsPosted}`, inline: true },
          { name: 'Permissions Updated', value: `${summary.permissionsUpdated ?? 0}`, inline: true }
        )
        .setColor(colors.green)
        .setTimestamp();

      await safeReply(interaction, { embeds: [result] });
    } catch (error) {
      console.error('[WipeServer] Error:', error);
      await safeReply(interaction, { content: `❌ Wipe failed: ${error.message}` });
    }
  },
};
