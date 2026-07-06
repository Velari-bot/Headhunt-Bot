import { env } from "../config/env";
import {
  PortalEventsResponse,
  PortalEventType,
} from "../types/portalEvents";

export class PortalClient {
  private baseUrl: string | undefined;
  private secret: string | undefined;

  constructor() {
    this.baseUrl = env.portalUrl?.replace(/\/$/, "");
    this.secret = env.botSecret;
  }

  isConfigured() {
    return Boolean(this.baseUrl && this.secret);
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * Fetch new server events from the web portal.
   * Route is not implemented on the website yet — returns empty when unavailable.
   */
  async fetchEvents(options: {
    since?: string;
    types?: PortalEventType[];
  } = {}): Promise<PortalEventsResponse> {
    if (!this.isConfigured()) {
      return { events: [], cursor: null };
    }

    const url = new URL(`${this.baseUrl}/api/bot/events`);
    if (options.since) url.searchParams.set("since", options.since);
    if (options.types?.length) {
      url.searchParams.set("types", options.types.join(","));
    }

    try {
      const response = await fetch(url, {
        headers: {
          "x-bot-secret": this.secret!,
          Accept: "application/json",
        },
      });

      if (response.status === 404 || response.status === 501) {
        console.warn("[Portal] /api/bot/events is not available yet.");
        return { events: [], cursor: null };
      }

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`Portal API error ${response.status}: ${text || response.statusText}`);
      }

      return (await response.json()) as PortalEventsResponse;
    } catch (error) {
      console.warn("[Portal] Failed to fetch events:", error);
      return { events: [], cursor: null };
    }
  }

  async ping(): Promise<{ ok: boolean; message: string }> {
    if (!this.baseUrl) {
      return { ok: false, message: "HEADHUNT_PORTAL_URL is not configured." };
    }

    try {
      const response = await fetch(this.baseUrl, { method: "HEAD" });
      if (response.ok || response.status === 405 || response.status === 404) {
        return { ok: true, message: "Portal URL is reachable." };
      }
      return {
        ok: false,
        message: `Portal responded with HTTP ${response.status}.`,
      };
    } catch (error) {
      return {
        ok: false,
        message: `Portal unreachable: ${(error as Error).message}`,
      };
    }
  }
}

export const portalClient = new PortalClient();
