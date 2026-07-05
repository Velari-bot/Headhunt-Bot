const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config');

if (!token) {
  console.error('[Error] DISCORD_TOKEN is missing. Copy .env.example to .env and add your token.');
  process.exit(1);
}

if (!clientId) {
  console.error('[Error] CLIENT_ID is missing. Add your Application ID to .env.');
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data) {
    commands.push(command.data.toJSON());
    console.log(`[Deploy] Prepared command: /${command.data.name}`);
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`[Deploy] Registering ${commands.length} slash command(s)...`);

    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log(`[Deploy] Successfully registered guild commands for guild ${guildId}`);
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log('[Deploy] Successfully registered global commands (may take up to 1 hour)');
    }
  } catch (error) {
    console.error('[Deploy] Failed to register commands:', error);
    process.exit(1);
  }
})();
