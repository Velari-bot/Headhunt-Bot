import type { ComponentType } from "react";
import { Eye, Scale, Tag, User, Users } from "lucide-react";

export type AppNavId =
  | "market"
  | "team"
  | "sell"
  | "watchlist"
  | "profile";

export type NavItemConfig = {
  id: AppNavId;
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

export const APP_NAV: NavItemConfig[] = [
  { id: "market", href: "/market", label: "Market", icon: Scale },
  { id: "team", href: "/team", label: "Team", icon: Users },
  { id: "sell", href: "/sell", label: "Sell", icon: Tag },
  { id: "watchlist", href: "/watchlist", label: "Watchlist", icon: Eye },
  { id: "profile", href: "/profile", label: "Profile", icon: User },
];
