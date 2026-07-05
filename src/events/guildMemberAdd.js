const { Events } = require('discord.js');
const { assignJoinRole } = require('../utils/verification');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    try {
      await assignJoinRole(member);
    } catch (error) {
      console.error(`[Join] Failed to assign role to ${member.user.tag}:`, error);
    }
  },
};
