import type { ComponentType } from "react";
import Link from "next/link";
import { Home, Plus, Scale, User, Users } from "lucide-react";
import { AppNavId, toMobileNavActive } from "@/lib/app-nav";

export type NavTab = AppNavId;

type MobileBottomNavProps = {
  active?: AppNavId;
};

export function MobileBottomNav({ active = "market" }: MobileBottomNavProps) {
  const mobileActive = toMobileNavActive(active);
  return (
    <nav className="shrink-0 border-t border-hh-border/70 bg-hh-bg/98 backdrop-blur-md">
      <div className="grid grid-cols-5 items-end px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5">
        <NavItem href="/" label="Home" icon={Home} active={mobileActive === "home"} />
        <NavItem href="/market" label="Market" icon={Scale} active={mobileActive === "market"} />

        <div className="flex justify-center">
          <button
            type="button"
            disabled
            className="-mt-4 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-hh-bg bg-hh-red text-white shadow-[0_4px_16px_rgba(239,68,68,0.45)] disabled:cursor-not-allowed"
            aria-label="Sell"
          >
            <Plus className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        <NavItem href="/teams" label="Team" icon={Users} active={mobileActive === "team"} />
        <NavItem href="/profile" label="Profile" icon={User} active={mobileActive === "profile"} />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-0.5 py-0.5 ${
        active ? "text-hh-red" : "text-hh-gray"
      }`}
    >
      <Icon
        className="h-[18px] w-[18px]"
        strokeWidth={active ? 2.25 : 1.75}
      />
      <span className={`text-[9px] ${active ? "font-semibold" : ""}`}>
        {label}
      </span>
    </Link>
  );
}
