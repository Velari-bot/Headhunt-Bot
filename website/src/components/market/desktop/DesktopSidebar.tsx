import Image from "next/image";
import {
  ChevronRight,
  LayoutGrid,
  Package,
  RefreshCw,
  Signal,
} from "lucide-react";
import { SIDEBAR_NAV, SidebarFilter } from "@/lib/market-data";
import { MARKET_ASSETS } from "../mobile/icons";

type DesktopSidebarProps = {
  selected: SidebarFilter;
  onSelect: (filter: SidebarFilter) => void;
};

export function DesktopSidebar({ selected, onSelect }: DesktopSidebarProps) {
  return (
    <aside className="flex w-[200px] shrink-0 flex-col border-r border-hh-border/60 bg-hh-panel/40">
      <nav className="flex-1 space-y-0.5 p-3">
        {SIDEBAR_NAV.map((item) => {
          const isActive = selected === item.id;
          const iconSrc = item.iconKey
            ? MARKET_ASSETS.categories[item.iconKey]
            : null;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                isActive
                  ? "bg-hh-red/15 text-hh-white shadow-[inset_0_0_0_1px_rgba(239,68,68,0.25)]"
                  : "text-hh-gray hover:bg-hh-panel hover:text-hh-white"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {item.lucide === "grid" ? (
                  <LayoutGrid
                    className={`h-4 w-4 ${isActive ? "text-hh-red" : ""}`}
                    strokeWidth={2}
                  />
                ) : item.lucide === "chest" ? (
                  <Package
                    className={`h-4 w-4 ${isActive ? "text-hh-red" : ""}`}
                    strokeWidth={2}
                  />
                ) : iconSrc ? (
                  <Image
                    src={iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                    unoptimized
                  />
                ) : null}
              </span>
              <span className="flex-1 text-[13px] font-medium">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-4 w-4 shrink-0 text-hh-red" strokeWidth={2.5} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-hh-border/60 p-3">
        <div className="rounded-lg border border-hh-border/60 bg-hh-panel/80 px-3 py-2.5">
          <div className="flex items-center gap-2 text-hh-red">
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span className="text-xs font-semibold">Market Refresh</span>
          </div>
          <p className="mt-1 font-mono text-lg font-bold text-hh-white">02:34</p>
          <p className="text-[10px] text-hh-gray">New listings every 5 minutes</p>
        </div>

        <div className="rounded-lg border border-hh-border/60 bg-hh-panel/80 px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-hh-white">HeadHunt Survival</p>
              <p className="text-[10px] text-hh-gray">74 Players Online</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Signal className="h-4 w-4 text-hh-green" strokeWidth={2.5} />
              <div className="h-5 w-5 rounded-sm border border-hh-green/40 bg-hh-green/20" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
