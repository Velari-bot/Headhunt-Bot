import { Coins, Heart, Skull } from "lucide-react";
import {
  TeamMemberData,
  MEMBER_STATUS_STYLES,
  formatCoins,
} from "@/lib/team-data";
import { TeamSection } from "./TeamSection";
import { TeamLeaderBadge } from "./TeamIdentityCard";

type MemberCardsProps = {
  members: TeamMemberData[];
};

export function MemberCards({ members }: MemberCardsProps) {
  return (
    <TeamSection
      title="Members"
      icon={<Skull className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />}
    >
      <div className="space-y-2">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </TeamSection>
  );
}

function MemberCard({ member }: { member: TeamMemberData }) {
  const style = MEMBER_STATUS_STYLES[member.status];

  return (
    <div className="rounded-lg border border-hh-border/50 bg-hh-bg/40 px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hh-border/60 bg-hh-panel font-market text-xs font-bold text-hh-white">
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-hh-white">{member.name}</p>
              {member.role === "Leader" && <TeamLeaderBadge />}
            </div>
            <p className="text-[10px] text-hh-gray">{member.role}</p>
          </div>
        </div>
        <span
          className={`rounded-md border px-2 py-0.5 text-[9px] font-medium ${style.border} ${style.bg} ${style.text}`}
        >
          {member.status}
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2 border-t border-hh-border/30 pt-2.5">
        <MiniStat icon={Skull} label="Lives" value={String(member.lives)} />
        <MiniStat
          icon={Heart}
          label="Hearts"
          value={`${member.hearts}/${member.maxHearts}`}
        />
        <MiniStat
          icon={Coins}
          label="Coins"
          value={formatCoins(member.coins)}
          accent="text-hh-gold"
        />
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Skull;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-0.5 text-[8px] text-hh-gray">
        <Icon className="h-2.5 w-2.5" strokeWidth={2} />
        {label}
      </div>
      <p className={`text-[11px] font-semibold tabular-nums ${accent ?? "text-hh-white"}`}>
        {value}
      </p>
    </div>
  );
}
