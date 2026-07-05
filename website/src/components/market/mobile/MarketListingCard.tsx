import { Coins } from "lucide-react";
import { MarketListing, RARITY_STYLES, formatCoins } from "@/lib/market-data";
import { ItemImage, LISTING_ICON_MAP } from "./icons";

type MarketListingCardProps = {
  listing: MarketListing;
  selected: boolean;
  onSelect: () => void;
};

export function MarketListingCard({
  listing,
  selected,
  onSelect,
}: MarketListingCardProps) {
  const rarity = RARITY_STYLES[listing.rarity];
  const iconSrc = LISTING_ICON_MAP[listing.iconKey];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-all ${
        selected
          ? "border-hh-red/80 bg-hh-dark-red/25 shadow-[0_0_20px_rgba(239,68,68,0.15),inset_0_0_0_1px_rgba(239,68,68,0.1)]"
          : "border-hh-border/70 bg-hh-panel/90 hover:border-zinc-600"
      }`}
    >
      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-md border border-black/20 bg-black/40">
        <ItemImage src={iconSrc} alt={listing.name} size="sm" />
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={`inline-block rounded px-1 py-px text-[8px] font-bold tracking-widest ${rarity.text}`}
        >
          {rarity.label}
        </span>
        <p className="mt-0.5 truncate text-[12px] font-semibold leading-tight text-hh-white">
          {listing.name}
        </p>
        <p className="truncate text-[10px] text-hh-gray">
          Seller: {listing.seller}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-center gap-1.5 pl-1">
        <div className="flex items-center gap-0.5">
          <Coins className="h-3 w-3 text-hh-gold" strokeWidth={2.5} />
          <span className="text-[12px] font-bold tabular-nums text-hh-gold">
            {formatCoins(listing.price)}
          </span>
        </div>
        <span
          className="rounded-md bg-hh-green px-2.5 py-1 text-[10px] font-semibold text-white"
          onClick={(e) => e.stopPropagation()}
        >
          Buy
        </span>
      </div>
    </button>
  );
}
