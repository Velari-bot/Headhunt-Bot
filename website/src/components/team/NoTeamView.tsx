import { Coins, Lock, Shield, Swords, Users } from "lucide-react";
import { TEAM_PRICES } from "@/lib/team-data";
import { TeamSection } from "./TeamSection";

export function NoTeamView() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-hh-border/60 bg-hh-panel/50 p-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hh-gold/30 bg-hh-gold/10">
          <Users className="h-5 w-5 text-hh-gold" strokeWidth={2} />
        </div>
        <h2 className="mt-3 font-market text-base font-bold text-hh-white">
          No Team Yet
        </h2>
        <p className="mt-1.5 text-xs text-hh-gray">
          Create a team or join one to survive with backup.
        </p>
        <p className="mt-3 rounded-lg border border-hh-border/40 bg-hh-bg/40 px-3 py-2 text-[10px] leading-relaxed text-hh-gray">
          Teams are limited to <span className="text-hh-white">3 players max</span>.
          You and 2 others. No mega-teaming.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ActionButton
          label="Create Team"
          sublabel={`${TEAM_PRICES.createTeam.toLocaleString()} Coins`}
          primary
        />
        <ActionButton label="Join Team" />
        <ActionButton label="View Invites" />
        <ActionButton label="Browse Teams" />
      </div>

      <TeamSection
        title="Team Bank"
        icon={<Coins className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2} />}
      >
        <LockedPreview text="Deposit coins for bounties, upgrades, and peace contracts." />
      </TeamSection>

      <TeamSection
        title="Team Stats"
        icon={<Shield className="h-3.5 w-3.5 text-hh-green" strokeWidth={2} />}
      >
        <LockedPreview text="Track kills, heads, bounties, and team value together." />
      </TeamSection>

      <TeamSection
        title="Team Bounties"
        icon={<Swords className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />}
      >
        <LockedPreview text="See who your team is hunting and who's hunting you." />
      </TeamSection>
    </div>
  );
}

function ActionButton({
  label,
  sublabel,
  primary,
}: {
  label: string;
  sublabel?: string;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      disabled
      className={`rounded-xl border px-3 py-3 text-center transition-colors disabled:cursor-not-allowed ${
        primary
          ? "border-hh-red/40 bg-hh-red/15 text-hh-white"
          : "border-hh-border/60 bg-hh-bg/40 text-hh-gray"
      }`}
    >
      <span className="block text-[11px] font-semibold">{label}</span>
      {sublabel && (
        <span className="mt-0.5 block text-[9px] text-hh-gold">{sublabel}</span>
      )}
    </button>
  );
}

function LockedPreview({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-hh-border/40 bg-hh-bg/30 px-3 py-4">
      <div className="absolute inset-0 flex items-center justify-center bg-hh-bg/60 backdrop-blur-[1px]">
        <span className="inline-flex items-center gap-1 rounded-md border border-hh-border/60 bg-hh-panel/80 px-2 py-1 text-[9px] text-hh-gray">
          <Lock className="h-3 w-3" />
          Join a team to unlock
        </span>
      </div>
      <p className="text-[10px] text-hh-gray/50">{text}</p>
    </div>
  );
}
