import { ProfileData } from "@/lib/profile-data";
import { DesktopContent } from "@/components/app/ResponsiveAppPage";
import { ProfileHero } from "../mobile/ProfileHero";
import { QuickStats, GhostBuybackStat } from "../mobile/QuickStats";
import { MinecraftLinkSetup } from "../mobile/MinecraftLinkSetup";
import { LockedFeatureCards } from "../mobile/LockedFeatureCards";
import { AppUnlockedBanner } from "../mobile/AppUnlockedBanner";

export function DesktopProfileContent({ profile }: { profile: ProfileData }) {
  const linked = profile.minecraftLinked;

  return (
    <DesktopContent
      title="Profile"
      subtitle={linked ? "Account & Survival Stats" : "Complete Account Setup"}
      maxWidth="xl"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <ProfileHero profile={profile} />
          {linked ? (
            <>
              <AppUnlockedBanner />
              <QuickStats profile={profile} />
              <GhostBuybackStat profile={profile} />
            </>
          ) : (
            <MinecraftLinkSetup />
          )}
        </div>
        {!linked && (
          <div className="space-y-4">
            <LockedFeatureCards />
          </div>
        )}
      </div>
    </DesktopContent>
  );
}
