import { DesktopContent } from "@/components/app/ResponsiveAppPage";
import { ComingSoonContent } from "@/components/app/ComingSoonContent";

type ComingSoonDesktopProps = {
  title: string;
  subtitle: string;
};

export function ComingSoonDesktop({ title, subtitle }: ComingSoonDesktopProps) {
  return (
    <DesktopContent title={title} subtitle={subtitle} maxWidth="md">
      <ComingSoonContent />
    </DesktopContent>
  );
}
