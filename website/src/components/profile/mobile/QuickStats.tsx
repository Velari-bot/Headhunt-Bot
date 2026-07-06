import { Coins, Heart, Shield } from "lucide-react";
import { ProfileData } from "@/lib/profile-data";

export function QuickStats({ profile }: { profile: ProfileData }) {
  const stats = profile.stats;
  const linked = profile.minecraftLinked;

  if (!linked) return null;

  const items = [
    {
      label: "Lives",
      value: String(stats?.lives ?? "—"),
      icon: Shield,
      color: "text-hh-red",
    },
    {
      label: "Coins",
      value: (stats?.coins ?? 0).toLocaleString(),
      icon: Coins,
      color: "text-hh-gold",
    },
    {
      label: "Max Hearts",
      value: String(stats?.maxHearts ?? "—"),
      icon: Heart,
      color: "text-hh-red",
    },
    {
      label: "Status",
      value: stats?.status ?? "—",
      icon: Shield,
      color: "text-hh-blue",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="rounded-lg border border-hh-border/60 bg-hh-panel/60 px-2 py-2.5 text-center"
          >
            <Icon className={`mx-auto h-4 w-4 ${item.color}`} strokeWidth={2} />
            <p className={`mt-1 text-sm font-bold tabular-nums ${item.color}`}>
              {item.value}
            </p>
            <p className="mt-0.5 text-[8px] text-hh-gray">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}

export function GhostBuybackStat({ profile }: { profile: ProfileData }) {
  if (!profile.minecraftLinked || !profile.stats) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border border-hh-border/60 bg-hh-panel/40 px-3 py-2">
      <span className="text-xs text-hh-gray">Ghost Buybacks Used</span>
      <span className="text-sm font-semibold text-hh-white">
        {profile.stats.ghostBuybacksUsed}
      </span>
    </div>
  );
}
