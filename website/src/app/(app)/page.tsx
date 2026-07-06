import { redirect } from "next/navigation";
import { Orbitron } from "next/font/google";
import { auth } from "@/auth";
import { LandingPage } from "@/components/landing/LandingPage";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-market",
  weight: ["500", "600", "700", "800"],
});

export default async function HomePage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/profile");
  }

  return (
    <div className={`${orbitron.variable} h-[100dvh] font-market`}>
      <LandingPage />
    </div>
  );
}
