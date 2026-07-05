import { AppPageRoot } from "@/lib/immersive-page";
import { RulesApp } from "@/components/info/RulesApp";
import { DesktopRulesContent } from "@/components/info/DesktopRulesContent";

export const metadata = {
  title: "Rules",
  description: "HeadHunt Survival server rules and survival basics.",
};

export default function RulesPage() {
  return (
    <AppPageRoot
      active="rules"
      mobile={<RulesApp />}
      desktop={<DesktopRulesContent />}
    />
  );
}
