"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAV, AppNavId } from "@/lib/app-nav";
import { MARKET_ASSETS } from "@/components/market/mobile/icons";

type DesktopSidebarNavProps = {
  active: AppNavId;
  visible?: boolean;
};

export function DesktopSidebarNav({
  active,
  visible = true,
}: DesktopSidebarNavProps) {
  if (!visible) return null;

  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-hh-border/60 bg-hh-panel/30">
      <div className="border-b border-hh-border/60 px-4 py-5">
        <Link href="/profile" className="block">
          <Image
            src={MARKET_ASSETS.logo}
            alt="HeadHunt Survival"
            width={160}
            height={64}
            className="h-12 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>
        <p className="mt-2 text-[10px] tracking-wide text-hh-gray">
          Bedrock Survival SMP
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {APP_NAV.map((item) => (
          <SidebarLink key={item.id} item={item} active={active === item.id} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({
  item,
  active,
}: {
  item: (typeof APP_NAV)[number];
  active: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
        active
          ? "bg-hh-red/15 text-hh-white shadow-[inset_0_0_0_1px_rgba(239,68,68,0.25)]"
          : "text-hh-gray hover:bg-hh-panel/80 hover:text-hh-white"
      }`}
    >
      <Icon
        className={`h-[18px] w-[18px] shrink-0 ${active ? "text-hh-red" : ""}`}
        strokeWidth={active ? 2.25 : 1.75}
      />
      <span className="text-[13px] font-medium">{item.label}</span>
    </Link>
  );
}
