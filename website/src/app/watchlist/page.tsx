import { AppPageRoot } from "@/lib/immersive-page";
import { requireMinecraftLinked } from "@/lib/auth-routing";
import { ComingSoonApp } from "@/components/app/ComingSoonApp";
import { ComingSoonDesktop } from "@/components/app/ComingSoonDesktop";

export const metadata = {
  title: "Watchlist",
  description: "HeadHunt Survival watchlist — coming soon.",
};

export default async function WatchlistPage() {
  await requireMinecraftLinked();

  return (
    <AppPageRoot
      active="watchlist"
      mobile={
        <ComingSoonApp
          title="Watchlist"
          subtitle="Tracked players & items"
          active="watchlist"
        />
      }
      desktop={
        <ComingSoonDesktop
          title="Watchlist"
          subtitle="Tracked players & items"
        />
      }
    />
  );
}
