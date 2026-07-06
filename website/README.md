# HeadHunt Survival Website

Private player portal for **HeadHunt Survival** — a Minecraft Bedrock survival SMP. Connect Discord, link your Minecraft Bedrock account, and unlock the app shell for market, teams, and more (coming soon).

## Player flow

```
Open website
→ Connect Discord
→ Redirect to Profile
→ Generate Minecraft link code
→ Type ?link CODE in Minecraft
→ Website shows Minecraft Connected
→ App unlocks basic navigation
```

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript** + **Tailwind CSS**
- **Prisma** + **PostgreSQL**
- **Auth.js** (NextAuth v5) with Discord OAuth

## Setup

### 1. Install dependencies

```bash
cd website
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in every value in `.env`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon, Supabase, Railway, or local) |
| `AUTH_SECRET` | Auth.js session secret — generate with `openssl rand -base64 32` |
| `AUTH_DISCORD_ID` | Discord OAuth **Client ID** from the Developer Portal |
| `AUTH_DISCORD_SECRET` | Discord OAuth **Client Secret** |
| `MINECRAFT_SERVER_SECRET` | Shared secret for server-only API routes — must match `bds/behavior_packs/.../config.js` |
| `NEXT_PUBLIC_SERVER_IP` | Bedrock server IP shown on the profile setup card |
| `NEXT_PUBLIC_SERVER_PORT` | Bedrock server port (default `19132`) |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | Discord invite link for the community server |
| `NEXT_PUBLIC_DISCORD_GUILD_ID` | Discord guild ID (used by bot integrations) |

Optional aliases: `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` work in place of `AUTH_DISCORD_*`.

For local dev, set `AUTH_URL=http://localhost:3000`. In production, set `AUTH_URL` to your deployed URL.

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Discord OAuth redirect URL

In the [Discord Developer Portal](https://discord.com/developers/applications):

1. Open your application (same app as the Discord bot is fine)
2. Go to **OAuth2** → **Redirects**
3. Add:
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
4. For production, also add:
   ```
   https://www.headhuntersmc.online/api/auth/callback/discord
   ```
5. Copy **Client ID** and **Client Secret** into `.env` as `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET`

### 4. Run Prisma migration

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing the link flow

### Generate a link code

1. Connect Discord on the website
2. Go to **Profile**
3. Click **Generate Link Code** — you'll get a code like `HH-4829` (expires in 10 minutes, single use)

### Test `/api/link/verify` with curl

```bash
curl -X POST http://localhost:3000/api/link/verify \
  -H "Content-Type: application/json" \
  -H "x-server-secret: YOUR_MINECRAFT_SERVER_SECRET" \
  -d '{
    "linkCode": "HH-4829",
    "minecraftName": "TestPlayer",
    "minecraftXuid": "12345678901234567"
  }'
```

Expected success response:

```json
{
  "success": true,
  "message": "Linked to Discord account YourDiscordName",
  "discordUsername": "YourDiscordName"
}
```

### Test with the Bedrock server

1. Copy `MINECRAFT_SERVER_SECRET` into `bds/behavior_packs/HeaDHunters_Combined_BP/scripts/headhunt/config.js`
2. Set the portal URL in the behavior pack config
3. Start the BDS world with the behavior pack enabled
4. Generate a code on the website, join the server, and type `?link HH-XXXX` in chat
5. Refresh your profile — Minecraft should show as connected and navigation unlocks

See [`../bds/README.md`](../bds/README.md) for BDS setup details.

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Discord auth gate (redirects to `/profile` if logged in) |
| `/profile` | Discord login required | Account setup, link code, stats |
| `/market` | Minecraft linked | Coming soon placeholder |
| `/team` | Minecraft linked | Coming soon placeholder |
| `/sell` | Minecraft linked | Coming soon placeholder |
| `/watchlist` | Minecraft linked | Coming soon placeholder |

## API endpoints

### `POST /api/link/create`

Requires Discord session. Creates a temporary link code (10-minute expiry, single use).

### `POST /api/link/verify`

Server-only. Called by the Bedrock behavior pack when a player runs `?link HH-XXXX`.

```json
{
  "linkCode": "HH-4829",
  "minecraftName": "WrenchTheTank",
  "minecraftXuid": "12345678901234567"
}
```

Send `x-server-secret` header or include `serverSecret` in the body.

Creates a `ServerEvent` with `type: ACCOUNT_LINKED` on success.

### `GET /api/player/:xuid`

Server-only. Returns linked player stats.

### `POST /api/player/update`

Server-only. Updates player stats from the Minecraft server. Cannot be called from the browser without the server secret.

### `GET /api/me`

Requires Discord session. Returns the logged-in user with Minecraft account and stats.

## Common errors

| Error | Fix |
|---|---|
| Discord OAuth callback mismatch | Add exact redirect URL in Discord Developer Portal → OAuth2 → Redirects |
| `Missing DATABASE_URL` | Set `DATABASE_URL` in `.env` and restart the dev server |
| Prisma migration not run | Run `npx prisma migrate dev` then `npx prisma generate` |
| Wrong server secret / `401 Unauthorized` | Ensure `MINECRAFT_SERVER_SECRET` matches in `.env` and behavior pack `config.js` |
| BDS cannot reach portal URL | Use a public HTTPS URL (ngrok or deployed Vercel URL) — localhost is not reachable from a remote BDS |
| Link code expired | Codes expire after 10 minutes — generate a new one on Profile |
| Link code already used | Each code works once — generate a new one |
| Minecraft already linked to another Discord | Each XUID can only link to one Discord account |

## Deployment (Vercel)

1. Import the repo, set **Root Directory** to `website`
2. Add all environment variables from `.env.example`
3. Set `AUTH_URL` to your production URL
4. Add production Discord OAuth redirect URL
5. Deploy — migrations run via `prisma migrate deploy` during build

## Project structure

```
website/
├── prisma/schema.prisma      # User, LinkCode, MinecraftAccount, PlayerStats, ServerEvent
├── src/
│   ├── app/                  # Pages and API routes
│   ├── auth.ts               # Auth.js config
│   ├── components/           # UI components
│   └── lib/                  # Utilities
└── .env.example
```

## Related

The Discord bot lives in the parent directory. Together they form:

```
Discord account ↔ Website account ↔ Minecraft Bedrock player
```

## License

MIT
