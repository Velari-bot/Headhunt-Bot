import { AppPageRoot } from "@/lib/immersive-page";
import { requireMinecraftLinked } from "@/lib/auth-routing";
import { ComingSoonApp } from "@/components/app/ComingSoonApp";
import { ComingSoonDesktop } from "@/components/app/ComingSoonDesktop";

export const metadata = {
  title: "Team",
  description: "HeadHunt Survival teams — coming soon.",
};

export default async function TeamPage() {
  await requireMinecraftLinked();

  return (
    <AppPageRoot
      active="team"
      mobile={
        <ComingSoonApp title="Team" subtitle="Your survival squad" active="team" />
      }
      desktop={<ComingSoonDesktop title="Team" subtitle="Your survival squad" />}
    />
  );
}
