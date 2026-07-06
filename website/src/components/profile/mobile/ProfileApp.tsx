"use client";

import { AppPageHeader } from "@/components/app/AppPageHeader";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";
import { ProfileData } from "@/lib/profile-data";
import { ProfileHero } from "./ProfileHero";
import { QuickStats, GhostBuybackStat } from "./QuickStats";
import { MinecraftLinkSetup } from "./MinecraftLinkSetup";
import { LockedFeatureCards } from "./LockedFeatureCards";
import { AppUnlockedBanner } from "./AppUnlockedBanner";

type ProfileAppProps = {
  profile: ProfileData;
};

export function ProfileApp({ profile }: ProfileAppProps) {
  const linked = profile.minecraftLinked;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-hh-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(239,68,68,0.07),transparent)]"
        aria-hidden
      />

      <AppPageHeader
        title="Profile"
        subtitle={linked ? "Account & Survival Stats" : "Complete Account Setup"}
      />

      <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 pb-2">
        <ProfileHero profile={profile} />
        {linked ? (
          <>
            <AppUnlockedBanner />
            <QuickStats profile={profile} />
            <GhostBuybackStat profile={profile} />
          </>
        ) : (
          <>
            <MinecraftLinkSetup />
            <LockedFeatureCards />
          </>
        )}
      </div>

      <MobileBottomNav active="profile" visible={linked} />
    </div>
  );
}
