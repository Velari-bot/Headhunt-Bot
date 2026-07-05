import type { ComponentType } from "react";
import {
  ArrowLeft,
  Coins,
  Crown,
  Eye,
  Heart,
  List,
  ShoppingCart,
  Skull,
  Star,
  Tag,
  User,
} from "lucide-react";
import {
  MARKET_RULES,
  MarketListing,
  RARITY_STYLES,
  formatCoins,
  rarityLabel,
} from "@/lib/market-data";
import { ItemImage, LISTING_ICON_MAP } from "../mobile/icons";

type DesktopItemDetailProps = {
  listing: MarketListing | undefined;
};

const RULE_ICONS = {
  skull: Skull,
  heart: Heart,
  "skull-red": Skull,
  crown: Crown,
} as const;

export function DesktopItemDetail({ listing }: DesktopItemDetailProps) {
  if (!listing) {
    return (
      <aside className="flex w-[340px] shrink-0 flex-col bg-hh-bg/50">
        <div className="flex flex-1 items-center justify-center p-6 text-center">
          <p className="text-sm text-hh-gray">Select a listing to view details</p>
        </div>
        <MarketRulesFooter />
      </aside>
    );
  }

  const rarity = RARITY_STYLES[listing.rarity];
  const iconSrc = LISTING_ICON_MAP[listing.iconKey];

  return (
    <aside className="flex w-[340px] shrink-0 flex-col overflow-y-auto bg-hh-bg/50">
      <div className="flex-1 p-5">
        <h2 className={`font-market text-lg font-bold ${rarity.text}`}>
          {listing.name}
        </h2>

        <div className="mt-4 flex justify-center">
          <div className="relative">
            <div
              className={`absolute -inset-4 rounded-2xl blur-2xl ${
                listing.rarity === "RARE"
                  ? "bg-hh-blue/25"
                  : listing.rarity === "LEGENDARY"
                    ? "bg-hh-gold/20"
                    : "bg-hh-green/10"
              }`}
            />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl border border-hh-border/50 bg-gradient-to-b from-hh-panel to-black/60 shadow-xl">
              <ItemImage src={iconSrc} alt={listing.name} size="lg" />
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <DetailRow label="Price" value={`${formatCoins(listing.price)} Coins`} valueClass="text-hh-gold font-semibold" icon={Coins} />
          <DetailRow label="Seller" value={listing.seller} valueClass="text-hh-blue font-medium" icon={User} />
          <DetailRow label="Rarity" value={rarityLabel(listing.rarity)} valueClass={rarity.text} icon={Tag} />
          <DetailRow label="Category" value={listing.category} />
        </div>

        <p className="mt-4 text-xs leading-relaxed text-hh-gray">
          {listing.description}
        </p>

        <div className="mt-4 rounded-xl border border-hh-border/60 bg-hh-panel/80 p-4">
          <p className="mb-3 text-xs font-semibold text-hh-white">Market Stats</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-hh-gray">Suggested Range</p>
              <p className="font-medium text-hh-gold">
                {formatCoins(listing.suggestedRange[0])} – {formatCoins(listing.suggestedRange[1])}
              </p>
            </div>
            <div>
              <p className="text-hh-gray">Quick-Sell Value</p>
              <p className="font-medium text-hh-white">
                {formatCoins(listing.quickSellValue)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-hh-gray">
              <List className="h-3 w-3" />
              Listings: <span className="text-hh-white">{listing.listingsCount}</span>
            </div>
            <div className="flex items-center gap-1 text-hh-gray">
              <Eye className="h-3 w-3" />
              Watchers: <span className="text-hh-white">{listing.watchers}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-hh-green py-3 text-sm font-bold text-white disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2.25} />
            Buy Now
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-1.5 rounded-xl border border-hh-border bg-hh-panel py-2.5 text-xs text-hh-gray disabled:cursor-not-allowed"
            >
              <Star className="h-3.5 w-3.5" />
              Add to Watchlist
            </button>
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-1.5 rounded-xl border border-hh-border bg-hh-panel py-2.5 text-xs text-hh-gray disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          </div>
        </div>
      </div>

      <MarketRulesFooter />
    </aside>
  );
}

function DetailRow({
  label,
  value,
  valueClass = "text-hh-white",
  icon: Icon,
}: {
  label: string;
  value: string;
  valueClass?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-hh-gray">
        {Icon && <Icon className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />}
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

function MarketRulesFooter() {
  return (
    <div className="border-t border-hh-border/60 p-4">
      <p className="mb-2 text-xs font-semibold text-hh-white">Market Rules & Tips</p>
      <ul className="space-y-1.5">
        {MARKET_RULES.map((rule) => {
          const Icon = RULE_ICONS[rule.icon];
          return (
            <li key={rule.text} className="flex items-start gap-2 text-[10px] text-hh-gray">
              <Icon
                className={`mt-0.5 h-3 w-3 shrink-0 ${rule.icon === "skull-red" ? "text-hh-red" : rule.icon === "crown" ? "text-hh-gold" : ""}`}
                strokeWidth={2}
              />
              <span>{rule.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
