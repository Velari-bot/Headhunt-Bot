import { Client } from "discord.js";
import { portalClient } from "./portalClient";
import { PortalEvent } from "../types/portalEvents";

const DEFAULT_POLL_INTERVAL_MS = 60_000;

export class EventPoller {
  private timer: NodeJS.Timeout | null = null;
  private lastCursor: string | null = null;
  private running = false;

  start(client: Client, intervalMs = DEFAULT_POLL_INTERVAL_MS) {
    if (this.running) return;

    if (!portalClient.isConfigured()) {
      console.log("[Poller] Portal sync disabled — set HEADHUNT_PORTAL_URL and HEADHUNT_BOT_SECRET.");
      return;
    }

    this.running = true;
    console.log(`[Poller] Starting portal event poller (${intervalMs / 1000}s interval).`);

    void this.poll(client);

    this.timer = setInterval(() => {
      void this.poll(client);
    }, intervalMs);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.running = false;
  }

  private async poll(client: Client) {
    const result = await portalClient.fetchEvents({
      since: this.lastCursor ?? undefined,
    });

    if (result.events.length === 0) return;

    for (const event of result.events) {
      await this.handleEvent(client, event);
    }

    if (result.cursor) {
      this.lastCursor = result.cursor;
    }
  }

  /**
   * Placeholder handler — wire Discord log channels when portal sync is live.
   */
  private async handleEvent(client: Client, event: PortalEvent) {
    console.log(`[Poller] Received event ${event.type} (${event.id})`);

    const guild = client.guilds.cache.first();
    if (!guild) return;

    const channelName = eventChannelForType(event.type);
    if (!channelName) return;

    const channel = guild.channels.cache.find((c) => c.name === channelName);
    if (!channel || !channel.isTextBased()) return;

    // Future: format rich embeds per event type and post to staff log channels.
    await channel
      .send({
        content: `[${event.type}] ${event.playerName ?? event.minecraftXuid ?? "unknown player"}`,
      })
      .catch(() => undefined);
  }
}

function eventChannelForType(type: PortalEvent["type"]) {
  switch (type) {
    case "ACCOUNT_LINKED":
      return "link-logs";
    case "PLAYER_DIED":
    case "PLAYER_GHOSTED":
    case "HEAD_DROPPED":
      return "death-logs";
    case "MARKET_SALE":
      return "economy-logs";
    case "BOUNTY_PLACED":
    case "BOUNTY_CLAIMED":
      return "economy-logs";
    case "TEAM_CREATED":
      return "staff-logs";
    default:
      return null;
  }
}

export const eventPoller = new EventPoller();
