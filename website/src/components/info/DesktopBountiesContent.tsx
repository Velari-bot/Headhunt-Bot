import { DesktopContent } from "@/components/app/ResponsiveAppPage";
import { BountiesContent } from "./BountiesContent";

export function DesktopBountiesContent() {
  return (
    <DesktopContent title="Bounty" subtitle="Active hunts" maxWidth="lg">
      <BountiesContent />
    </DesktopContent>
  );
}
