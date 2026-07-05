import { Coins, Scale } from "lucide-react";

export function BalanceCards() {
  return (
    <div className="grid shrink-0 grid-cols-2 gap-2 px-3 py-2.5">
      <div className="rounded-lg border border-hh-border/80 bg-hh-panel px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-hh-gold/10">
            <Coins className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-hh-gray">Balance:</p>
            <p className="truncate text-[11px] font-bold text-hh-gold">
              4,850 Coins
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-hh-border/80 bg-hh-panel px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-hh-red/10">
            <Scale className="h-3.5 w-3.5 text-hh-red" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-hh-gray">Market Tax:</p>
            <p className="text-[11px] font-bold text-hh-red">5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
