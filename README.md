# HeadHunt Survival Discord Bot

Discord bot for **HeadHunt Survival** — a custom Minecraft Bedrock survival SMP with limited lives, player heads, bounties, teams, and a player-driven market.

This bot automatically sets up your Discord server with categories, channels, roles, permissions, and polished info embeds using a single `/setup` command.

## Features

- **`/setup`** — Creates the full server structure (roles, categories, channels, permissions, embeds)
- **`/resetserverlayout`** — Admin-only reset and rebuild of the server layout
- **`/postrules`**, **`/posteconomy`**, **`/postmarket`**, **`/postlives`**, **`/postteams`**, **`/postbounties`**, **`/postfaq`** — Re-post individual embeds

## Requirements

- [Node.js](https://nodejs.org/) 18 or higher
- A Discord bot application ([Discord Developer Portal](https://discord.com/developers/applications))
- Administrator access on your Discord server

## Quick Start

### 1. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** and name it (e.g. `HeadHunt Survival`)
3. Go to **Bot** → **Reset Token** → copy your token
4. Under **Privileged Gateway Intents**, you do not need any special intents for this bot
5. Copy your **Application ID** from the General Information page

### 2. Invite the Bot

Use this invite URL (replace `YOUR_CLIENT_ID` with your Application ID):

```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=268521464&scope=bot%20applications.commands
```

Required permissions:
- Manage Channels
- Manage Roles
- Send Messages
- Embed Links
- Read Message History
- View Channels

Or use permission integer: `268521464`

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_guild_id_here
CLIENT_ID=1523433446586847262
SERVER_IP=your.server.ip.here
SERVER_PORT=19132
```

**Finding your Guild ID:** Enable Developer Mode in Discord (Settings → Advanced → Developer Mode), then right-click your server icon → **Copy Server ID**.

### 5. Register Slash Commands

```bash
npm run deploy
```

Guild commands register instantly when `GUILD_ID` is set.

### 6. Start the Bot

```bash
npm start
```

### 7. Run Setup

In your Discord server, run:

```
/setup
```

You must have **Administrator** permission. The bot will create all roles, categories, channels, permissions, and post info embeds automatically.

## Server Structure Created

| Category | Channels |
|---|---|
| **PRE-SERVER** | server-preview, community-chat, launch-updates |
| **START HERE** | welcome, announcements, server-info, rules, how-to-join, faq |
| **HEADHUNT SYSTEM** | lives-system, head-rarities, hearts-system, death-rules, eliminated-players |
| **ECONOMY** | economy-info, market-info, player-market, price-guide, coin-guide, trade-logs |
| **BOUNTIES** | bounty-board, place-bounties, bounty-rules, completed-bounties |
| **TEAMS** | team-info, create-a-team, team-recruitment, team-list, team-wars |
| **SURVIVAL** | survival-chat, base-showcase, coords-and-travel, questions, suggestions |
| **SUPPORT** | create-ticket, report-player, appeal-elimination, bug-reports |
| **VOICE** | General VC, Team VC 1–3, Staff VC |
| **STAFF ONLY** | staff-chat, staff-logs, punishment-logs, market-admin, bot-commands |

## Roles Created

Owner, Admin, Moderator, Developer, HeadHunt Staff, Unverified, Player, Team Leader, Outlaw, Bounty Hunter, Eliminated, Verified

## Join Role System

When someone joins the server they automatically receive your configured **join role** (`JOIN_ROLE_ID`). By default this is the pre-server role that can see:

- **PRE-SERVER** — preview info, community chat, launch updates
- **Info guides** — rules, lives, economy, FAQ, and other bot embed channels

They chat in **#community-chat** while the Minecraft server is in pre-launch.

After clicking **Accept Rules & Get Access** in `#community-chat`, they receive **Player** and **Verified** and unlock the full Discord.

**Important:** Enable **Server Members Intent** in the [Discord Developer Portal](https://discord.com/developers/applications) → Bot → Privileged Gateway Intents.

Set your join role ID in `.env`:

```env
JOIN_ROLE_ID=1523436417148260512
```

To apply permissions on an existing server without resetting layout:

```
/syncpermissions
```

## Configuration

Edit `src/config.js` to customize:

- Brand colors
- Economy prices (hearts, heads, bounties, team cost, market tax)
- Role definitions
- Category and channel layout
- Channel permission types

Environment variables in `.env`:

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Bot token (required) |
| `GUILD_ID` | Your Discord server ID (recommended) |
| `CLIENT_ID` | Application ID (required for deploy) |
| `SERVER_IP` | Minecraft Bedrock server IP |
| `SERVER_PORT` | Minecraft Bedrock server port |

## Commands Reference

| Command | Permission | Description |
|---|---|---|
| `/setup` | Administrator | Full server setup |
| `/resetserverlayout` | Administrator | Delete and recreate layout |
| `/postrules` | Manage Server | Post rules embed |
| `/posteconomy` | Manage Server | Post economy embed |
| `/postmarket` | Manage Server | Post market embed |
| `/postlives` | Manage Server | Post lives, rarities, and hearts embeds |
| `/postteams` | Manage Server | Post teams embed |
| `/postbounties` | Manage Server | Post bounty rules embed |
| `/postfaq` | Manage Server | Post FAQ embed |
| `/syncpermissions` | Administrator | Apply Unverified join role channel locks |
| `/updateinfo` | Manage Server | Replace all info embeds with latest versions |

## Project Structure

```
├── .env.example
├── package.json
├── README.md
└── src/
    ├── index.js              # Bot entry point
    ├── deploy-commands.js    # Slash command registration
    ├── config.js             # Colors, prices, roles, channels
    ├── commands/
    │   ├── setup.js
    │   ├── resetserverlayout.js
    │   ├── postrules.js
    │   ├── posteconomy.js
    │   ├── postmarket.js
    │   ├── postlives.js
    │   ├── postteams.js
    │   ├── postbounties.js
    │   └── postfaq.js
    └── utils/
        ├── embeds.js         # Reusable embed builders
        └── serverSetup.js    # Role/channel/permission helpers
```

## Notes

- **Duplicate prevention:** `/setup` skips channels and roles that already exist
- **Embed deduplication:** Embeds are not re-posted if the bot already posted one in that channel (use individual `/post*` commands to force re-post)
- **Reset:** `/resetserverlayout` deletes all HeadHunt categories/channels and rebuilds from scratch
- **Eliminated role:** Players with this role cannot type in player-market, place-bounties, create-a-team, or team-wars
- **Staff category:** Only visible to Owner, Admin, Moderator, Developer, and HeadHunt Staff

## Troubleshooting

**Commands not showing up**
- Run `npm run deploy` again
- Confirm `GUILD_ID` and `CLIENT_ID` are correct in `.env`

**Missing Access / Permission errors**
- Re-invite the bot with the correct permissions
- Ensure the bot's role is above the roles it needs to manage

**Setup fails partway through**
- Check bot role hierarchy (bot role must be above managed roles)
- Run `/setup` again — it will skip existing items and continue

## License

MIT
