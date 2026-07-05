"use client";

import { AppShell } from "@/components/app/AppShell";
import { RulesContent } from "./RulesContent";

export function RulesApp() {
  return (
    <AppShell title="Rules" subtitle="How to survive" navActive="rules">
      <RulesContent />
    </AppShell>
  );
}
