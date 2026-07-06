"use client";

import { AppShell } from "@/components/app/AppShell";
import { BountiesContent } from "./BountiesContent";

export function BountiesApp() {
  return (
    <AppShell title="Bounty" subtitle="Active hunts" navActive="profile">
      <BountiesContent />
    </AppShell>
  );
}
