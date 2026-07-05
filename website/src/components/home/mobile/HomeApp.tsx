"use client";

import { AppPageHeader } from "@/components/app/AppPageHeader";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";
import { ServerStatusBanner } from "../ServerStatusBanner";
import { OnlinePlayersList } from "../OnlinePlayersList";
import { Leaderboard } from "../Leaderboard";
import { QuickLinks } from "../QuickLinks";

export function HomeApp() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-hh-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(239,68,68,0.07),transparent)]"
        aria-hidden
      />

      <AppPageHeader title="Home" subtitle="Server Hub" />

      <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-3 py-4 pb-2">
        <ServerStatusBanner />
        <QuickLinks />
        <OnlinePlayersList />
        <Leaderboard />
      </div>

      <MobileBottomNav active="home" />
    </div>
  );
}
