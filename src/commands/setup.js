const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { runFullSetup } = require('../utils/serverSetup');
const { setupSuccessEmbed } = require('../utils/embeds');
const { safeReply, deferEphemeral } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Create the full HeadHunt Survival server structure, roles, and info embeds')
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
        reset: false,
        postEmbeds: true,
      });

      await safeReply(interaction, {
        embeds: [setupSuccessEmbed(summary)],
      });
    } catch (error) {
      console.error('[Setup] Error:', error);
      await safeReply(interaction, {
        content: `❌ Setup failed: ${error.message}`,
      });
    }
  },
};
