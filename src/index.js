const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, clientId } = require('./config');
const { safeReply, deferEphemeral, EPHEMERAL } = require('./utils/interactionReply');

if (!token) {
  console.error('[Error] DISCORD_TOKEN is missing. Copy .env.example to .env and add your token.');
  process.exit(1);
}

const enableGuildMembers = process.env.ENABLE_GUILD_MEMBERS !== 'false';

const intents = [GatewayIntentBits.Guilds];
if (enableGuildMembers) {
  intents.push(GatewayIntentBits.GuildMembers);
} else {
  console.warn('[Bot] GuildMembers intent disabled — auto join role on member join will not run.');
}

const client = new Client({ intents });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if (!command.data || !command.execute) {
    console.warn(`[Warning] Command at ${filePath} is missing required "data" or "execute" property.`);
    continue;
  }

  client.commands.set(command.data.name, command);
  console.log(`[Bot] Loaded command: /${command.data.name}`);
}

const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath) && enableGuildMembers) {
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`[Bot] Loaded event: ${event.name}`);
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`[Bot] Logged in as ${readyClient.user.tag}`);
  console.log(`[Bot] Serving ${readyClient.guilds.cache.size} guild(s)`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    const { handleVerifyButton } = require('./handlers/verifyButton');
    try {
      const handled = await handleVerifyButton(interaction);
      if (handled) return;
    } catch (error) {
      console.error('[Error] Button interaction failed:', error);
      await safeReply(interaction, {
        content: '❌ Something went wrong. Make sure the bot is online and try again.',
      }).catch(() => {});
    }
    return;
  }

  if (!interaction.isChatInputCommand()) return;

  if (interaction.guild?.members?.me && interaction.member && !interaction.member.user.bot) {
    const { assignJoinRole, memberHasFullAccess } = require('./utils/verification');
    if (!memberHasFullAccess(interaction.member)) {
      await assignJoinRole(interaction.member).catch(() => {});
    }
  }

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`[Error] Command /${interaction.commandName} failed:`, error);
    await safeReply(interaction, {
      content: '❌ There was an error executing this command.',
      flags: EPHEMERAL,
    }).catch(() => {});
  }
});

client.on('error', (error) => {
  console.error('[Bot] Client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('[Bot] Unhandled rejection:', error);
});

client.login(token).catch((error) => {
  const message = error?.message || String(error);

  if (message.includes('disallowed intents') || message.includes('DisallowedIntents')) {
    const appLink = clientId
      ? `https://discord.com/developers/applications/${clientId}/bot`
      : 'https://discord.com/developers/applications';

    console.error(`
[Error] Server Members Intent is not enabled for this bot.

The bot needs it to auto-assign the join role when someone joins your server.

Fix (takes ~30 seconds):
1. Open ${appLink}
2. Go to Bot → Privileged Gateway Intents
3. Turn ON "Server Members Intent"
4. Save changes
5. Run: npm start

Temporary workaround (bot starts, but no auto role on join):
  Add ENABLE_GUILD_MEMBERS=false to .env
`);
  } else {
    console.error('[Error] Failed to log in:', message);
  }

  process.exit(1);
});
