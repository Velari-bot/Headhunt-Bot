export type ProfileData = {
  discordUsername: string;
  discordAvatar: string | null;
  discordId: string;
  minecraftName: string | null;
  minecraftLinked: boolean;
  memberSince: string;
  stats: {
    lives: number;
    maxHearts: number;
    coins: number;
    status: string;
    ghostBuybacksUsed: number;
    team: string | null;
  } | null;
};

export const PLACEHOLDER_STATS = {
  lives: 3,
  maxHearts: 10,
  coins: 250,
  status: "Alive",
  ghostBuybacksUsed: 0,
  team: null as string | null,
};

export const RECENT_ACTIVITY = [
  {
    id: "1",
    label: "Linked Minecraft account",
    time: "Recently",
    icon: "link" as const,
  },
];
