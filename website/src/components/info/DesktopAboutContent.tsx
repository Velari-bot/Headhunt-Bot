import { DesktopContent } from "@/components/app/ResponsiveAppPage";
import { AboutContent } from "./AboutContent";

export function DesktopAboutContent() {
  return (
    <DesktopContent title="About" subtitle="Learn the server" maxWidth="md">
      <AboutContent />
    </DesktopContent>
  );
}
