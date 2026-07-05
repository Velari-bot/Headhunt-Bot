const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const { economyEmbedPosts } = require('../utils/economyEmbeds');
const { deferEphemeral, safeReply } = require('../utils/interactionReply');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('posteconomy')
    .setDescription('Post all ECONOMY embeds (Ghost buyback, pricing, shop, resources)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await deferEphemeral(interaction);

    try {
      const results = [];
      for (const post of economyEmbedPosts) {
        const channel = await postEmbedToChannel(interaction.guild, post.key, post.fn());
        results.push(channel.toString());
      }

      await safeReply(interaction, {
        content: `✅ Posted **${results.length}** economy embeds:\n${results.join('\n')}`,
      });
    } catch (error) {
      console.error('[PostEconomy] Error:', error);
      await safeReply(interaction, { content: `❌ ${error.message}` });
    }
  },
};
