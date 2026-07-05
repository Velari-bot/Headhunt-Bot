const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { postEmbedToChannel } = require('../utils/serverSetup');
const {
  whatIsHeadhuntEmbed,
  quickRulesBasicsEmbed,
  livesHeadsHeartsBasicsEmbed,
  marketTeamsBountiesBasicsEmbed,
  howToStartBasicsEmbed,
} = require('../utils/embeds');
const { embedChannels } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('postbasics')
    .setDescription('Post the SERVER BASICS embeds (quick beginner guides)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const posts = [
      [embedChannels.whatIsHeadhunt, whatIsHeadhuntEmbed()],
      [embedChannels.quickRules, quickRulesBasicsEmbed()],
      [embedChannels.livesHeadsHearts, livesHeadsHeartsBasicsEmbed()],
      [embedChannels.marketTeamsBounties, marketTeamsBountiesBasicsEmbed()],
      [embedChannels.howToStart, howToStartBasicsEmbed()],
    ];

    try {
      const results = [];
      for (const [channelName, embed] of posts) {
        const channel = await postEmbedToChannel(interaction.guild, channelName, embed);
        results.push(channel.toString());
      }

      await interaction.editReply({
        content: `✅ SERVER BASICS embeds posted in:\n${results.join('\n')}`,
      });
    } catch (error) {
      console.error('[PostBasics] Error:', error);
      await interaction.editReply({ content: `❌ ${error.message}` });
    }
  },
};
