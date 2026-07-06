# Bedrock Dedicated Server — HeadHunt Linking Setup

Copy these files into your **Bedrock Dedicated Server** folder. The behavior pack itself (`HeaDHunters_Combined_BP`) must already be installed under `behavior_packs/`.

## Production URLs

| Service | URL |
|---|---|
| Website (Vercel) | https://www.headhuntersmc.online |
| Discord OAuth callback | https://www.headhuntersmc.online/api/auth/callback/discord |
| Link verify API | https://www.headhuntersmc.online/api/link/verify |

## Quick checklist

```text
[ ] Website .env MINECRAFT_SERVER_SECRET set
[ ] Vercel MINECRAFT_SERVER_SECRET matches
[ ] behavior pack config.js secret matches
[ ] HEADHUNT_API_BASE_URL points to deployed site (not localhost on VPS)
[ ] @minecraft/server-net in manifest dependencies
[ ] permissions.json allows @minecraft/server-net
[ ] world_behavior_packs.json + world_resource_packs.json active
[ ] Discord OAuth redirect includes headhuntersmc.online
```

## 1. Behavior pack config

Copy:

```text
bds/behavior_packs/HeaDHunters_Combined_BP/scripts/headhunt/config.example.js
  →  config.js (in the same folder, then fill MINECRAFT_SERVER_SECRET)
  →  <BDS>/behavior_packs/HeaDHunters_Combined_BP/scripts/headhunt/config.js
```

**Local dev only** (BDS and `npm run dev` on the same machine), change:

```js
export const HEADHUNT_API_BASE_URL = "http://localhost:3000";
```

**VPS / production BDS** — keep:

```js
export const HEADHUNT_API_BASE_URL = "https://www.headhuntersmc.online";
```

## 2. Enable @minecraft/server-net

Copy permissions to **one** of:

```text
<BDS>/config/default/permissions.json
<BDS>/config/<script-module-uuid>/permissions.json   ← preferred (pack-specific)
```

Use `bds/config/default/permissions.json` as the template.

## 3. Manifest dependency

Ensure your behavior pack `manifest.json` includes:

```json
{
  "module_name": "@minecraft/server-net",
  "version": "1.0.0-beta"
}
```

See `bds/behavior_packs/HeaDHunters_Combined_BP/manifest.json` for the full reference.

## 4. World pack activation

In your world folder, set pack UUIDs from your installed packs:

```text
world_behavior_packs.json  →  HeadHunters Survival BP v1.2.5
world_resource_packs.json  →  HeadHunters Survival RP v1.2.5
```

Use the `.example` files in this folder and replace `REPLACE_WITH_*_UUID`.

## 5. server.properties

Confirm on BDS:

```properties
server-name=HeadHunt Survival
gamemode=survival
difficulty=normal
allow-cheats=false
```

Scripting must be enabled (default on recent BDS builds with behavior packs).

## 6. Test linking

### Website

```bash
cd website
npm run dev
```

1. Log in with Discord at http://localhost:3000
2. Go to `/profile`
3. Generate code (e.g. `HH-4829`)

### Server

1. Start BDS with behavior + resource packs loaded
2. Join the world
3. Type: `?link HH-4829`
4. Refresh `/profile` — should show **Minecraft Connected**

### API smoke test (local)

```bash
curl -X POST http://localhost:3000/api/link/verify \
  -H "Content-Type: application/json" \
  -d '{
    "linkCode": "HH-0000",
    "minecraftName": "TestPlayer",
    "minecraftXuid": "123456789",
    "serverSecret": "YOUR_SECRET_FROM_ENV"
  }'
```

Expect `404` for invalid code, `401` for wrong secret.

## Security note

`config.js` contains the shared secret. Fine for private testing; for public launch, move the secret to a VPS-side bridge so the downloadable pack never exposes it.
