import { Crown, Skull, Users } from "lucide-react";
import { TeamData, formatCoins } from "@/lib/team-data";

type TeamIdentityCardProps = {
  team: TeamData;
  isLeader: boolean;
};

export function TeamIdentityCard({ team, isLeader }: TeamIdentityCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-hh-red/25 bg-gradient-to-br from-hh-red/10 via-hh-panel/80 to-hh-gold/5">
      <div className="border-b border-hh-red/15 bg-hh-red/5 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-hh-gold/40 bg-hh-gold/15">
              <Skull className="h-6 w-6 text-hh-gold" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-market text-lg font-bold text-hh-white">
                {team.name}
              </h2>
              <p className="text-[10px] text-hh-gray">
                Team Leader: {team.leader}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border border-hh-gold/30 bg-hh-gold/10 px-2 py-1 text-[10px] font-semibold text-hh-gold">
            <Users className="h-3 w-3" strokeWidth={2.5} />
            {team.memberCount}/{team.maxMembers}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-hh-border/30 p-px">
        <StatPill label="Status" value={team.status} accent="text-hh-green" />
        <StatPill label="Season Rank" value={team.seasonRank} accent="text-hh-gold" />
        <StatPill
          label="Team Value"
          value={`${formatCoins(team.teamValue)} Coins`}
          accent="text-hh-white"
          className="col-span-2"
        />
      </div>

      <div className="flex gap-2 px-3 py-3">
        {isLeader ? (
          <>
            <TeamAction label="Invite" primary />
            <TeamAction label="Manage" />
            <TeamAction label="Team Bank" />
          </>
        ) : (
          <>
            <TeamAction label="View Members" primary />
            <TeamAction label="Leave Team" />
          </>
        )}
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  accent,
  className = "",
}: {
  label: string;
  value: string;
  accent: string;
  className?: string;
}) {
  return (
    <div className={`bg-hh-panel/60 px-3 py-2 ${className}`}>
      <p className="text-[9px] text-hh-gray">{label}</p>
      <p className={`text-xs font-semibold ${accent}`}>{value}</p>
    </div>
  );
}

function TeamAction({
  label,
  primary,
}: {
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      disabled
      className={`flex-1 rounded-lg border px-2 py-2 text-[10px] font-semibold disabled:cursor-not-allowed ${
        primary
          ? "border-hh-red/40 bg-hh-red/15 text-hh-white"
          : "border-hh-border/60 bg-hh-bg/40 text-hh-gray"
      }`}
    >
      {label}
    </button>
  );
}

export function TeamLeaderBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded border border-hh-gold/30 bg-hh-gold/10 px-1.5 py-0.5 text-[8px] font-medium text-hh-gold">
      <Crown className="h-2.5 w-2.5" strokeWidth={2} />
      Leader
    </span>
  );
}
