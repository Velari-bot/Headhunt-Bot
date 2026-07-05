import { Coins, Flag, Ghost, Heart, Shield } from "lucide-react";
import { ProfileData } from "@/lib/profile-data";

export function QuickStats({ profile }: { profile: ProfileData }) {
  const stats = profile.stats;
  const linked = profile.minecraftLinked;

  const items = [
    {
      label: "Lives",
      value: linked ? String(stats?.lives ?? "—") : "—",
      icon: Shield,
      color: "text-hh-red",
    },
    {
      label: "Hearts",
      value: linked ? String(stats?.maxHearts ?? "—") : "—",
      icon: Heart,
      color: "text-hh-red",
    },
    {
      label: "Coins",
      value: linked ? (stats?.coins ?? 0).toLocaleString() : "—",
      icon: Coins,
      color: "text-hh-gold",
    },
    {
      label: "Team",
      value: linked ? stats?.team ?? "None" : "—",
      icon: Flag,
      color: "text-hh-red",
    },
  ];

  return (
    <div className="space-y-2">
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
      {!linked && (
        <p className="text-center text-[10px] text-hh-gray">
          Link Minecraft below to unlock survival stats
        </p>
      )}
    </div>
  );
}

export function GhostBuybackStat({ profile }: { profile: ProfileData }) {
  if (!profile.minecraftLinked || !profile.stats) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border border-hh-border/60 bg-hh-panel/40 px-3 py-2">
      <div className="flex items-center gap-2 text-xs text-hh-gray">
        <Ghost className="h-3.5 w-3.5" strokeWidth={2} />
        Ghost Buybacks Used
      </div>
      <span className="text-sm font-semibold text-hh-white">
        {profile.stats.ghostBuybacksUsed}
      </span>
    </div>
  );
}
