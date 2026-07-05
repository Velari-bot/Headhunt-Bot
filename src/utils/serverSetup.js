const {
  ChannelType,
} = require('discord.js');
const {
  roles: roleConfig,
  channelPermissions,
  categories,
  embedChannels,
  joinRoleId,
  legacyCategories,
  legacyChannels,
} = require('../config');
const embeds = require('./embeds');
const { economyEmbedPosts } = require('./economyEmbeds');
const { buildOverwrites, JOIN_ROLE_KEY } = require('./permissions');
const {
  verificationPanelEmbed,
  verificationButtonRow,
} = require('./verification');

/**
 * @param {import('discord.js').Guild} guild
 * @returns {Promise<Map<string, import('discord.js').Role>>}
 */
async function ensureRoles(guild) {
  const roleMap = new Map();
  let created = 0;

  for (const roleDef of roleConfig) {
    let role = guild.roles.cache.find((r) => r.name === roleDef.name);

    if (!role) {
      role = await guild.roles.create({
        name: roleDef.name,
        color: roleDef.color,
        hoist: roleDef.hoist,
        reason: 'HeadHunt Survival setup',
      });
      created++;
      console.log(`[Setup] Created role: ${roleDef.name}`);
    } else {
      console.log(`[Setup] Role already exists: ${roleDef.name}`);
    }

    roleMap.set(roleDef.name, role);
  }

  if (joinRoleId) {
    let joinRole = guild.roles.cache.get(joinRoleId);
    if (!joinRole) {
      joinRole = await guild.roles.fetch(joinRoleId).catch(() => null);
    }
    if (joinRole) {
      roleMap.set(JOIN_ROLE_KEY, joinRole);
      console.log(`[Setup] Using join role: ${joinRole.name} (${joinRole.id})`);
    } else {
      console.warn(`[Setup] Join role ID ${joinRoleId} not found — assign JOIN_ROLE_ID in .env`);
    }
  }

  return { roleMap, created };
}

/**
 * @param {import('discord.js').Guild} guild
 */
