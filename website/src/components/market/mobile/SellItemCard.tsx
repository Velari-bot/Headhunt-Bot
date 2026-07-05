import { Package, Plus } from "lucide-react";

export function SellItemCard() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-hh-border/70 bg-hh-panel p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Package className="h-4 w-4 text-hh-gold" strokeWidth={2} />
        <h3 className="font-market text-[11px] font-bold tracking-wide text-hh-gold">
          Sell Item
        </h3>
      </div>
      <p className="mb-3 flex-1 text-[9px] leading-relaxed text-hh-gray">
        List your item on the market.
      </p>
      <button
        type="button"
        disabled
        className="flex w-full items-center justify-center gap-1 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 py-2.5 text-[10px] font-bold text-black disabled:cursor-not-allowed"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={3} />
        Create Listing
      </button>
    </div>
  );
}
