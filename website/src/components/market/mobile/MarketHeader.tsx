import Image from "next/image";
import { Bell } from "lucide-react";
import { MARKET_ASSETS } from "./icons";

export function MarketHeader() {
  return (
    <header className="shrink-0 border-b border-hh-border/60 bg-hh-bg px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex items-center">
          <Image
            src={MARKET_ASSETS.logo}
            alt="HeadHunt Survival"
            width={120}
            height={48}
            className="h-10 w-auto object-contain object-left"
            priority
            unoptimized
          />
        </div>

        <div className="text-center">
          <h1 className="font-market text-[15px] font-bold tracking-wide text-hh-white">
            Market
          </h1>
          <p className="mt-0.5 text-[9px] tracking-wide text-hh-gray">
            Buy, Sell, Trade
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-md border border-hh-border bg-hh-panel text-hh-gray"
            aria-label="Notifications"
            disabled
          >
            <Bell className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-hh-red" />
          </button>
        </div>
      </div>
    </header>
  );
}
