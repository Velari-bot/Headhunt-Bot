"use client";

import { AppShell } from "@/components/app/AppShell";
import { AboutContent } from "./AboutContent";

export function AboutApp() {
  return (
    <AppShell title="About" subtitle="Learn the server" navActive="profile">
      <AboutContent />
    </AppShell>
  );
}
