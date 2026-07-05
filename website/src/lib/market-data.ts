import type { ListingIconKey, CategoryIconKey } from "@/components/market/mobile/icons";

export type MarketRarity = "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";

export type MarketCategory =
  | "Heads"
  | "Extra Hearts"
  | "Gear"
  | "Resources"
  | "Teams"
  | "Special Items";

export type SidebarFilter = "All Listings" | MarketCategory | "My Listings";

export type MarketListing = {
  id: string;
  rarity: MarketRarity;
  name: string;
  seller: string;
  price: number;
  category: MarketCategory;
  description: string;
  iconKey: ListingIconKey;
  suggestedRange: [number, number];
  quickSellValue: number;
  listingsCount: number;
  watchers: number;
};

export const MARKET_CATEGORIES: {
  id: MarketCategory;
  label: string;
  shortLabel: string;
  iconKey: CategoryIconKey;
}[] = [
  { id: "Heads", label: "Heads", shortLabel: "Heads", iconKey: "heads" },
  {
    id: "Extra Hearts",
    label: "Extra Hearts",
    shortLabel: "Hearts",
    iconKey: "hearts",
  },
  { id: "Gear", label: "Gear", shortLabel: "Gear", iconKey: "gear" },
  {
    id: "Resources",
    label: "Resources",
    shortLabel: "Resources",
    iconKey: "resources",
  },
  { id: "Teams", label: "Teams", shortLabel: "Teams", iconKey: "teams" },
  {
    id: "Special Items",
    label: "Special Items",
    shortLabel: "Special",
    iconKey: "special",
  },
];

export const SIDEBAR_NAV: {
  id: SidebarFilter;
  label: string;
  iconKey?: CategoryIconKey;
  lucide?: "grid" | "chest";
}[] = [
  { id: "All Listings", label: "All Listings", lucide: "grid" },
  { id: "Heads", label: "Heads", iconKey: "heads" },
  { id: "Extra Hearts", label: "Extra Hearts", iconKey: "hearts" },
  { id: "Gear", label: "Gear", iconKey: "gear" },
  { id: "Resources", label: "Resources", iconKey: "resources" },
  { id: "Teams", label: "Teams", iconKey: "teams" },
  { id: "Special Items", label: "Special Items", iconKey: "special" },
  { id: "My Listings", label: "My Listings", lucide: "chest" },
];

export const MOCK_MARKET_LISTINGS: MarketListing[] = [
  {
    id: "4",
    rarity: "UNCOMMON",
    name: "+1 Extra Max Heart",
    seller: "HealMaster",
    price: 3000,
    category: "Extra Hearts",
    description: "Permanently increases your max health by 1 heart.",
    iconKey: "heart",
    suggestedRange: [2500, 3500],
    quickSellValue: 1500,
    listingsCount: 5,
    watchers: 8,
  },
  {
    id: "6",
    rarity: "UNCOMMON",
    name: "Head Tracker",
    seller: "ScoutX",
    price: 2500,
    category: "Special Items",
    description: "Track nearby player heads within 64 blocks.",
    iconKey: "tracker",
    suggestedRange: [2000, 3000],
    quickSellValue: 1250,
    listingsCount: 3,
    watchers: 15,
  },
];

export const RARITY_STYLES: Record<
  MarketRarity,
  { label: string; text: string; border: string; bg: string }
> = {
  COMMON: {
    label: "COMMON",
    text: "text-zinc-400",
    border: "border-zinc-600/50",
    bg: "bg-zinc-800/40",
  },
  UNCOMMON: {
    label: "UNCOMMON",
    text: "text-hh-green",
    border: "border-hh-green/40",
    bg: "bg-hh-green/10",
  },
  RARE: {
    label: "RARE",
    text: "text-hh-blue",
    border: "border-hh-blue/40",
    bg: "bg-hh-blue/10",
  },
  LEGENDARY: {
    label: "LEGENDARY",
    text: "text-hh-gold",
    border: "border-hh-gold/40",
    bg: "bg-hh-gold/10",
  },
};

export const MARKET_RULES = [
  { icon: "skull" as const, text: "Heads can be bought and sold." },
  { icon: "heart" as const, text: "Extra Hearts increase max health, not lives." },
  {
    icon: "skull-red" as const,
    text: "Selling your own Common or Rare head costs 1 life.",
  },
  {
    icon: "crown" as const,
    text: "Legendary own head cannot be sold.",
  },
];

export function formatCoins(amount: number): string {
  return amount.toLocaleString();
}

export function rarityLabel(rarity: MarketRarity): string {
  return rarity.charAt(0) + rarity.slice(1).toLowerCase();
}

export function filterListings(filter: SidebarFilter): MarketListing[] {
  if (filter === "All Listings") return MOCK_MARKET_LISTINGS;
  if (filter === "My Listings") return [];
  return MOCK_MARKET_LISTINGS.filter((l) => l.category === filter);
}

export function getFilterLabel(filter: SidebarFilter): string {
  if (filter === "All Listings") return "All Listings";
  if (filter === "My Listings") return "My Listings";
  return filter;
}

export function getDefaultFilter(): SidebarFilter {
  return "All Listings";
}

export function getDefaultSelectedId(filter: SidebarFilter): string {
  return filterListings(filter)[0]?.id ?? "";
}

export function getDefaultCategory(): MarketCategory {
  return "Extra Hearts";
}

export function getDefaultSelectedIdMobile(): string {
  return MOCK_MARKET_LISTINGS[0]?.id ?? "";
}

export function calcAfterTax(price: number, taxPercent = 5): number {
  return Math.floor(price * (1 - taxPercent / 100));
}
