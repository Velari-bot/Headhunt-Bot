const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postVerificationPanel } = require('../utils/serverSetup');
const { safeReply, deferEphemeral } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postverify')
    .setDescription('Re-post the Accept Rules button in #community-chat')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);

    try {
      await postVerificationPanel(interaction.guild, { replace: true });
      await safeReply(interaction, {
        content: '✅ Verification panel posted in #community-chat.',
      });
    } catch (error) {
      console.error('[PostVerify] Error:', error);
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
