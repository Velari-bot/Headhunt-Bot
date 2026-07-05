"use client";

import { Bell } from "lucide-react";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";
import { TeamPageData } from "@/lib/team-data";
import { TeamLockedView } from "../TeamLockedView";
import { NoTeamView } from "../NoTeamView";
import { TeamIdentityCard } from "../TeamIdentityCard";
import { MemberCards } from "../MemberCards";
import { TeamStatsGrid } from "../TeamStatsGrid";
import { TeamBankCard } from "../TeamBankCard";
import { TeamHeadsSection } from "../TeamHeadsSection";
import { TeamBountiesSection } from "../TeamBountiesSection";
import { PeaceWarSection } from "../PeaceWarSection";
import { TeamActivityFeed } from "../TeamActivityFeed";
import { LeaderControls } from "../LeaderControls";

type TeamAppProps = {
  data: TeamPageData;
  discordLinked: boolean;
};

export function TeamApp({ data, discordLinked }: TeamAppProps) {
  const locked = !data.minecraftLinked;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-hh-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(239,68,68,0.07),transparent)]"
        aria-hidden
      />

      <AppPageHeader
        title="Team"
        subtitle="Manage your survival squad"
        action={
          !locked ? (
            <button
              type="button"
              disabled
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-hh-border/60 bg-hh-panel/50 text-hh-gray disabled:cursor-not-allowed"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : undefined
        }
      />

      <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 pb-2">
        {locked ? (
          <TeamLockedView discordLinked={discordLinked} />
        ) : data.hasTeam && data.team ? (
          <InTeamContent data={data} />
        ) : (
          <NoTeamView />
        )}
      </div>

      <MobileBottomNav active="team" />
    </div>
  );
}

function InTeamContent({ data }: { data: TeamPageData }) {
  const team = data.team!;

  return (
    <>
      <TeamIdentityCard team={team} isLeader={data.isLeader} />
      <MemberCards members={team.members} />
      <TeamStatsGrid stats={team.stats} seasonRank={team.seasonRank} />
      <TeamBankCard balance={team.bankBalance} isLeader={data.isLeader} />
      <TeamHeadsSection heads={team.heads} />
      <TeamBountiesSection bounties={team.bounties} />
      <PeaceWarSection
        peaceContracts={team.peaceContracts}
        activeWars={team.activeWars}
        outlawRisk={team.outlawRisk}
      />
      <TeamActivityFeed activity={team.activity} />
      {data.isLeader && <LeaderControls />}
    </>
  );
}
