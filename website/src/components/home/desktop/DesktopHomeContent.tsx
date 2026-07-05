import { ServerStatusBanner } from "../ServerStatusBanner";
import { OnlinePlayersList } from "../OnlinePlayersList";
import { Leaderboard } from "../Leaderboard";
import { QuickLinks } from "../QuickLinks";
import { DesktopContent } from "@/components/app/ResponsiveAppPage";

export function DesktopHomeContent() {
  return (
    <DesktopContent title="Home" subtitle="Server Hub" maxWidth="xl">
      <ServerStatusBanner />
      <QuickLinks />
      <div className="grid gap-6 lg:grid-cols-2">
        <OnlinePlayersList />
        <Leaderboard />
      </div>
    </DesktopContent>
  );
}
