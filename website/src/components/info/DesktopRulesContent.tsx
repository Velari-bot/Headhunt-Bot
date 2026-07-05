import { DesktopContent } from "@/components/app/ResponsiveAppPage";
import { RulesContent } from "@/components/info/RulesContent";

export function DesktopRulesContent() {
  return (
    <DesktopContent title="Rules" subtitle="How to survive" maxWidth="md">
      <RulesContent />
    </DesktopContent>
  );
}
