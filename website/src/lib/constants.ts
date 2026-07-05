export const BRAND = {
  name: "HeadHunt Survival",
  tagline: "3 Lives. Rare Heads. Player Market. Real Survival.",
};

export const MOCK_LISTINGS = [
  {
    id: "1",
    itemName: "Common Wrench's Head",
    itemType: "Heads",
    rarity: "Common",
    seller: "WrenchTheTank",
    price: 750,
  },
  {
    id: "2",
    itemName: "Rare Deckzee's Head",
    itemType: "Heads",
    rarity: "Rare",
    seller: "Deckzee",
    price: 1800,
  },
  {
    id: "3",
    itemName: "Legendary MariusCOW's Head",
    itemType: "Heads",
    rarity: "Legendary",
    seller: "MariusCOW",
    price: 4500,
  },
  {
    id: "4",
    itemName: "+1 Extra Max Heart",
    itemType: "Extra Hearts",
    rarity: "Uncommon",
    seller: "HealMaster",
    price: 3000,
  },
  {
    id: "5",
    itemName: "Diamond Sword",
    itemType: "Gear",
    rarity: "Rare",
    seller: "MinerJoe",
    price: 1500,
  },
  {
    id: "6",
    itemName: "Head Tracker",
    itemType: "Special Items",
    rarity: "Uncommon",
    seller: "ScoutX",
    price: 2500,
  },
] as const;

export const FEATURE_CARDS = [
  {
    title: "Lives",
    description: "Every player starts with 3 lives. Death drops a head — use them wisely.",
    icon: "❤️",
  },
  {
    title: "Heads",
    description: "Common, Rare, and Legendary heads drop on each death. Collect or trade them.",
    icon: "💀",
  },
  {
    title: "Hearts",
    description: "Buy extra max hearts on the market. More health, same limited lives.",
    icon: "💖",
  },
  {
    title: "Market",
    description: "Player-driven economy. Buy, sell, and trade heads, gear, and more.",
    icon: "⚖️",
  },
  {
    title: "Teams",
    description: "Team up with up to 2 others. Friendly fire off, shared goals on.",
    icon: "🛡️",
  },
  {
    title: "Bounties",
    description: "Put a price on a rival's head. Hunters get paid for the kill.",
    icon: "🎯",
  },
] as const;

export const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-400 border-gray-500/30",
  Uncommon: "text-green-400 border-green-500/30",
  Rare: "text-blue-400 border-blue-500/30",
  Legendary: "text-amber-400 border-amber-500/30",
};
