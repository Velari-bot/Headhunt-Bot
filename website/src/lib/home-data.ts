export type PlayerStatus = "Alive" | "Ghost" | "Eliminated";

export type OnlinePlayer = {
  id: string;
  name: string;
  status: PlayerStatus;
  team: string | null;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  coins: number;
  lives: number;
  heads: number;
  status: PlayerStatus;
};

export const SERVER_STATUS = {
  name: "HeadHunt Survival",
  playersOnline: 74,
  maxPlayers: 100,
  isOnline: true,
};

export const MOCK_ONLINE_PLAYERS: OnlinePlayer[] = [
  { id: "1", name: "WrenchTheTank", status: "Alive", team: "BloodHunt" },
  { id: "2", name: "Deckzee", status: "Alive", team: null },
  { id: "3", name: "MariusCOW", status: "Ghost", team: "IronWolves" },
  { id: "4", name: "HealMaster", status: "Alive", team: null },
  { id: "5", name: "ScoutX", status: "Alive", team: "BloodHunt" },
  { id: "6", name: "MinerJoe", status: "Eliminated", team: null },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "WrenchTheTank", coins: 4850, lives: 3, heads: 12, status: "Alive" },
  { rank: 2, name: "Deckzee", coins: 4200, lives: 2, heads: 9, status: "Alive" },
  { rank: 3, name: "MariusCOW", coins: 3900, lives: 1, heads: 15, status: "Ghost" },
  { rank: 4, name: "ScoutX", coins: 3100, lives: 3, heads: 7, status: "Alive" },
  { rank: 5, name: "HealMaster", coins: 2800, lives: 2, heads: 5, status: "Alive" },
  { rank: 6, name: "MinerJoe", coins: 1500, lives: 0, heads: 3, status: "Eliminated" },
];

export const STATUS_STYLES: Record<
  PlayerStatus,
  { text: string; dot: string; bg: string }
> = {
  Alive: {
    text: "text-hh-green",
    dot: "bg-hh-green",
    bg: "bg-hh-green/10 border-hh-green/30",
  },
  Ghost: {
    text: "text-hh-blue",
    dot: "bg-hh-blue",
    bg: "bg-hh-blue/10 border-hh-blue/30",
  },
  Eliminated: {
    text: "text-hh-gray",
    dot: "bg-hh-gray",
    bg: "bg-zinc-800/40 border-zinc-600/30",
  },
};

export function formatCoins(amount: number): string {
  return amount.toLocaleString();
}
