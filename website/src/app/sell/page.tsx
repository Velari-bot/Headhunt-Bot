import { AppPageRoot } from "@/lib/immersive-page";
import { requireMinecraftLinked } from "@/lib/auth-routing";
import { ComingSoonApp } from "@/components/app/ComingSoonApp";
import { ComingSoonDesktop } from "@/components/app/ComingSoonDesktop";

export const metadata = {
  title: "Sell",
  description: "HeadHunt Survival sell listings — coming soon.",
};

export default async function SellPage() {
  await requireMinecraftLinked();

  return (
    <AppPageRoot
      active="sell"
      mobile={
        <ComingSoonApp title="Sell" subtitle="List items for sale" active="sell" />
      }
      desktop={
        <ComingSoonDesktop title="Sell" subtitle="List items for sale" />
      }
    />
  );
}
