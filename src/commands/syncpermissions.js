const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const {
  ensureRoles,
  applyAllPermissions,
  ensureCategoryOrder,
  postVerificationPanel,
} = require('../utils/serverSetup');
const { EmbedBuilder } = require('discord.js');
const { colors, joinRoleId } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('syncpermissions')
    .setDescription('Apply join role permissions for PRE-SERVER and info channels')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You need **Administrator** permission to run this command.',
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      const { roleMap } = await ensureRoles(interaction.guild);
      const permissionsUpdated = await applyAllPermissions(interaction.guild, roleMap);
      const categoriesOrdered = await ensureCategoryOrder(interaction.guild);
      const verificationPanelPosted = await postVerificationPanel(interaction.guild);

      const summary = new EmbedBuilder()
        .setTitle('✅ Permissions Synced')
        .setDescription(
          `Updated **${permissionsUpdated}** channel(s).\n` +
            `Ordered **${categoriesOrdered}** categories.\n` +
            `Verification panel ${verificationPanelPosted ? 'posted' : 'already exists'} in #community-chat.\n\n` +
            `New members get the join role (\`${joinRoleId}\`) and see **PRE-SERVER**, **SERVER BASICS**, and info channels until they verify.`
        )
        .setColor(colors.green)
        .setTimestamp();

      await interaction.editReply({ embeds: [summary] });
    } catch (error) {
      console.error('[SyncPermissions] Error:', error);
      await interaction.editReply({ content: `❌ Sync failed: ${error.message}` });
    }
  },
};
