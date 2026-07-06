import { requireAuth } from "@/lib/auth-routing";
import { getUserById } from "@/lib/user-data";
import { ProfileData } from "@/lib/profile-data";
import { AppPageRoot } from "@/lib/immersive-page";
import { ProfileApp } from "@/components/profile/mobile/ProfileApp";
import { DesktopProfileContent } from "@/components/profile/desktop/DesktopProfileContent";

export const metadata = {
  title: "Profile",
  description: "Your HeadHunt Survival account and stats.",
};

function toProfileData(
  user: NonNullable<Awaited<ReturnType<typeof getUserById>>>,
): ProfileData {
  return {
    discordUsername: user.discordUsername,
    discordAvatar: user.discordAvatar,
    discordId: user.discordId,
    minecraftName: user.minecraftAccount?.minecraftName ?? null,
    minecraftXuid: user.minecraftAccount?.minecraftXuid ?? null,
    minecraftLinked: !!user.minecraftAccount,
    memberSince: user.createdAt.toLocaleDateString(),
    stats: user.playerStats
      ? {
          lives: user.playerStats.lives,
          maxHearts: user.playerStats.maxHearts,
          coins: user.playerStats.coins,
          status: user.playerStats.status,
          ghostBuybacksUsed: user.playerStats.ghostBuybacksUsed,
          team: user.playerStats.team?.name ?? null,
        }
      : null,
  };
}

export default async function ProfilePage() {
  const user = await requireAuth();
  const profile = toProfileData(user);

  return (
    <AppPageRoot
      active="profile"
      showNav={profile.minecraftLinked}
      mobile={<ProfileApp profile={profile} />}
      desktop={<DesktopProfileContent profile={profile} />}
    />
  );
}
