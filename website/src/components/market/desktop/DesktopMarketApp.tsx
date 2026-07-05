"use client";

import { useMarketState } from "../shared/useMarketState";
import { DesktopPageHeader } from "@/components/app/DesktopPageHeader";
import { DesktopSidebar } from "./DesktopSidebar";
import { DesktopListingsPanel } from "./DesktopListingsPanel";
import { DesktopItemDetail } from "./DesktopItemDetail";

export function DesktopMarketApp() {
  const {
    filter,
    selectedId,
    filteredListings,
    selectedListing,
    handleFilterChange,
    handleSelectListing,
  } = useMarketState();

  return (
    <div className="flex h-full flex-col">
      <DesktopPageHeader title="Market" subtitle="Browse listings & trade" />

      <div className="flex min-h-0 flex-1">
        <DesktopSidebar selected={filter} onSelect={handleFilterChange} />
        <DesktopListingsPanel
          filter={filter}
          listings={filteredListings}
          selectedId={selectedId}
          onSelect={handleSelectListing}
        />
        <DesktopItemDetail listing={selectedListing} />
      </div>
    </div>
  );
}
