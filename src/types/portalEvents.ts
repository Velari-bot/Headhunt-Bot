export const PORTAL_EVENT_TYPES = [
  "ACCOUNT_LINKED",
  "PLAYER_DIED",
  "PLAYER_GHOSTED",
  "HEAD_DROPPED",
  "BOUNTY_PLACED",
  "BOUNTY_CLAIMED",
  "MARKET_SALE",
  "TEAM_CREATED",
] as const;

export type PortalEventType = (typeof PORTAL_EVENT_TYPES)[number];

export type PortalEvent = {
  id: string;
  type: PortalEventType;
  minecraftXuid?: string | null;
  playerName?: string | null;
  payload?: Record<string, unknown> | null;
  createdAt: string;
};

export type PortalEventsResponse = {
  events: PortalEvent[];
  cursor?: string | null;
};
