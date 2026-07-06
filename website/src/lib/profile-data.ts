export type ProfileData = {
  discordUsername: string;
  discordAvatar: string | null;
  discordId: string;
  minecraftName: string | null;
  minecraftXuid: string | null;
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
