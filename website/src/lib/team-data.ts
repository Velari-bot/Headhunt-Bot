export type MemberStatus =
  | "Alive"
  | "Critical"
  | "Ghost"
  | "Eliminated"
  | "Outlaw";

export type TeamMemberData = {
  id: string;
  name: string;
  role: "Leader" | "Member";
  lives: number;
  hearts: number;
  maxHearts: number;
  coins: number;
  status: MemberStatus;
};

export type TeamStats = {
  kills: number;
  headsCollected: number;
  teamCoins: number;
  bountiesClaimed: number;
  eliminations: number;
  marketSales: number;
  teamValue: number;
};

export type TeamHeadsSummary = {
  common: number;
  rare: number;
  legendary: number;
  total: number;
  mostValuable: {
    name: string;
    value: number;
  };
};

export type TeamBounty = {
  id: string;
  target: string;
  amount: number;
  type: "target" | "on-team";
};

export type TeamActivity = {
  id: string;
  message: string;
  time: string;
};

export type TeamData = {
  name: string;
  leader: string;
  memberCount: number;
  maxMembers: number;
  status: string;
  seasonRank: string;
  teamValue: number;
  bankBalance: number;
  members: TeamMemberData[];
  stats: TeamStats;
  heads: TeamHeadsSummary;
  bounties: TeamBounty[];
  peaceContracts: number;
  activeWars: number;
  outlawRisk: string;
  activity: TeamActivity[];
};

export type TeamPageData = {
  minecraftLinked: boolean;
  minecraftName: string | null;
  hasTeam: boolean;
  isLeader: boolean;
  team: TeamData | null;
};

export const TEAM_PRICES = {
  createTeam: 1500,
  teamHome: 1000,
  teamVault: 2500,
  declareWar: 2500,
  peaceContract24h: 500,
};

export const MOCK_TEAM: TeamData = {
  name: "BloodHunt",
  leader: "Wrench",
  memberCount: 3,
  maxMembers: 3,
  status: "Active",
  seasonRank: "Diamond III",
  teamValue: 18450,
  bankBalance: 9250,
  members: [
    {
      id: "1",
      name: "Wrench",
      role: "Leader",
      lives: 3,
      hearts: 10,
      maxHearts: 15,
      coins: 4850,
      status: "Alive",
    },
    {
      id: "2",
      name: "Deckzee",
      role: "Member",
      lives: 2,
      hearts: 12,
      maxHearts: 15,
      coins: 2100,
      status: "Alive",
    },
    {
      id: "3",
      name: "ScoutX",
      role: "Member",
      lives: 1,
      hearts: 10,
      maxHearts: 15,
      coins: 900,
      status: "Critical",
    },
  ],
  stats: {
    kills: 24,
    headsCollected: 17,
    teamCoins: 9250,
    bountiesClaimed: 6,
    eliminations: 4,
    marketSales: 12,
    teamValue: 18450,
  },
  heads: {
    common: 8,
    rare: 6,
    legendary: 3,
    total: 17,
    mostValuable: {
      name: "Legendary MariusCOW's Head",
      value: 4500,
    },
  },
  bounties: [
    { id: "1", target: "MariusCOW", amount: 2000, type: "target" },
    { id: "2", target: "ScoutX", amount: 1250, type: "target" },
    { id: "3", target: "Wrench", amount: 3500, type: "on-team" },
    { id: "4", target: "Deckzee", amount: 1000, type: "on-team" },
  ],
  peaceContracts: 1,
  activeWars: 0,
  outlawRisk: "Clean",
  activity: [
    { id: "1", message: "Wrench deposited 500 coins", time: "2h ago" },
    { id: "2", message: "Deckzee claimed a 1,250 coin bounty", time: "5h ago" },
    { id: "3", message: "ScoutX lost Rare ScoutX's Head", time: "1d ago" },
    { id: "4", message: "BloodHunt bought +1 Extra Max Heart", time: "2d ago" },
  ],
};

export const MEMBER_STATUS_STYLES: Record<
  MemberStatus,
  { text: string; border: string; bg: string }
> = {
  Alive: {
    text: "text-hh-green",
    border: "border-hh-green/30",
    bg: "bg-hh-green/10",
  },
  Critical: {
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
  Ghost: {
    text: "text-hh-blue",
    border: "border-hh-blue/30",
    bg: "bg-hh-blue/10",
  },
  Eliminated: {
    text: "text-hh-gray",
    border: "border-zinc-600/30",
    bg: "bg-zinc-800/40",
  },
  Outlaw: {
    text: "text-hh-red",
    border: "border-hh-red/30",
    bg: "bg-hh-red/10",
  },
};

export function formatCoins(amount: number): string {
  return amount.toLocaleString();
}

export function buildTeamPageData(
  minecraftLinked: boolean,
  minecraftName: string | null,
  teamName: string | null,
): TeamPageData {
  const hasTeam = !!teamName;
  const isLeader =
    hasTeam &&
    !!minecraftName &&
    MOCK_TEAM.members.some(
      (m) =>
        m.role === "Leader" &&
        (m.name === minecraftName ||
          minecraftName.toLowerCase().includes(m.name.toLowerCase())),
    );

  return {
    minecraftLinked,
    minecraftName,
    hasTeam,
    isLeader,
    team: hasTeam ? MOCK_TEAM : null,
  };
}
