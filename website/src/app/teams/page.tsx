import { requireMinecraftLinked } from "@/lib/auth-routing";
import { buildTeamPageData } from "@/lib/team-data";
import { AppPageRoot } from "@/lib/immersive-page";
import { TeamApp } from "@/components/team/mobile/TeamApp";
import { DesktopTeamContent } from "@/components/team/desktop/DesktopTeamContent";

export const metadata = {
  title: "Team",
  description: "Manage your HeadHunt Survival squad.",
};

export default async function TeamsPage() {
  const user = await requireMinecraftLinked();

  const teamData = buildTeamPageData(
    !!user.minecraftAccount,
    user.minecraftAccount?.minecraftName ?? null,
    user.playerStats?.team?.name ?? null,
  );

  return (
    <AppPageRoot
      active="team"
      mobile={<TeamApp data={teamData} discordLinked />}
      desktop={<DesktopTeamContent data={teamData} />}
    />
  );
}
