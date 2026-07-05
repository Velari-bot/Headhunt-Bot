import { AppPageRoot } from "@/lib/immersive-page";
import { AboutApp } from "@/components/info/AboutApp";
import { DesktopAboutContent } from "@/components/info/DesktopAboutContent";

export const metadata = {
  title: "About",
  description: "Learn about HeadHunt Survival — lives, heads, economy, and teams.",
};

export default function AboutPage() {
  return (
    <AppPageRoot
      active="about"
      mobile={<AboutApp />}
      desktop={<DesktopAboutContent />}
    />
  );
}
