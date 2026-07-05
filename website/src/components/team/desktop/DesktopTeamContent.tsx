import { Bell } from "lucide-react";
import { TeamPageData } from "@/lib/team-data";
import { DesktopContent } from "@/components/app/ResponsiveAppPage";
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

type DesktopTeamContentProps = {
  data: TeamPageData;
};

export function DesktopTeamContent({ data }: DesktopTeamContentProps) {
  const locked = !data.minecraftLinked;
  const notifyAction = !locked ? (
    <button
      type="button"
      disabled
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-hh-border/60 bg-hh-panel/50 text-hh-gray disabled:cursor-not-allowed"
      aria-label="Notifications"
    >
      <Bell className="h-4 w-4" strokeWidth={2} />
    </button>
  ) : undefined;

  return (
    <DesktopContent
      title="Team"
      subtitle="Manage your survival squad"
      action={notifyAction}
      maxWidth="xl"
    >
      {locked ? (
        <TeamLockedView discordLinked />
      ) : data.hasTeam && data.team ? (
        <InTeamDesktop data={data} />
      ) : (
        <NoTeamView />
      )}
    </DesktopContent>
  );
}

function InTeamDesktop({ data }: { data: TeamPageData }) {
  const team = data.team!;

  return (
    <div className="space-y-5">
      <TeamIdentityCard team={team} isLeader={data.isLeader} />

      <div className="grid gap-5 lg:grid-cols-2">
        <MemberCards members={team.members} />
        <div className="space-y-5">
          <TeamStatsGrid stats={team.stats} seasonRank={team.seasonRank} />
          <TeamBankCard balance={team.bankBalance} isLeader={data.isLeader} />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <TeamHeadsSection heads={team.heads} />
        <TeamBountiesSection bounties={team.bounties} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <PeaceWarSection
          peaceContracts={team.peaceContracts}
          activeWars={team.activeWars}
          outlawRisk={team.outlawRisk}
        />
        <TeamActivityFeed activity={team.activity} />
      </div>

      {data.isLeader && <LeaderControls />}
    </div>
  );
}
