import { ProfileData } from "@/lib/profile-data";
import { DesktopContent } from "@/components/app/ResponsiveAppPage";
import { ProfileHero } from "../mobile/ProfileHero";
import { QuickStats, GhostBuybackStat } from "../mobile/QuickStats";
import { ConnectedAccounts } from "../mobile/ConnectedAccounts";
import { RecentActivity } from "../mobile/RecentActivity";

export function DesktopProfileContent({ profile }: { profile: ProfileData }) {
  return (
    <DesktopContent
      title="Profile"
      subtitle="Account & Survival Stats"
      maxWidth="xl"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <ProfileHero profile={profile} />
          <QuickStats profile={profile} />
          <GhostBuybackStat profile={profile} />
        </div>
        <div className="space-y-4">
          <ConnectedAccounts profile={profile} />
          <RecentActivity profile={profile} />
        </div>
      </div>
    </DesktopContent>
  );
}
