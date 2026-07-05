const {
  PermissionFlagsBits,
  OverwriteType,
} = require('discord.js');
const {
  staffRoleNames,
  newcomerVisibleChannels,
  preServerChatChannels,
  fullAccessRoleNames,
} = require('../config');

const JOIN_ROLE_KEY = '__join__';

/**
 * @param {import('discord.js').Guild} guild
 * @param {Map<string, import('discord.js').Role>} roleMap
 */
function getStaffRoles(roleMap) {
  return staffRoleNames.map((name) => roleMap.get(name)).filter(Boolean);
}

/**
 * @param {Map<string, import('discord.js').Role>} roleMap
 */
function getFullAccessRoles(roleMap) {
  return fullAccessRoleNames.map((name) => roleMap.get(name)).filter(Boolean);
}

/**
 * @param {Map<string, import('discord.js').Role>} roleMap
 */
function getJoinRole(roleMap) {
  return roleMap.get(JOIN_ROLE_KEY) || null;
}

/**
 * @param {string} channelName
 */
function isJoinRoleVisibleChannel(channelName) {
  return newcomerVisibleChannels.includes(channelName);
}

/**
 * @param {string} channelName
 */
function isPreServerChatChannel(channelName) {
  return preServerChatChannels.includes(channelName);
}

/**
 * @param {import('discord.js').Role[]} roles
 * @param {bigint[]} allow
 * @param {bigint[]} [deny]
 */
function roleAllows(roles, allow, deny = []) {
  return roles.map((role) => ({
    id: role.id,
    allow,
    deny,
    type: OverwriteType.Role,
  }));
}

/**
 * @param {import('discord.js').Role} joinRole
 * @param {string} channelName
 */
function joinRoleOverwrite(joinRole, channelName) {
  const canChat = isPreServerChatChannel(channelName);

  return {
    id: joinRole.id,
    allow: [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
      ...(canChat ? [PermissionFlagsBits.SendMessages] : []),
    ],
    deny: canChat ? [] : [PermissionFlagsBits.SendMessages],
    type: OverwriteType.Role,
  };
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {Map<string, import('discord.js').Role>} roleMap
 * @param {string} permType
 * @param {string} channelName
 * @param {boolean} [isStaffCategory]
 */
function buildOverwrites(guild, roleMap, permType, channelName = '', isStaffCategory = false) {
  const overwrites = [];
  const everyone = guild.roles.everyone;
  const staffRoles = getStaffRoles(roleMap);
  const fullAccessRoles = getFullAccessRoles(roleMap);
  const joinRole = getJoinRole(roleMap);
  const eliminatedRole = roleMap.get('Eliminated');
  const joinVisible = isJoinRoleVisibleChannel(channelName);

  if (isStaffCategory) {
    overwrites.push({
      id: everyone.id,
      deny: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.Connect,
      ],
      type: OverwriteType.Role,
    });

    overwrites.push(...roleAllows(staffRoles, [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak,
    ]));

    return overwrites;
  }

  overwrites.push({
    id: everyone.id,
    deny: [PermissionFlagsBits.ViewChannel],
    type: OverwriteType.Role,
  });

  if (joinRole && joinVisible) {
    overwrites.push(joinRoleOverwrite(joinRole, channelName));
  }

  switch (permType) {
    case 'pre-info':
    case 'info':
      overwrites.push(...roleAllows(fullAccessRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
      ], [PermissionFlagsBits.SendMessages]));

      overwrites.push(...roleAllows(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.ManageMessages,
      ]));
      break;

    case 'pre-chat':
    case 'chat':
      overwrites.push(...roleAllows(fullAccessRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.SendMessages,
      ]));

      overwrites.push(...roleAllows(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ManageMessages,
      ]));

      if (eliminatedRole) {
        overwrites.push({
          id: eliminatedRole.id,
          deny: [PermissionFlagsBits.SendMessages],
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ReadMessageHistory,
          ],
          type: OverwriteType.Role,
        });
      }
      break;

    case 'eliminated-restricted':
      overwrites.push(...roleAllows(fullAccessRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.SendMessages,
      ]));

      overwrites.push(...roleAllows(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ManageMessages,
      ]));

      if (eliminatedRole) {
        overwrites.push({
          id: eliminatedRole.id,
          deny: [PermissionFlagsBits.SendMessages],
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ReadMessageHistory,
          ],
          type: OverwriteType.Role,
        });
      }
      break;

    case 'voice':
      overwrites.push(...roleAllows(fullAccessRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.Speak,
      ]));

      overwrites.push(...roleAllows(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.Speak,
      ]));
      break;

    case 'staff-voice':
      overwrites.push(...roleAllows(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.Speak,
      ]));
      break;

    case 'staff-only':
      overwrites.push(...roleAllows(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
      ]));
      break;

    default:
      overwrites.push(...roleAllows(fullAccessRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ReadMessageHistory,
      ]));
  }

  return overwrites;
}

module.exports = {
  JOIN_ROLE_KEY,
  buildOverwrites,
  getStaffRoles,
  getFullAccessRoles,
  getJoinRole,
  isJoinRoleVisibleChannel,
  isPreServerChatChannel,
};
