import { useState } from "react";
import { ChevronDown, Coins, Hammer, Package } from "lucide-react";
import { calcAfterTax, formatCoins } from "@/lib/market-data";
import { ItemImage, LISTING_ICON_MAP } from "../mobile/icons";
import { MOCK_MARKET_LISTINGS } from "@/lib/market-data";

export function DesktopSellForm() {
  const [price, setPrice] = useState(750);
  const sampleItem = MOCK_MARKET_LISTINGS[0];
  const receive = calcAfterTax(price);

  return (
    <div className="border-t border-hh-border/60 bg-hh-panel/30 px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Package className="h-4 w-4 text-hh-gold" strokeWidth={2} />
        <h3 className="font-market text-sm font-bold text-hh-gold">Sell Item</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="mb-1 block text-[10px] text-hh-gray">Item Type</span>
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-between rounded-lg border border-hh-border bg-hh-panel px-3 py-2 text-xs text-hh-white"
          >
            Extra Hearts
            <ChevronDown className="h-3.5 w-3.5 text-hh-gray" />
          </button>
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] text-hh-gray">Select Item</span>
          <button
            type="button"
            disabled
            className="flex w-full items-center gap-2 rounded-lg border border-hh-border bg-hh-panel px-3 py-2 text-xs text-hh-white"
          >
            {sampleItem && (
              <ItemImage
                src={LISTING_ICON_MAP[sampleItem.iconKey]}
                alt=""
                size="tab"
              />
            )}
            <span className="truncate">
              {sampleItem?.name ?? "No item"}
            </span>
            <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-hh-gray" />
          </button>
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] text-hh-gray">Listing Price</span>
          <div className="flex items-center gap-2 rounded-lg border border-hh-border bg-hh-panel px-3 py-2">
            <Coins className="h-3.5 w-3.5 shrink-0 text-hh-gold" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className="w-full bg-transparent text-xs text-hh-white outline-none"
              disabled
            />
          </div>
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-hh-gray">
          You will receive:{" "}
          <span className="font-semibold text-hh-gold">
            {formatCoins(receive)} Coins
          </span>{" "}
          (after 5% tax)
        </p>
        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 px-5 py-2 text-sm font-bold text-black disabled:cursor-not-allowed"
        >
          <Hammer className="h-4 w-4" strokeWidth={2.25} />
          Create Listing
        </button>
      </div>
    </div>
  );
}
