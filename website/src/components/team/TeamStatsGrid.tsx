import { BarChart3 } from "lucide-react";
import { TeamStats, formatCoins } from "@/lib/team-data";
import { TeamSection } from "./TeamSection";

type TeamStatsGridProps = {
  stats: TeamStats;
  seasonRank: string;
};

export function TeamStatsGrid({ stats, seasonRank }: TeamStatsGridProps) {
  const items = [
    { label: "Team Kills", value: String(stats.kills) },
    { label: "Heads Collected", value: String(stats.headsCollected) },
    { label: "Team Coins", value: formatCoins(stats.teamCoins) },
    { label: "Bounties Claimed", value: String(stats.bountiesClaimed) },
    { label: "Eliminations", value: String(stats.eliminations) },
    { label: "Market Sales", value: String(stats.marketSales) },
    { label: "Team Value", value: formatCoins(stats.teamValue) },
    { label: "Rank", value: seasonRank },
  ];

  return (
    <TeamSection
      title="Team Stats"
      icon={<BarChart3 className="h-3.5 w-3.5 text-hh-green" strokeWidth={2} />}
    >
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-hh-border/40 bg-hh-bg/30 px-2.5 py-2"
          >
            <p className="text-[9px] text-hh-gray">{item.label}</p>
            <p className="text-sm font-bold tabular-nums text-hh-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </TeamSection>
  );
}
