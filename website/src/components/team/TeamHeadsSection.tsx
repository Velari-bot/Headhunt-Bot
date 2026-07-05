import { Skull, Trophy } from "lucide-react";
import { TeamHeadsSummary, formatCoins } from "@/lib/team-data";
import { TeamSection } from "./TeamSection";

type TeamHeadsSectionProps = {
  heads: TeamHeadsSummary;
};

export function TeamHeadsSection({ heads }: TeamHeadsSectionProps) {
  return (
    <TeamSection
      title="Team Heads"
      icon={<Skull className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />}
    >
      <div className="grid grid-cols-2 gap-2">
        <HeadCount label="Common" value={heads.common} />
        <HeadCount label="Rare" value={heads.rare} />
        <HeadCount label="Legendary" value={heads.legendary} accent="text-hh-gold" />
        <HeadCount label="Total" value={heads.total} accent="text-hh-white" bold />
      </div>

      <div className="mt-3 rounded-lg border border-hh-gold/20 bg-hh-gold/5 px-3 py-2.5">
        <div className="flex items-center gap-1.5 text-[9px] text-hh-gold">
          <Trophy className="h-3 w-3" strokeWidth={2.5} />
          Most Valuable Head
        </div>
        <p className="mt-1 text-xs font-medium text-hh-white">
          {heads.mostValuable.name}
        </p>
        <p className="text-[10px] text-hh-gray">
          Est. Value: {formatCoins(heads.mostValuable.value)} Coins
        </p>
      </div>

      <div className="mt-2 rounded-lg border border-dashed border-hh-border/50 bg-hh-bg/20 px-3 py-2 text-center text-[9px] text-hh-gray">
        Team Vault — coming soon
      </div>
    </TeamSection>
  );
}

function HeadCount({
  label,
  value,
  accent,
  bold,
}: {
  label: string;
  value: number;
  accent?: string;
  bold?: boolean;
}) {
  return (
    <div className="rounded-lg border border-hh-border/40 bg-hh-bg/30 px-2.5 py-2">
      <p className="text-[9px] text-hh-gray">{label}</p>
      <p
        className={`text-sm tabular-nums ${bold ? "font-bold" : "font-semibold"} ${accent ?? "text-hh-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
