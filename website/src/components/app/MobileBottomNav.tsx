import type { ComponentType } from "react";
import Link from "next/link";
import { APP_NAV, AppNavId } from "@/lib/app-nav";

type MobileBottomNavProps = {
  active?: AppNavId;
  visible?: boolean;
};

export function MobileBottomNav({
  active = "market",
  visible = true,
}: MobileBottomNavProps) {
  if (!visible) return null;

  return (
    <nav className="shrink-0 border-t border-hh-border/70 bg-hh-bg/98 backdrop-blur-md">
      <div className="grid grid-cols-5 items-end px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5">
        {APP_NAV.map((item) => (
          <NavItem
            key={item.id}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={active === item.id}
          />
        ))}
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
