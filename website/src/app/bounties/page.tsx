import { AppPageRoot } from "@/lib/immersive-page";
import { BountiesApp } from "@/components/info/BountiesApp";
import { DesktopBountiesContent } from "@/components/info/DesktopBountiesContent";

export const metadata = {
  title: "Bounty",
  description: "Active bounties and the HeadHunt Survival bounty board.",
};

export default function BountiesPage() {
  return (
    <AppPageRoot
      active="bounties"
      mobile={<BountiesApp />}
      desktop={<DesktopBountiesContent />}
    />
  );
}
