"use client";

import { useMemo, useState } from "react";
import {
  SidebarFilter,
  MarketListing,
  filterListings,
  getDefaultFilter,
  getDefaultSelectedId,
} from "@/lib/market-data";

export function useMarketState(initialFilter?: SidebarFilter) {
  const [filter, setFilter] = useState<SidebarFilter>(
    initialFilter ?? getDefaultFilter(),
  );
  const [selectedId, setSelectedId] = useState(
    getDefaultSelectedId(initialFilter ?? getDefaultFilter()),
  );

  const filteredListings = useMemo(
    () => filterListings(filter),
    [filter],
  );

  const selectedListing: MarketListing | undefined = useMemo(() => {
    const inFilter = filteredListings.find((l) => l.id === selectedId);
    if (inFilter) return inFilter;
    return filteredListings[0];
  }, [filteredListings, selectedId]);

  function handleFilterChange(next: SidebarFilter) {
    setFilter(next);
    const first = filterListings(next)[0];
    setSelectedId(first?.id ?? "");
  }

  function handleSelectListing(id: string) {
    setSelectedId(id);
  }

  return {
    filter,
    selectedId,
    filteredListings,
    selectedListing,
    handleFilterChange,
    handleSelectListing,
  };
}
