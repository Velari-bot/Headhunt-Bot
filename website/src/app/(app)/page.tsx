import { redirect } from "next/navigation";
import { Orbitron } from "next/font/google";
import { auth } from "@/auth";
import { getUserById } from "@/lib/user-data";
import { AppPageRoot } from "@/lib/immersive-page";
import { LandingPage } from "@/components/landing/LandingPage";
import { HomeApp } from "@/components/home/mobile/HomeApp";
import { DesktopHomeContent } from "@/components/home/desktop/DesktopHomeContent";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-market",
  weight: ["500", "600", "700", "800"],
});

export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className={`${orbitron.variable} h-[100dvh] font-market`}>
        <LandingPage />
      </div>
    );
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return (
      <div className={`${orbitron.variable} h-[100dvh] font-market`}>
        <LandingPage />
      </div>
    );
  }

  if (!user.minecraftAccount) {
    redirect("/profile");
  }

  return (
    <AppPageRoot
      active="home"
      mobile={<HomeApp />}
      desktop={<DesktopHomeContent />}
    />
  );
}
