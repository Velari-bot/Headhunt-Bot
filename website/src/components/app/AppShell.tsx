"use client";

import { ReactNode } from "react";
import { AppNavId } from "@/lib/app-nav";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";

type AppShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  action?: ReactNode;
  navActive?: AppNavId;
};

export function AppShell({
  title,
  subtitle,
  children,
  action,
  navActive = "home",
}: AppShellProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-hh-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(239,68,68,0.07),transparent)]"
        aria-hidden
      />

      <AppPageHeader title={title} subtitle={subtitle} action={action} />

      <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 pb-2">
        {children}
      </div>

      <MobileBottomNav active={navActive} />
    </div>
  );
}
