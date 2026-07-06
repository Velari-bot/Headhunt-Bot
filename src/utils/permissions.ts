import {
  Guild,
  OverwriteType,
  PermissionFlagsBits,
  Role,
} from "discord.js";
import { PermissionType } from "../config/channels";
import {
  restrictedStatusRoles,
  staffRoleNames,
} from "../config/roles";

function getRoles(roleMap: Map<string, Role>, names: readonly string[]) {
  return names.map((name) => roleMap.get(name)).filter(Boolean) as Role[];
}

function roleOverwrites(
  roles: Role[],
  allow: bigint[],
  deny: bigint[] = [],
) {
  return roles.map((role) => ({
    id: role.id,
    allow,
    deny,
    type: OverwriteType.Role,
  }));
}

export function buildOverwrites(
  guild: Guild,
  roleMap: Map<string, Role>,
  permType: PermissionType,
  channelName = "",
  isStaffCategory = false,
) {
  const overwrites = [];
  const everyone = guild.roles.everyone;
  const staffRoles = getRoles(roleMap, staffRoleNames);
  const ghostRole = roleMap.get("Ghost");
  const eliminatedRole = roleMap.get("Eliminated");
  const restrictedRoles = [ghostRole, eliminatedRole].filter(Boolean) as Role[];

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

    overwrites.push(
      ...roleOverwrites(staffRoles, [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.ManageMessages,
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.Speak,
      ]),
    );

    return overwrites;
  }

  switch (permType) {
    case "public-read":
      overwrites.push({
        id: everyone.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
        ],
        deny: [PermissionFlagsBits.SendMessages],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ManageMessages,
        ]),
      );
      break;

    case "public-info":
      overwrites.push({
        id: everyone.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
        ],
        deny: [PermissionFlagsBits.SendMessages],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ManageMessages,
        ]),
      );
      break;

    case "chat":
      overwrites.push({
        id: everyone.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
        ],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ManageMessages,
        ]),
      );
      break;

    case "market-chat":
      overwrites.push({
        id: everyone.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
        ],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ManageMessages,
        ]),
      );
      for (const role of restrictedRoles) {
        overwrites.push({
          id: role.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ReadMessageHistory,
          ],
          deny: [PermissionFlagsBits.SendMessages],
          type: OverwriteType.Role,
        });
      }
      break;

    case "voice":
      overwrites.push({
        id: everyone.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.Connect,
          PermissionFlagsBits.Speak,
        ],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.Connect,
          PermissionFlagsBits.Speak,
        ]),
      );
      break;

    case "staff-voice":
      overwrites.push({
        id: everyone.id,
        deny: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.Connect,
        ],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.Connect,
          PermissionFlagsBits.Speak,
        ]),
      );
      break;

    case "staff-only":
      overwrites.push({
        id: everyone.id,
        deny: [PermissionFlagsBits.ViewChannel],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
        ]),
      );
      break;

    case "bot-commands":
      overwrites.push({
        id: everyone.id,
        deny: [PermissionFlagsBits.ViewChannel],
        type: OverwriteType.Role,
      });
      overwrites.push(
        ...roleOverwrites(staffRoles, [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.SendMessages,
        ]),
      );
      break;

    default:
      overwrites.push({
        id: everyone.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.ReadMessageHistory,
        ],
        type: OverwriteType.Role,
      });
  }

  void channelName;
  void restrictedStatusRoles;

  return overwrites;
}
