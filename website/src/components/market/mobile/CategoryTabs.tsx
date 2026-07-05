import Image from "next/image";
import { MARKET_CATEGORIES, MarketCategory } from "@/lib/market-data";
import { MARKET_ASSETS } from "./icons";

type CategoryTabsProps = {
  selected: MarketCategory;
  onSelect: (category: MarketCategory) => void;
};

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="shrink-0 border-b border-hh-border/40 px-3 pb-3">
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MARKET_CATEGORIES.map((category) => {
          const isSelected = selected === category.id;
          const iconSrc = MARKET_ASSETS.categories[category.iconKey];

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`relative flex w-[62px] shrink-0 flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-all ${
                isSelected
                  ? "border-hh-red bg-hh-red/[0.08] shadow-[0_0_14px_rgba(239,68,68,0.12)]"
                  : "border-hh-border/70 bg-hh-panel/80"
              }`}
            >
              <div
                className={`relative flex h-7 w-7 items-center justify-center ${isSelected ? "brightness-110" : "opacity-80"}`}
              >
                <Image
                  src={iconSrc}
                  alt={category.label}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                  unoptimized
                />
              </div>
              <span
                className={`text-center text-[8px] font-medium leading-tight ${
                  isSelected ? "text-hh-white" : "text-hh-gray"
                }`}
              >
                {category.shortLabel}
              </span>
              {isSelected && (
                <span className="absolute -bottom-[9px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-hh-red" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
