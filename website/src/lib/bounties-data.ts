export type BountyEntry = {
  id: string;
  target: string;
  amount: number;
  placedBy: string;
  status: "Active" | "Completed";
  time: string;
};

export const BOUNTY_HOW_IT_WORKS = [
  "Place a coin bounty on any player.",
  "The killer who claims the bounty also gets the target's head.",
  "The bounty creator does not get the head unless they personally kill the target.",
  "Completed bounties are logged on the bounty board.",
];

export const MOCK_ACTIVE_BOUNTIES: BountyEntry[] = [
  {
    id: "1",
    target: "MariusCOW",
    amount: 2000,
    placedBy: "Wrench",
    status: "Active",
    time: "2h ago",
  },
  {
    id: "2",
    target: "ScoutX",
    amount: 1250,
    placedBy: "Deckzee",
    status: "Active",
    time: "5h ago",
  },
  {
    id: "3",
    target: "Wrench",
    amount: 3500,
    placedBy: "MariusCOW",
    status: "Active",
    time: "1d ago",
  },
  {
    id: "4",
    target: "HealMaster",
    amount: 800,
    placedBy: "ScoutX",
    status: "Active",
    time: "1d ago",
  },
];

export const MOCK_COMPLETED_BOUNTIES: BountyEntry[] = [
  {
    id: "5",
    target: "MinerJoe",
    amount: 1500,
    placedBy: "Wrench",
    status: "Completed",
    time: "3d ago",
  },
  {
    id: "6",
    target: "Deckzee",
    amount: 900,
    placedBy: "MariusCOW",
    status: "Completed",
    time: "5d ago",
  },
];

export function formatCoins(amount: number): string {
  return amount.toLocaleString();
}
