"use client";

import { useMemo, useState } from "react";
import {
  MOCK_MARKET_LISTINGS,
  MarketCategory,
  MarketListing,
  filterListings,
  getDefaultCategory,
  getDefaultSelectedIdMobile,
} from "@/lib/market-data";
import { MarketHeader } from "./MarketHeader";
import { BalanceCards } from "./BalanceCards";
import { CategoryTabs } from "./CategoryTabs";
import { MarketListingCard } from "./MarketListingCard";
import { SelectedItemPanel } from "./SelectedItemPanel";
import { SellItemCard } from "./SellItemCard";
import { MarketRulesCard } from "./MarketRulesCard";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";

export function MarketApp() {
  const [category, setCategory] = useState<MarketCategory>(getDefaultCategory());
  const [selectedId, setSelectedId] = useState(getDefaultSelectedIdMobile());
  const [showDetails, setShowDetails] = useState(true);

  const filteredListings = useMemo(
    () => filterListings(category),
    [category],
  );

  const selectedListing: MarketListing | undefined = useMemo(() => {
    const inCategory = filteredListings.find((l) => l.id === selectedId);
    if (inCategory) return inCategory;
    return filteredListings[0];
  }, [filteredListings, selectedId]);

  function handleCategoryChange(next: MarketCategory) {
    setCategory(next);
    const firstInCategory = filterListings(next)[0];
    if (firstInCategory) {
      setSelectedId(firstInCategory.id);
      setShowDetails(true);
    } else {
      setSelectedId("");
      setShowDetails(false);
    }
  }

  function handleSelectListing(id: string) {
    setSelectedId(id);
    setShowDetails(true);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-hh-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(239,68,68,0.07),transparent)]"
        aria-hidden
      />

      <MarketHeader />
      <BalanceCards />
      <CategoryTabs selected={category} onSelect={handleCategoryChange} />

      <div className="relative flex-1 overflow-y-auto overscroll-contain px-3 pb-2">
        <div className="space-y-1.5 py-2">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <MarketListingCard
                key={listing.id}
                listing={listing}
                selected={selectedListing?.id === listing.id}
                onSelect={() => handleSelectListing(listing.id)}
              />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-hh-border/70 bg-hh-panel/60 px-4 py-10 text-center">
              <p className="text-[11px] font-medium text-hh-white">
                No {category} listings yet
              </p>
              <p className="mt-1 text-[9px] text-hh-gray">Coming soon</p>
            </div>
          )}
        </div>

        {showDetails && selectedListing && (
          <div className="mb-2">
            <SelectedItemPanel
              listing={selectedListing}
              onClose={() => setShowDetails(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 pb-2">
          <SellItemCard />
          <MarketRulesCard />
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
