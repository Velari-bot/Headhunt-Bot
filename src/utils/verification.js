const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { colors, joinRoleId, fullAccessRoleNames } = require('../config');

const VERIFY_BUTTON_ID = 'headhunt_verify';

function getJoinRoleFromGuild(guild) {
  if (!joinRoleId) return null;
  return guild.roles.cache.get(joinRoleId) || null;
}

function isJoinRole(role) {
  return Boolean(role && joinRoleId && role.id === joinRoleId);
}

/**
 * @param {import('discord.js').GuildMember} member
 */
function memberHasFullAccess(member) {
  const joinRole = getJoinRoleFromGuild(member.guild);

  return member.roles.cache.some((role) => {
    if (isJoinRole(role)) return false;
    return fullAccessRoleNames.includes(role.name);
  });
}

/**
 * @param {import('discord.js').GuildMember} member
 */
function memberNeedsVerification(member) {
  const joinRole = getJoinRoleFromGuild(member.guild);
  if (!joinRole) return false;
  if (memberHasFullAccess(member)) return false;
  return member.roles.cache.has(joinRole.id);
}

function verificationPanelEmbed(guild) {
  const joinRole = getJoinRoleFromGuild(guild);
  const roleLabel = joinRole ? joinRole.name : 'Pre-Server';

  return new EmbedBuilder()
    .setTitle('🔒 Discord Access')
    .setDescription(
      `Welcome! You have the **${roleLabel}** role.\n\n` +
        'The **Minecraft server is not live yet**. Browse **START HERE** and **SERVER BASICS** to learn what HeadHunt is about.\n\n' +
        'Chat in **#community-chat** and click below when you have read the rules.'
    )
    .addFields(
      {
        name: '📖 What you can see',
        value: '**PRE-SERVER**, **START HERE**, and **SERVER BASICS** — everything you need before launch.',
      },
      {
        name: '💬 Chat here',
        value: 'Use **#community-chat** to talk with other early members.',
      },
      {
        name: '✅ After accepting rules',
        value: 'You receive the **Player** role for when more channels open at launch.',
      },
      {
        name: '🚀 Minecraft',
        value: 'In-game access will be announced in **#launch-updates** when the Bedrock server goes live.',
      }
    )
    .setColor(colors.green)
    .setFooter({ text: 'Read #quick-rules before accepting.' })
    .setTimestamp();
}

function verificationButtonRow() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(VERIFY_BUTTON_ID)
      .setLabel('Accept Rules & Get Access')
      .setStyle(ButtonStyle.Success)
      .setEmoji('✅')
  );
}

/**
 * @param {import('discord.js').GuildMember} member
 */
async function grantFullAccess(member) {
  const guild = member.guild;
  const joinRole = getJoinRoleFromGuild(guild);

  const rolesToAdd = fullAccessRoleNames
    .map((name) => guild.roles.cache.find((r) => r.name === name))
    .filter(Boolean)
    .filter((role) => !isJoinRole(role));

  if (memberHasFullAccess(member)) {
    if (joinRole && member.roles.cache.has(joinRole.id)) {
      await member.roles.remove(joinRole, 'HeadHunt verification cleanup');
    }
    return { alreadyVerified: true, rolesAdded: [] };
  }

  if (joinRole && member.roles.cache.has(joinRole.id)) {
    await member.roles.remove(joinRole, 'HeadHunt verification');
  }

  const added = [];
  for (const role of rolesToAdd) {
    if (!member.roles.cache.has(role.id)) {
      await member.roles.add(role, 'HeadHunt verification');
      added.push(role.name);
    }
  }

  return { alreadyVerified: false, rolesAdded: added };
}

/**
 * @param {import('discord.js').GuildMember} member
 */
async function assignJoinRole(member) {
  if (member.user.bot) return false;

  const joinRole = getJoinRoleFromGuild(member.guild);
  if (!joinRole) {
    console.warn(`[Join] Role ID "${joinRoleId}" not found in ${member.guild.name}`);
    return false;
  }

  if (memberHasFullAccess(member)) return false;

  if (!member.roles.cache.has(joinRole.id)) {
    await member.roles.add(joinRole, 'HeadHunt auto join role');
    console.log(`[Join] Assigned ${joinRole.name} (${joinRole.id}) to ${member.user.tag}`);
    return true;
  }

  return false;
}

module.exports = {
  VERIFY_BUTTON_ID,
  verificationPanelEmbed,
  verificationButtonRow,
  getJoinRoleFromGuild,
  memberHasFullAccess,
  memberNeedsVerification,
  grantFullAccess,
  assignJoinRole,
};
