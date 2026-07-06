# HeadHunt Survival Discord Bot

Discord bot for **HeadHunt Survival** — sets up the server layout, posts info embeds, and prepares for syncing events from the web portal.

The website handles Discord login and Minecraft linking. This bot does **not** link accounts directly.

## Features

- **`/setup`** — Creates roles, categories, channels, and permissions (skips existing items)
- **`/postbasics`** — Posts SERVER BASICS embeds
- **`/postrules`** — Posts full rules and FAQ
- **`/postlinking`** — Posts welcome, account linking, and join guides
- **`/posteconomy`** — Posts economy, price guide, and ghost buyback info
- **`/postteams`** — Posts team info
- **`/postbounties`** — Posts bounty board placeholder
- **`/status`** — Bot uptime and portal sync status

Portal event polling foundation (`src/services/portalClient.ts`, `src/services/eventPoller.ts`) is ready for when `/api/bot/events` is built on the website.

## Requirements

- Node.js 18+
- Discord bot application ([Developer Portal](https://discord.com/developers/applications))
- Administrator permission on your Discord server

## Setup

### 1. Create a Discord bot application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** (e.g. `HeadHunt Survival`)
3. Open **Bot** → **Reset Token** → copy the token
4. Copy the **Application ID** from **General Information**

No privileged intents are required for this bot.

### 2. Invite the bot with correct permissions

Replace `YOUR_CLIENT_ID` with your Application ID:

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

Permission integer: `268521464`

### 3. Configure environment

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Bot token from Developer Portal → Bot |
| `DISCORD_CLIENT_ID` | Application ID |
| `DISCORD_GUILD_ID` | Your Discord server ID (right-click server → Copy Server ID) |
| `HEADHUNT_PORTAL_URL` | Web portal URL (e.g. `https://www.headhuntersmc.online`) |
| `HEADHUNT_BOT_SECRET` | Shared secret for future `/api/bot/events` sync |

### 4. Install dependencies

```bash
npm install
```

### 5. Deploy slash commands

```bash
npm run deploy
```

Guild commands register instantly when `DISCORD_GUILD_ID` is set.

### 6. Start the bot

Development (TypeScript directly):

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

### 7. Run `/setup`

In your Discord server (Administrator required):

```
/setup
```

Creates categories, channels, roles, and permissions. Existing items are skipped.

### 8. Post info embeds

Run these after setup:

```
/postlinking
/postbasics
/postrules
/posteconomy
/postteams
/postbounties
```

## Server layout

| Category | Channels |
|---|---|
| **START HERE** | welcome, announcements, how-to-join, console-join-guide, link-your-account |
| **SERVER BASICS** | what-is-headhunt, quick-rules, lives-heads-hearts, market-teams-bounties, how-to-start |
| **SERVER INFO** | full-rules, economy-info, price-guide, ghost-buyback, faq |
| **MARKET** | market-updates, trade-chat, price-checks |
| **TEAMS** | team-info, team-recruitment, team-list |
| **BOUNTIES** | bounty-board, completed-bounties |
| **SUPPORT** | create-ticket, report-player, appeal-death, bug-reports |
| **COMMUNITY** | general, survival-chat, base-showcase, suggestions |
| **VOICE** | General VC, Team VC 1–3, Staff VC |
| **STAFF ONLY** | staff-chat, staff-logs, bot-commands, death-logs, link-logs, economy-logs |

## Roles

Owner, Admin, Moderator, Developer, HeadHunt Staff, Player, Linked, Team Leader, Outlaw, Bounty Hunter, Ghost, Eliminated

- **Linked** — Discord + Minecraft linked (manual for now; website sync later)
- **Ghost** — Lost all lives, may buy back
- **Eliminated** — Fully dead state
- **Ghost/Eliminated** — Can read market channels but cannot type in trade channels

## Portal sync (future)

`src/services/portalClient.ts` will poll:

```
GET /api/bot/events
```

Supported event types (prepared, not live yet):

- `ACCOUNT_LINKED`
- `PLAYER_DIED`
- `PLAYER_GHOSTED`
- `HEAD_DROPPED`
- `BOUNTY_PLACED`
- `BOUNTY_CLAIMED`
- `MARKET_SALE`
- `TEAM_CREATED`

The poller starts automatically when `HEADHUNT_PORTAL_URL` and `HEADHUNT_BOT_SECRET` are set. It no-ops gracefully until the website route exists.

## Project structure

```
├── .env.example
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── deploy-commands.ts
    ├── config/          # Roles, channels, colors, prices, env
    ├── commands/        # Slash commands
    ├── services/        # Portal client + event poller
    ├── types/
    └── utils/           # Embeds, permissions, server setup
```

## Commands reference

| Command | Permission | Description |
|---|---|---|
| `/setup` | Administrator | Create server structure |
| `/postbasics` | Administrator | Post SERVER BASICS embeds |
| `/postrules` | Administrator | Post full rules + FAQ |
| `/postlinking` | Administrator | Post welcome + linking guides |
| `/posteconomy` | Administrator | Post economy embeds |
| `/postteams` | Administrator | Post team info |
| `/postbounties` | Administrator | Post bounty board |
| `/status` | Everyone | Bot and portal status |

## Troubleshooting

**Commands not showing**

- Run `npm run deploy` again
- Confirm `DISCORD_CLIENT_ID` and `DISCORD_GUILD_ID` in `.env`

**Setup permission errors**

- Re-invite the bot with Manage Channels + Manage Roles
- Move the bot role above roles it manages

**Portal sync not working**

- Expected until `/api/bot/events` is implemented on the website
- Check `/status` for portal reachability

## Related

- Website portal: [`website/README.md`](website/README.md)
- Bedrock server: [`bds/README.md`](bds/README.md)

```
Discord account ↔ Website account ↔ Minecraft Bedrock player
```

## License

MIT
