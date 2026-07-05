import { AppPageRoot } from "@/lib/immersive-page";
import { requireMinecraftLinked } from "@/lib/auth-routing";
import { MarketApp } from "@/components/market/mobile/MarketApp";
import { DesktopMarketApp } from "@/components/market/desktop/DesktopMarketApp";

export const metadata = {
  title: "Market",
  description: "HeadHunt Survival player market — buy, sell, trade.",
};

export default async function MarketPage() {
  await requireMinecraftLinked();

  return (
    <AppPageRoot
      active="market"
      mobile={<MarketApp />}
      desktop={<DesktopMarketApp />}
      desktopFullWidth
    />
  );
}
