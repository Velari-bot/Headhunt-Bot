export type ChannelType = "text" | "voice";

export type ChannelDefinition = {
  name: string;
  type: ChannelType;
};

export type CategoryDefinition = {
  name: string;
  staffOnly?: boolean;
  channels: ChannelDefinition[];
};

export type PermissionType =
  | "public-read"
  | "public-info"
  | "chat"
  | "market-chat"
  | "voice"
  | "staff-voice"
  | "staff-only"
  | "bot-commands";

export const categories: CategoryDefinition[] = [
  {
    name: "START HERE",
    channels: [
      { name: "welcome", type: "text" },
      { name: "announcements", type: "text" },
      { name: "how-to-join", type: "text" },
      { name: "console-join-guide", type: "text" },
      { name: "link-your-account", type: "text" },
    ],
  },
  {
    name: "SERVER BASICS",
    channels: [
      { name: "what-is-headhunt", type: "text" },
      { name: "quick-rules", type: "text" },
      { name: "lives-heads-hearts", type: "text" },
      { name: "market-teams-bounties", type: "text" },
      { name: "how-to-start", type: "text" },
    ],
  },
  {
    name: "SERVER INFO",
    channels: [
      { name: "full-rules", type: "text" },
      { name: "economy-info", type: "text" },
      { name: "price-guide", type: "text" },
      { name: "ghost-buyback", type: "text" },
      { name: "faq", type: "text" },
    ],
  },
  {
    name: "MARKET",
    channels: [
      { name: "market-updates", type: "text" },
      { name: "trade-chat", type: "text" },
      { name: "price-checks", type: "text" },
    ],
  },
  {
    name: "TEAMS",
    channels: [
      { name: "team-info", type: "text" },
      { name: "team-recruitment", type: "text" },
      { name: "team-list", type: "text" },
    ],
  },
  {
    name: "BOUNTIES",
    channels: [
      { name: "bounty-board", type: "text" },
      { name: "completed-bounties", type: "text" },
    ],
  },
  {
    name: "SUPPORT",
    channels: [
      { name: "create-ticket", type: "text" },
      { name: "report-player", type: "text" },
      { name: "appeal-death", type: "text" },
      { name: "bug-reports", type: "text" },
    ],
  },
  {
    name: "COMMUNITY",
    channels: [
      { name: "general", type: "text" },
      { name: "survival-chat", type: "text" },
      { name: "base-showcase", type: "text" },
      { name: "suggestions", type: "text" },
    ],
  },
  {
    name: "VOICE",
    channels: [
      { name: "General VC", type: "voice" },
      { name: "Team VC 1", type: "voice" },
      { name: "Team VC 2", type: "voice" },
      { name: "Team VC 3", type: "voice" },
      { name: "Staff VC", type: "voice" },
    ],
  },
  {
    name: "STAFF ONLY",
    staffOnly: true,
    channels: [
      { name: "staff-chat", type: "text" },
      { name: "staff-logs", type: "text" },
      { name: "bot-commands", type: "text" },
      { name: "death-logs", type: "text" },
      { name: "link-logs", type: "text" },
      { name: "economy-logs", type: "text" },
    ],
  },
];

export const channelPermissions: Record<string, PermissionType> = {
  welcome: "public-info",
  announcements: "public-info",
  "how-to-join": "public-info",
  "console-join-guide": "public-info",
  "link-your-account": "public-info",
  "what-is-headhunt": "public-read",
  "quick-rules": "public-read",
  "lives-heads-hearts": "public-read",
  "market-teams-bounties": "public-read",
  "how-to-start": "public-read",
  "full-rules": "public-info",
  "economy-info": "public-info",
  "price-guide": "public-info",
  "ghost-buyback": "public-info",
  faq: "public-info",
  "market-updates": "public-info",
  "trade-chat": "market-chat",
  "price-checks": "market-chat",
  "team-info": "public-info",
  "team-recruitment": "chat",
  "team-list": "public-info",
  "bounty-board": "public-info",
  "completed-bounties": "public-info",
  "create-ticket": "public-info",
  "report-player": "chat",
  "appeal-death": "chat",
  "bug-reports": "chat",
  general: "chat",
  "survival-chat": "chat",
  "base-showcase": "chat",
  suggestions: "chat",
  "General VC": "voice",
  "Team VC 1": "voice",
  "Team VC 2": "voice",
  "Team VC 3": "voice",
  "Staff VC": "staff-voice",
  "staff-chat": "staff-only",
  "staff-logs": "staff-only",
  "bot-commands": "bot-commands",
  "death-logs": "staff-only",
  "link-logs": "staff-only",
  "economy-logs": "staff-only",
};

export const embedChannels = {
  welcome: "welcome",
  linkYourAccount: "link-your-account",
  consoleJoinGuide: "console-join-guide",
  howToJoin: "how-to-join",
  whatIsHeadhunt: "what-is-headhunt",
  quickRules: "quick-rules",
  livesHeadsHearts: "lives-heads-hearts",
  marketTeamsBounties: "market-teams-bounties",
  howToStart: "how-to-start",
  fullRules: "full-rules",
  economyInfo: "economy-info",
  priceGuide: "price-guide",
  ghostBuyback: "ghost-buyback",
  faq: "faq",
  teamInfo: "team-info",
  bountyBoard: "bounty-board",
} as const;
