import type { ComponentType, ReactNode } from "react";
import {
  Coins,
  Eye,
  List,
  ShoppingCart,
  Star,
  Tag,
  User,
  X,
} from "lucide-react";
import {
  MarketListing,
  RARITY_STYLES,
  formatCoins,
  rarityLabel,
} from "@/lib/market-data";
import { LISTING_ICON_MAP, ItemImage } from "./icons";

type SelectedItemPanelProps = {
  listing: MarketListing;
  onClose: () => void;
};

export function SelectedItemPanel({ listing, onClose }: SelectedItemPanelProps) {
  const rarity = RARITY_STYLES[listing.rarity];
  const iconSrc = LISTING_ICON_MAP[listing.iconKey];

  return (
    <div className="overflow-hidden rounded-xl border border-hh-border/80 bg-hh-card shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
      <div className="relative border-b border-hh-border/50 px-3 py-2">
        <div className="mx-auto h-0.5 w-8 rounded-full bg-zinc-600" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-1.5 flex h-6 w-6 items-center justify-center rounded-md text-hh-gray hover:bg-hh-panel hover:text-hh-white"
          aria-label="Close details"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-3">
        <div className="mb-2.5 flex items-start justify-between gap-2 pr-6">
          <h2 className={`text-[13px] font-bold leading-snug ${rarity.text}`}>
            {listing.name}
          </h2>
          <span
            className={`shrink-0 rounded px-1.5 py-px text-[8px] font-bold tracking-widest ${rarity.text} ${rarity.bg} border ${rarity.border}`}
          >
            {rarity.label}
          </span>
        </div>

        <div className="flex gap-2.5">
          <div className="relative shrink-0">
            <div
              className={`absolute -inset-1 rounded-lg blur-md ${
                listing.rarity === "RARE"
                  ? "bg-hh-blue/30"
                  : listing.rarity === "LEGENDARY"
                    ? "bg-hh-gold/25"
                    : "bg-white/5"
              }`}
            />
            <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-lg border border-hh-border/50 bg-black/40">
              <ItemImage src={iconSrc} alt={listing.name} size="lg" />
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-1 text-[10px]">
            <DetailRow
              label="Price:"
              value={`${formatCoins(listing.price)} Coins`}
              valueClass="text-hh-gold font-semibold"
              icon={Coins}
            />
            <DetailRow
              label="Seller:"
              value={listing.seller}
              valueClass="text-hh-blue font-medium"
              icon={User}
            />
            <DetailRow
              label="Rarity:"
              value={rarityLabel(listing.rarity)}
              valueClass={rarity.text}
              icon={Tag}
            />
            <DetailRow
              label="Category:"
              value={listing.category}
              valueClass="text-hh-white"
            />
          </div>

          <div className="w-[88px] shrink-0 rounded-lg border border-hh-border/60 bg-hh-panel/80 p-2">
            <p className="mb-1.5 text-[8px] font-semibold text-hh-white">
              Market Stats
            </p>
            <StatMini label="Suggested Range">
              {formatCoins(listing.suggestedRange[0])} -{" "}
              {formatCoins(listing.suggestedRange[1])}
            </StatMini>
            <StatMini label="Quick-Sell Value" accent>
              {formatCoins(listing.quickSellValue)}
            </StatMini>
            <div className="mt-1 flex items-center justify-between text-[8px] text-hh-gray">
              <span className="flex items-center gap-0.5">
                <List className="h-2.5 w-2.5" />
                {listing.listingsCount}
              </span>
              <span className="flex items-center gap-0.5">
                <Eye className="h-2.5 w-2.5" />
                {listing.watchers}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-2.5 text-[9px] leading-relaxed text-hh-gray">
          {listing.description}
        </p>

        <div className="mt-2.5 space-y-1.5">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-hh-green py-2.5 text-[11px] font-bold text-white disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2.25} />
            Buy Now – {formatCoins(listing.price)} Coins
          </button>
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-hh-border bg-hh-panel py-2 text-[10px] font-medium text-hh-gray disabled:cursor-not-allowed"
          >
            <Star className="h-3 w-3" strokeWidth={2} />
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
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
    <div className="flex items-center justify-between gap-1">
      <span className="flex items-center gap-1 text-hh-gray">
        {Icon && <Icon className="h-2.5 w-2.5 opacity-60" strokeWidth={2} />}
        {label}
      </span>
      <span className={`truncate ${valueClass}`}>{value}</span>
    </div>
  );
}

function StatMini({
  label,
  children,
  accent,
}: {
  label: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="mb-1">
      <p className="text-[7px] text-hh-gray">{label}</p>
      <p
        className={`text-[8px] font-medium leading-tight ${accent ? "text-hh-gold" : "text-hh-white"}`}
      >
        {children}
      </p>
    </div>
  );
}
