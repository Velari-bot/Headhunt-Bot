import { AppPageRoot } from "@/lib/immersive-page";
import { requireMinecraftLinked } from "@/lib/auth-routing";
import { ComingSoonApp } from "@/components/app/ComingSoonApp";
import { ComingSoonDesktop } from "@/components/app/ComingSoonDesktop";

export const metadata = {
  title: "Market",
  description: "HeadHunt Survival player market — coming soon.",
};

export default async function MarketPage() {
  await requireMinecraftLinked();

  return (
    <AppPageRoot
      active="market"
      mobile={
        <ComingSoonApp
          title="Market"
          subtitle="Player marketplace"
          active="market"
        />
      }
      desktop={
        <ComingSoonDesktop title="Market" subtitle="Player marketplace" />
      }
    />
  );
}
