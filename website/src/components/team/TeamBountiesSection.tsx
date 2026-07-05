import { Crosshair, ShieldAlert } from "lucide-react";
import { TeamBounty, formatCoins } from "@/lib/team-data";
import { TeamSection } from "./TeamSection";

type TeamBountiesSectionProps = {
  bounties: TeamBounty[];
};

export function TeamBountiesSection({ bounties }: TeamBountiesSectionProps) {
  const targets = bounties.filter((b) => b.type === "target");
  const onTeam = bounties.filter((b) => b.type === "on-team");

  return (
    <TeamSection
      title="Team Bounties"
      icon={<Crosshair className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />}
    >
      <BountyGroup title="Active Targets" items={targets} variant="target" />
      <BountyGroup
        title="Bounties On Your Team"
        items={onTeam}
        variant="danger"
        className="mt-3"
      />
    </TeamSection>
  );
}

function BountyGroup({
  title,
  items,
  variant,
  className = "",
}: {
  title: string;
  items: TeamBounty[];
  variant: "target" | "danger";
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1.5 text-[10px] font-medium text-hh-gray">{title}</p>
      <div className="space-y-1.5">
        {items.map((bounty) => (
          <div
            key={bounty.id}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
              variant === "target"
                ? "border-hh-border/50 bg-hh-bg/30"
                : "border-hh-red/20 bg-hh-red/5"
            }`}
          >
            <div className="flex items-center gap-2">
              {variant === "danger" && (
                <ShieldAlert className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />
              )}
              <span className="text-xs text-hh-white">{bounty.target}</span>
            </div>
            <span className="text-xs font-bold tabular-nums text-hh-gold">
              {formatCoins(bounty.amount)} Coins
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
