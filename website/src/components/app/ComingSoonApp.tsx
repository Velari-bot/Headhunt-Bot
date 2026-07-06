"use client";

import { AppPageHeader } from "@/components/app/AppPageHeader";
import { MobileBottomNav } from "@/components/app/MobileBottomNav";
import { ComingSoonContent } from "@/components/app/ComingSoonContent";
import { AppNavId } from "@/lib/app-nav";

type ComingSoonAppProps = {
  title: string;
  subtitle: string;
  active: AppNavId;
};

export function ComingSoonApp({ title, subtitle, active }: ComingSoonAppProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-hh-bg">
      <AppPageHeader title={title} subtitle={subtitle} />
      <ComingSoonContent />
      <MobileBottomNav active={active} />
    </div>
  );
}
