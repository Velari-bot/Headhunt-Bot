import {
  CategoryChannel,
  ChannelType,
  Guild,
  Message,
  NonThreadGuildBasedChannel,
  Role,
  TextChannel,
} from "discord.js";
import { roles } from "../config/roles";
import {
  categories,
  channelPermissions,
  PermissionType,
} from "../config/channels";
import { buildOverwrites } from "./permissions";

export type SetupSummary = {
  rolesCreated: number;
  categoriesCreated: number;
  channelsCreated: number;
  permissionsUpdated: number;
  skipped: number;
};

export async function ensureRoles(guild: Guild) {
  const roleMap = new Map<string, Awaited<ReturnType<typeof guild.roles.create>>>();
  let created = 0;

  for (const roleDef of roles) {
    let role = guild.roles.cache.find((r) => r.name === roleDef.name);

    if (!role) {
      role = await guild.roles.create({
        name: roleDef.name,
        color: roleDef.color,
        hoist: roleDef.hoist,
        reason: "HeadHunt Survival setup",
      });
      created++;
      console.log(`[Setup] Created role: ${roleDef.name}`);
    } else {
      console.log(`[Setup] Role already exists: ${roleDef.name}`);
    }

    roleMap.set(roleDef.name, role);
  }

  return { roleMap, created };
}

export async function ensureCategoriesAndChannels(
  guild: Guild,
  roleMap: Map<string, Role>,
) {
  let categoriesCreated = 0;
  let channelsCreated = 0;
  let skipped = 0;
  const channelMap = new Map<string, TextChannel>();

  for (const categoryDef of categories) {
    let category = guild.channels.cache.find(
      (c) => c.type === ChannelType.GuildCategory && c.name === categoryDef.name,
    );

    if (!category) {
      const categoryOverwrites = categoryDef.staffOnly
        ? buildOverwrites(guild, roleMap, "staff-only", "", true)
        : [];

      category = await guild.channels.create({
        name: categoryDef.name,
        type: ChannelType.GuildCategory,
        permissionOverwrites: categoryOverwrites,
        reason: "HeadHunt Survival setup",
      });
      categoriesCreated++;
      console.log(`[Setup] Created category: ${categoryDef.name}`);
    } else {
      skipped++;
      console.log(`[Setup] Category already exists: ${categoryDef.name}`);
    }

    for (const channelDef of categoryDef.channels) {
      const existing = guild.channels.cache.find(
        (c) => c.name === channelDef.name && c.parentId === category!.id,
      );

      if (existing) {
        skipped++;
        console.log(`[Setup] Channel already exists: #${channelDef.name}`);
        if (existing.type === ChannelType.GuildText) {
          channelMap.set(channelDef.name, existing as TextChannel);
        }
        continue;
      }

      const permType: PermissionType =
        channelPermissions[channelDef.name] ??
        (categoryDef.staffOnly ? "staff-only" : "public-info");

      const overwrites = buildOverwrites(
        guild,
        roleMap,
        permType,
        channelDef.name,
        categoryDef.staffOnly,
      );

      const channel = await guild.channels.create({
        name: channelDef.name,
        type:
          channelDef.type === "voice"
            ? ChannelType.GuildVoice
            : ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: overwrites,
        reason: "HeadHunt Survival setup",
      });

      channelsCreated++;
      console.log(`[Setup] Created channel: #${channelDef.name}`);

      if (channel.type === ChannelType.GuildText) {
        channelMap.set(channelDef.name, channel as TextChannel);
      }
    }
  }

  return { channelMap, categoriesCreated, channelsCreated, skipped };
}

export async function applyAllPermissions(
  guild: Guild,
  roleMap: Map<string, Role>,
) {
  let updated = 0;

  for (const categoryDef of categories) {
    for (const channelDef of categoryDef.channels) {
      const channel = guild.channels.cache.find((c) => c.name === channelDef.name);
      if (!channel || !("permissionOverwrites" in channel)) continue;

      const permType: PermissionType =
        channelPermissions[channelDef.name] ??
        (categoryDef.staffOnly ? "staff-only" : "public-info");

      const overwrites = buildOverwrites(
        guild,
        roleMap,
        permType,
        channelDef.name,
        categoryDef.staffOnly,
      );

      await (channel as NonThreadGuildBasedChannel).permissionOverwrites.set(
        overwrites,
        "HeadHunt Survival permissions",
      );
      updated++;
      console.log(`[Permissions] Updated #${channelDef.name}`);
    }
  }

  return updated;
}

export async function ensureCategoryOrder(guild: Guild) {
  let position = 0;

  for (const categoryDef of categories) {
    const category = guild.channels.cache.find(
      (c) => c.type === ChannelType.GuildCategory && c.name === categoryDef.name,
    ) as CategoryChannel | undefined;
    if (!category) continue;

    await category.setPosition(position);
    position++;
  }

  return position;
}

async function clearBotEmbedsInChannel(channel: TextChannel, botUserId: string) {
  const messages = await channel.messages.fetch({ limit: 100 });
  const botEmbedMessages = messages.filter(
    (m: Message) => m.author.id === botUserId && m.embeds.length > 0,
  );

  for (const message of botEmbedMessages.values()) {
    await message.delete().catch(() => undefined);
  }

  return botEmbedMessages.size;
}

export async function postEmbedToChannel(
  guild: Guild,
  channelName: string,
  embed: ReturnType<typeof import("./embeds").welcomeEmbed>,
  options: { replace?: boolean; components?: ReturnType<typeof import("./embeds").linkYourAccountComponents> } = {},
) {
  const { replace = true, components = [] } = options;

  const channel = guild.channels.cache.find(
    (c) => c.name === channelName && c.type === ChannelType.GuildText,
  ) as TextChannel | undefined;

  if (!channel) {
    throw new Error(`Channel #${channelName} not found. Run /setup first.`);
  }

  if (replace && guild.client.user) {
    const removed = await clearBotEmbedsInChannel(channel, guild.client.user.id);
    if (removed > 0) {
      console.log(`[Embed] Removed ${removed} old embed(s) from #${channelName}`);
    }
  }

  await channel.send({
    embeds: [embed],
    components,
  });

  return channel;
}

export async function runFullSetup(guild: Guild): Promise<SetupSummary> {
  console.log(`[Setup] Starting HeadHunt Survival setup for guild: ${guild.name}`);

  const { roleMap, created: rolesCreated } = await ensureRoles(guild);
  const {
    categoriesCreated,
    channelsCreated,
    skipped,
  } = await ensureCategoriesAndChannels(guild, roleMap);

  const permissionsUpdated = await applyAllPermissions(guild, roleMap);
  await ensureCategoryOrder(guild);

  console.log("[Setup] Setup complete");

  return {
    rolesCreated,
    categoriesCreated,
    channelsCreated,
    permissionsUpdated,
    skipped,
  };
}
