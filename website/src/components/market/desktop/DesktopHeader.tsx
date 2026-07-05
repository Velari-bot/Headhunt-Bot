import Image from "next/image";
import { Coins, Scale } from "lucide-react";
import { MARKET_ASSETS } from "../mobile/icons";

export function DesktopHeader() {
  return (
    <header className="shrink-0 border-b border-hh-border/60 bg-hh-bg px-6 py-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6">
        <Image
          src={MARKET_ASSETS.logo}
          alt="HeadHunt Survival"
          width={160}
          height={64}
          className="h-12 w-auto object-contain"
          priority
          unoptimized
        />

        <div className="text-center">
          <h1 className="font-market text-xl font-bold tracking-wide text-hh-white">
            HeadHunt Survival Market
          </h1>
          <p className="mt-0.5 text-sm text-hh-gray">Buy, Sell, Trade</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-hh-border bg-hh-panel px-4 py-2">
            <Coins className="h-4 w-4 text-hh-gold" strokeWidth={2.25} />
            <div>
              <p className="text-[10px] text-hh-gray">Balance</p>
              <p className="text-sm font-bold text-hh-gold">4,850 Coins</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-hh-border bg-hh-panel px-4 py-2">
            <Scale className="h-4 w-4 text-hh-red" strokeWidth={2.25} />
            <div>
              <p className="text-[10px] text-hh-gray">Market Tax</p>
              <p className="text-sm font-bold text-hh-red">5%</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
