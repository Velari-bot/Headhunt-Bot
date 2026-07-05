"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ALL_NAV, AppNavId, INFO_NAV, MAIN_NAV } from "@/lib/app-nav";
import { MARKET_ASSETS } from "@/components/market/mobile/icons";

type DesktopSidebarNavProps = {
  active: AppNavId;
};

export function DesktopSidebarNav({ active }: DesktopSidebarNavProps) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-hh-border/60 bg-hh-panel/30">
      <div className="border-b border-hh-border/60 px-4 py-5">
        <Link href="/" className="block">
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

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <NavGroup label="Play">
          {MAIN_NAV.map((item) => (
            <SidebarLink key={item.id} item={item} active={active === item.id} />
          ))}
        </NavGroup>

        <NavGroup label="Server" className="mt-4">
          {INFO_NAV.map((item) => (
            <SidebarLink key={item.id} item={item} active={active === item.id} />
          ))}
        </NavGroup>
      </nav>

      <div className="border-t border-hh-border/60 p-3">
        <button
          type="button"
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-hh-red px-3 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(239,68,68,0.35)] disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Sell Item
        </button>
        <p className="mt-2 text-center text-[9px] text-hh-gray">Coming soon</p>
      </div>
    </aside>
  );
}

function NavGroup({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-wider text-hh-gray/70">
        {label}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function SidebarLink({
  item,
  active,
}: {
  item: (typeof ALL_NAV)[number];
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
