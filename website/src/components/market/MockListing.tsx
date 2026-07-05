import { RARITY_COLORS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type MockListingProps = {
  itemName: string;
  itemType: string;
  rarity: string;
  seller: string;
  price: number;
  selected?: boolean;
};

export function MockListing({
  itemName,
  rarity,
  seller,
  price,
  selected,
}: MockListingProps) {
  const rarityClass = RARITY_COLORS[rarity] ?? RARITY_COLORS.Common;

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border bg-hh-card p-4 transition-all sm:flex-row sm:items-center sm:justify-between ${
        selected
          ? "border-hh-red shadow-lg shadow-red-900/20"
          : "border-hh-border hover:border-gray-600"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-hh-bg text-2xl">
          {rarity === "Legendary" ? "👑" : rarity.includes("Heart") ? "💖" : "💀"}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={rarityClass}>{rarity}</Badge>
            <span className="font-semibold text-hh-white">{itemName}</span>
          </div>
          <p className="mt-1 text-sm text-hh-gray">Seller: {seller}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:shrink-0">
        <span className="font-bold text-hh-gold">{price.toLocaleString()} Coins</span>
        <Button variant="green" className="pointer-events-none opacity-60">
          Buy
        </Button>
      </div>
    </div>
  );
}
