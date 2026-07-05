const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { runFullSetup } = require('../utils/serverSetup');
const { setupSuccessEmbed } = require('../utils/embeds');
const { safeReply, deferEphemeral } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetserverlayout')
    .setDescription('Delete and recreate the HeadHunt Survival server layout (Admin only)')
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

      await safeReply(interaction, {
        embeds: [setupSuccessEmbed(summary)],
      });
    } catch (error) {
      console.error('[Reset] Error:', error);
      await safeReply(interaction, {
        content: `❌ Reset failed: ${error.message}`,
      });
    }
  },
};
