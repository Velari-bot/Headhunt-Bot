"use client";

import { ReactNode } from "react";
import { AppNavId } from "@/lib/app-nav";
import { DesktopSidebarNav } from "./DesktopSidebarNav";
import { DesktopPageHeader } from "./DesktopPageHeader";

type ResponsiveAppPageProps = {
  active: AppNavId;
  mobile: ReactNode;
  desktop: ReactNode;
  desktopFullWidth?: boolean;
};

export function ResponsiveAppPage({
  active,
  mobile,
  desktop,
  desktopFullWidth = false,
}: ResponsiveAppPageProps) {
  return (
    <>
      <div className="flex h-full justify-center bg-[#030508] lg:hidden">
        <div className="flex h-full w-full max-w-[430px] flex-col border-x border-hh-border/30 bg-hh-bg">
          {mobile}
        </div>
      </div>

      <div className="hidden h-full lg:flex">
        <DesktopSidebarNav active={active} />
        <main
          className={`relative flex min-w-0 flex-1 flex-col overflow-hidden bg-hh-bg ${
            desktopFullWidth ? "" : ""
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.04),transparent_60%)]"
            aria-hidden
          />
          <div className="relative flex h-full min-h-0 flex-1 flex-col">
            {desktop}
          </div>
        </main>
      </div>
    </>
  );
}

type DesktopContentProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
  maxWidth?: "md" | "lg" | "xl" | "full";
};

export function DesktopContent({
  title,
  subtitle,
  action,
  children,
  maxWidth = "lg",
}: DesktopContentProps) {
  const maxClass =
    maxWidth === "full"
      ? "max-w-none"
      : maxWidth === "xl"
        ? "max-w-6xl"
        : maxWidth === "lg"
          ? "max-w-5xl"
          : "max-w-3xl";

  return (
    <div className="flex h-full flex-col">
      <DesktopPageHeader title={title} subtitle={subtitle} action={action} />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className={`mx-auto w-full ${maxClass} space-y-5`}>{children}</div>
      </div>
    </div>
  );
}
