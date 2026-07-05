import { Coins, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  MarketListing,
  RARITY_STYLES,
  SidebarFilter,
  formatCoins,
  getFilterLabel,
} from "@/lib/market-data";
import { ItemImage, LISTING_ICON_MAP } from "../mobile/icons";
import { DesktopSellForm } from "./DesktopSellForm";

type DesktopListingsPanelProps = {
  filter: SidebarFilter;
  listings: MarketListing[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function DesktopListingsPanel({
  filter,
  listings,
  selectedId,
  onSelect,
}: DesktopListingsPanelProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col border-r border-hh-border/60">
      <div className="flex items-center justify-between border-b border-hh-border/40 px-5 py-3">
        <h2 className="font-market text-base font-bold text-hh-white">
          {getFilterLabel(filter)}
        </h2>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-hh-border bg-hh-panel px-3 py-1.5 text-xs text-hh-gray"
          disabled
        >
          Showing {listings.length} listing{listings.length !== 1 ? "s" : ""}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {listings.length > 0 ? (
          <div className="space-y-2">
            {listings.map((listing) => (
              <DesktopListingRow
                key={listing.id}
                listing={listing}
                selected={selectedId === listing.id}
                onSelect={() => onSelect(listing.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-hh-border/70 bg-hh-panel/40">
            <div className="text-center">
              <p className="text-sm font-medium text-hh-white">
                No {getFilterLabel(filter).toLowerCase()} yet
              </p>
              <p className="mt-1 text-xs text-hh-gray">Coming soon</p>
            </div>
          </div>
        )}
      </div>

      {listings.length > 0 && (
        <div className="flex items-center justify-center gap-4 border-t border-hh-border/40 py-3">
          <button type="button" disabled className="text-hh-gray">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-hh-gray">
            <span className="font-semibold text-hh-red">1</span> / 1
          </span>
          <button type="button" disabled className="text-hh-gray">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <DesktopSellForm />
    </div>
  );
}

function DesktopListingRow({
  listing,
  selected,
  onSelect,
}: {
  listing: MarketListing;
  selected: boolean;
  onSelect: () => void;
}) {
  const rarity = RARITY_STYLES[listing.rarity];
  const iconSrc = LISTING_ICON_MAP[listing.iconKey];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all ${
        selected
          ? "border-hh-red/70 bg-hh-dark-red/20 shadow-[0_0_20px_rgba(239,68,68,0.12)]"
          : "border-hh-border/60 bg-hh-panel/60 hover:border-zinc-600"
      }`}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-black/20 bg-black/30">
        <ItemImage src={iconSrc} alt={listing.name} size="md" />
      </div>

      <div className="min-w-0 flex-1">
        <span className={`text-[10px] font-bold tracking-widest ${rarity.text}`}>
          {rarity.label}
        </span>
        <p className="mt-0.5 text-sm font-semibold text-hh-white">{listing.name}</p>
        <p className="text-xs text-hh-gray">Seller: {listing.seller}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-hh-gold" strokeWidth={2.5} />
          <span className="text-base font-bold tabular-nums text-hh-gold">
            {formatCoins(listing.price)}
          </span>
        </div>
        <span
          className="rounded-lg bg-hh-green px-4 py-1.5 text-sm font-semibold text-white"
          onClick={(e) => e.stopPropagation()}
        >
          Buy
        </span>
      </div>
    </button>
  );
}
