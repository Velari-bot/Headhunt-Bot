# HeadHunt Survival Website

Account hub for **HeadHunt Survival** — a Minecraft Bedrock survival SMP. This website connects Discord accounts to Minecraft Bedrock players via code-based linking.

## Features (MVP)

- Dark premium survival-themed UI
- Discord OAuth login
- Player dashboard with stats
- Minecraft account linking via temporary codes (`HH-XXXX`)
- API endpoints for the Minecraft server to verify links and sync player data
- Preview pages for Market, Teams, and Bounties (coming soon)

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **PostgreSQL**
- **Auth.js** (NextAuth v5) with Discord provider

## Quick Start

### 1. Install dependencies

```bash
cd website
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Fill in all values in `.env`. Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Configure Discord OAuth

In the [Discord Developer Portal](https://discord.com/developers/applications):

1. Select your application (can use the same app as the Discord bot)
2. Go to **OAuth2** → add redirect URL:
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
3. For production, also add:
   ```
   https://yourdomain.com/api/auth/callback/discord
   ```
4. Copy **Client ID** and **Client Secret** to `.env`

### 4. Set up the database

Use [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app), or local PostgreSQL.

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|---|---|
| `/` | Home page |
| `/about` | Server overview |
| `/rules` | Basic rules |
| `/market` | Market preview (mock listings) |
| `/teams` | Teams preview |
| `/bounties` | Bounties preview |
| `/login` | Discord login |
| `/dashboard` | Player dashboard (protected) |
| `/link` | Generate Minecraft link code (protected) |
| `/profile` | Connected account info (protected) |

## API Endpoints

### `GET /api/me`

Returns the logged-in user with Minecraft account and stats. Requires Discord session.

### `POST /api/link/create`

Creates a temporary link code (expires in 10 minutes). Requires Discord session.

### `POST /api/link/verify`

Called by the Minecraft server when a player runs `/link HH-XXXX`.

```json
{
  "linkCode": "HH-4829",
  "minecraftName": "WrenchTheTank",
  "minecraftXuid": "123456789",
  "serverSecret": "your_minectaft_server_secret"
}
```

### `GET /api/player/:xuid`

Server-only. Returns player stats. Send header `x-server-secret` or include `serverSecret`.

### `POST /api/player/update`

Server-only. Updates player stats (coins, lives, maxHearts, status, team, ghostBuybacksUsed).

```json
{
  "minecraftXuid": "123456789",
  "serverSecret": "your_secret",
  "coins": 500,
  "lives": 2,
  "maxHearts": 11,
  "status": "Alive"
}
```

## Account Linking Flow

```
1. User logs in with Discord on the website
2. User visits /link and generates code (e.g. HH-4829)
3. User joins Minecraft server and types: /link HH-4829
4. Server plugin sends code + player name + XUID to POST /api/link/verify
5. Website links accounts and creates default player stats
6. Dashboard shows linked profile
```

## Minecraft Server Integration

Your Bedrock server plugin/script needs to:

1. Register a `/link <code>` command
2. Get the player's gamertag and XUID
3. POST to `https://yourwebsite.com/api/link/verify`
4. Periodically sync stats via `GET /api/player/:xuid` and `POST /api/player/update`

Always send `MINECRAFT_SERVER_SECRET` in requests.

## Deployment

### GitHub

The repo is hosted at [github.com/Velari-bot/Headhunt-Bot](https://github.com/Velari-bot/Headhunt-Bot). The Discord bot lives at the repo root; the website lives in `website/`.

```bash
git add .
git commit -m "Add website and deployment config"
git push origin main
```

### Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com/new)
2. Set **Root Directory** to `website`
3. Add environment variables (see `.env.example`)
4. Deploy

Or deploy from CLI:

```bash
cd website
vercel link
vercel env pull   # or add vars manually in Vercel dashboard
vercel --prod
```

**Required environment variables:**

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `DISCORD_CLIENT_ID` | Same Discord application as the bot |
| `DISCORD_CLIENT_SECRET` | OAuth client secret |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | Production URL, e.g. `https://your-app.vercel.app` |
| `MINECRAFT_SERVER_SECRET` | Shared secret for Minecraft API |
| `NEXT_PUBLIC_*` | Public config vars |

**After first deploy:**

1. Set `AUTH_URL` to your Vercel production URL
2. In Discord Developer Portal → OAuth2, add redirect:
   ```
   https://your-app.vercel.app/api/auth/callback/discord
   ```
3. Redeploy if needed

Migrations run automatically during build (`prisma migrate deploy`).

## Project Structure

```
website/
├── prisma/schema.prisma
├── src/
│   ├── app/              # Pages and API routes
│   ├── auth.ts           # Auth.js config
│   ├── components/       # UI components
│   ├── lib/              # Utilities
│   └── generated/prisma/ # Prisma client
└── .env.example
```

## Related

The Discord bot lives in the parent directory. Together they form:

```
Discord account ↔ Website account ↔ Minecraft Bedrock player
```

## License

MIT