async function ensureCategoryOrder(guild) {
  let position = 0;

  for (const categoryDef of categories) {
    const category = guild.channels.cache.find(
      (c) => c.type === ChannelType.GuildCategory && c.name === categoryDef.name
    );

    if (!category) continue;

    await category.setPosition(position);
    console.log(`[Setup] Category position ${position}: ${categoryDef.name}`);
    position++;
  }

  return position;
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {Map<string, import('discord.js').Role>} roleMap
 */
async function applyAllPermissions(guild, roleMap) {
  let updated = 0;

  for (const categoryDef of categories) {
    for (const channelDef of categoryDef.channels) {
      const channel = guild.channels.cache.find(
        (c) => c.name === channelDef.name
      );

      if (!channel) continue;

      const permType = channelPermissions[channelDef.name] || 'info';
      const overwrites = buildOverwrites(
        guild,
        roleMap,
        permType,
        channelDef.name,
        categoryDef.staffOnly
      );

      await channel.permissionOverwrites.set(overwrites, 'HeadHunt join role permissions');
      updated++;
      console.log(`[Permissions] Updated #${channelDef.name}`);
    }
  }

  return updated;
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {{ replace?: boolean }} [options]
 */
async function postVerificationPanel(guild, options = {}) {
  const { replace = false } = options;

  const channel = guild.channels.cache.find(
    (c) => c.name === 'community-chat' && c.type === ChannelType.GuildText
  );

  if (!channel) {
    console.warn('[Setup] #community-chat not found for verification panel');
    return false;
  }

  const messages = await channel.messages.fetch({ limit: 25 });
  const existingPanels = messages.filter(
    (m) =>
      m.author.id === guild.client.user.id &&
      m.components.length > 0 &&
      m.components.some((row) =>
        row.components.some((c) => c.customId === 'headhunt_verify')
      )
  );

  if (existingPanels.size > 0 && !replace) {
    console.log('[Setup] Verification panel already exists in #community-chat');
    return false;
  }

  for (const panel of existingPanels.values()) {
    await panel.delete().catch(() => {});
  }

  await channel.send({
    embeds: [verificationPanelEmbed(guild)],
    components: [verificationButtonRow()],
  });

  console.log('[Setup] Posted verification panel in #community-chat');
  return true;
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {Map<string, import('discord.js').Role>} roleMap
 */
async function ensureCategoriesAndChannels(guild, roleMap) {
  let categoriesCreated = 0;
  let channelsCreated = 0;
  let skipped = 0;
  /** @type {Map<string, import('discord.js').TextChannel>} */
  const channelMap = new Map();

  for (const categoryDef of categories) {
    let category = guild.channels.cache.find(
      (c) => c.type === ChannelType.GuildCategory && c.name === categoryDef.name
    );

    if (!category) {
      const categoryOverwrites = categoryDef.staffOnly
        ? buildOverwrites(guild, roleMap, 'staff-only', '', true)
        : [];

      category = await guild.channels.create({
        name: categoryDef.name,
        type: ChannelType.GuildCategory,
        permissionOverwrites: categoryOverwrites,
        reason: 'HeadHunt Survival setup',
      });
      categoriesCreated++;
      console.log(`[Setup] Created category: ${categoryDef.name}`);
    } else {
      skipped++;
      console.log(`[Setup] Category already exists: ${categoryDef.name}`);
    }

    for (const channelDef of categoryDef.channels) {
      const existing = guild.channels.cache.find(
        (c) => c.name === channelDef.name && c.parentId === category.id
      );

      if (existing) {
        skipped++;
        console.log(`[Setup] Channel already exists: #${channelDef.name}`);
        if (existing.type === ChannelType.GuildText) {
          channelMap.set(channelDef.name, existing);
        }
        continue;
      }

      const permType = channelPermissions[channelDef.name] || 'info';
      const overwrites = buildOverwrites(
        guild,
        roleMap,
        permType,
        channelDef.name,
        categoryDef.staffOnly
      );

      const channelType =
        channelDef.type === 'voice'
          ? ChannelType.GuildVoice
          : ChannelType.GuildText;

      const channel = await guild.channels.create({
        name: channelDef.name,
        type: channelType,
        parent: category.id,
        permissionOverwrites: overwrites,
        reason: 'HeadHunt Survival setup',
      });

      channelsCreated++;
      console.log(`[Setup] Created channel: #${channelDef.name}`);

      if (channel.type === ChannelType.GuildText) {
        channelMap.set(channelDef.name, channel);
      }
    }
  }

  return { channelMap, categoriesCreated, channelsCreated, skipped };
}

/**
 * @param {import('discord.js').TextChannel} channel
 * @param {string} botUserId
 */
async function clearBotEmbedsInChannel(channel, botUserId) {
  const messages = await channel.messages.fetch({ limit: 100 });
  const botEmbedMessages = messages.filter(
    (m) => m.author.id === botUserId && m.embeds.length > 0
  );

  for (const message of botEmbedMessages.values()) {
    await message.delete().catch(() => {});
  }

  return botEmbedMessages.size;
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {string} channelName
 * @param {import('discord.js').EmbedBuilder} embed
 * @param {{ replace?: boolean }} [options]
 */
async function postEmbedToChannel(guild, channelName, embed, options = {}) {
  const { replace = true } = options;

  const channel = guild.channels.cache.find(
    (c) => c.name === channelName && c.type === ChannelType.GuildText
  );

  if (!channel) {
    throw new Error(`Channel #${channelName} not found. Run /setup first.`);
  }

  if (replace && guild.client.user) {
    const removed = await clearBotEmbedsInChannel(channel, guild.client.user.id);
    if (removed > 0) {
      console.log(`[Embed] Removed ${removed} old embed(s) from #${channelName}`);
    }
  }

  await channel.send({ embeds: [embed] });
  return channel;
}

/**
 * Replace all info embeds across the server with current versions.
 * @param {import('discord.js').Guild} guild
 */
async function updateAllInfoEmbeds(guild) {
  return postAllEmbeds(guild, new Map(), true, true);
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {Map<string, import('discord.js').TextChannel>} channelMap
 * @param {boolean} forcePost
 * @param {boolean} replaceExisting
 */
async function postAllEmbeds(guild, channelMap, forcePost = false, replaceExisting = false) {
  let embedsPosted = 0;

  const posts = [
    { key: embedChannels.preServer, embed: embeds.preServerPreviewEmbed(), label: 'Pre-Server Preview' },
    { key: 'launch-updates', embed: embeds.launchUpdatesEmbed(), label: 'Launch Updates' },
    { key: embedChannels.welcome, embed: embeds.welcomeEmbed(), label: 'Welcome' },
    { key: embedChannels.announcements, embed: embeds.announcementsEmbed(), label: 'Announcements' },
    { key: embedChannels.whatIsHeadhunt, embed: embeds.whatIsHeadhuntEmbed(), label: 'What Is HeadHunt' },
    { key: embedChannels.quickRules, embed: embeds.quickRulesBasicsEmbed(), label: 'Quick Rules' },
    { key: embedChannels.livesHeadsHearts, embed: embeds.livesHeadsHeartsBasicsEmbed(), label: 'Lives Heads Hearts' },
    { key: embedChannels.marketTeamsBounties, embed: embeds.marketTeamsBountiesBasicsEmbed(), label: 'Market Teams Bounties' },
    { key: embedChannels.howToStart, embed: embeds.howToStartBasicsEmbed(), label: 'How To Start' },
    ...economyEmbedPosts.map((post) => ({
      key: post.key,
      embed: post.fn(),
      label: post.label,
    })),
  ];

  for (const post of posts) {
    let channel = channelMap.get(post.key);

    if (!channel) {
      channel = guild.channels.cache.find(
        (c) => c.name === post.key && c.type === ChannelType.GuildText
      );
    }

    if (!channel) {
      console.warn(`[Setup] Channel not found for embed: #${post.key}`);
      continue;
    }

    if (!forcePost) {
      const messages = await channel.messages.fetch({ limit: 10 });
      const botHasEmbed = messages.some(
        (m) => m.author.id === guild.client.user.id && m.embeds.length > 0
      );
      if (botHasEmbed) {
        console.log(`[Setup] Embed already posted in #${post.key}, skipping`);
        continue;
      }
    } else if (replaceExisting && guild.client.user) {
      await clearBotEmbedsInChannel(channel, guild.client.user.id);
    }

    await channel.send({ embeds: [post.embed] });
    embedsPosted++;
    console.log(`[Setup] Posted ${post.label} embed in #${post.key}`);
  }

  return embedsPosted;
}

/**
 * @param {import('discord.js').Guild} guild
 * @param {{ reset?: boolean, postEmbeds?: boolean }} options
 */
async function runFullSetup(guild, options = {}) {
  const { reset = false, postEmbeds = true } = options;

  console.log(`[Setup] Starting HeadHunt Survival setup for guild: ${guild.name}`);

  if (reset) {
    console.log('[Setup] Reset mode — deleting existing HeadHunt channels and categories');
    await deleteServerLayout(guild);
  }

  const { roleMap, created: rolesCreated } = await ensureRoles(guild);
  const {
    channelMap,
    categoriesCreated,
    channelsCreated,
    skipped,
  } = await ensureCategoriesAndChannels(guild, roleMap);

  let embedsPosted = 0;
  if (postEmbeds) {
    embedsPosted = await postAllEmbeds(guild, channelMap, reset, reset);
  }

  const permissionsUpdated = await applyAllPermissions(guild, roleMap);
  const categoriesOrdered = await ensureCategoryOrder(guild);
  const verificationPanelPosted = await postVerificationPanel(guild, { replace: reset });

  console.log('[Setup] Setup complete');

  return {
    rolesCreated,
    categoriesCreated,
    channelsCreated,
    embedsPosted,
    permissionsUpdated,
    categoriesOrdered,
    verificationPanelPosted,
    skipped,
  };
}

/**
 * @param {import('discord.js').Guild} guild
 */
async function deleteServerLayout(guild) {
  const categoryNames = new Set([
    ...legacyCategories,
    ...categories.map((c) => c.name),
  ]);
  const channelNames = new Set([
    ...legacyChannels,
    ...categories.flatMap((c) => c.channels.map((ch) => ch.name)),
  ]);

  for (const channel of [...guild.channels.cache.values()]) {
    if (
      (channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildVoice) &&
      channelNames.has(channel.name)
    ) {
      console.log(`[Reset] Deleting channel: #${channel.name}`);
      await channel.delete('HeadHunt Survival reset').catch((err) => {
        console.warn(`[Reset] Could not delete #${channel.name}: ${err.message}`);
      });
    }
  }

  for (const channel of [...guild.channels.cache.values()]) {
    if (
      channel.type === ChannelType.GuildCategory &&
      categoryNames.has(channel.name)
    ) {
      console.log(`[Reset] Deleting category: ${channel.name}`);
      await channel.delete('HeadHunt Survival reset').catch((err) => {
        console.warn(`[Reset] Could not delete category ${channel.name}: ${err.message}`);
      });
    }
  }
}

module.exports = {
  ensureRoles,
  ensureCategoriesAndChannels,
  applyAllPermissions,
  ensureCategoryOrder,
  postVerificationPanel,
  postAllEmbeds,
  runFullSetup,
  deleteServerLayout,
  postEmbedToChannel,
  updateAllInfoEmbeds,
  clearBotEmbedsInChannel,
};
