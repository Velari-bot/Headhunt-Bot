import { CheckCircle2, Unlock } from "lucide-react";

export function AppUnlockedBanner() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hh-green/30 bg-hh-green/10 px-4 py-3">
      <Unlock className="h-5 w-5 shrink-0 text-hh-green" strokeWidth={2} />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-hh-white">App Unlocked</p>
        <p className="text-[10px] text-hh-gray">
          Market, Team, Sell, and Watchlist are now available.
        </p>
      </div>
      <CheckCircle2 className="h-5 w-5 shrink-0 text-hh-green" strokeWidth={2} />
    </div>
  );
}
