import type { ComponentType } from "react";
import {
  BookOpen,
  Compass,
  Home,
  Scale,
  Target,
  User,
  Users,
} from "lucide-react";

export type AppNavId =
  | "home"
  | "market"
  | "team"
  | "profile"
  | "rules"
  | "about"
  | "bounties";

export type NavItemConfig = {
  id: AppNavId;
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  section: "main" | "info";
};

export const MAIN_NAV: NavItemConfig[] = [
  { id: "home", href: "/", label: "Home", icon: Home, section: "main" },
  { id: "market", href: "/market", label: "Market", icon: Scale, section: "main" },
  { id: "team", href: "/teams", label: "Team", icon: Users, section: "main" },
  { id: "profile", href: "/profile", label: "Profile", icon: User, section: "main" },
];

export const INFO_NAV: NavItemConfig[] = [
  { id: "rules", href: "/rules", label: "Rules", icon: BookOpen, section: "info" },
  { id: "about", href: "/about", label: "About", icon: Compass, section: "info" },
  { id: "bounties", href: "/bounties", label: "Bounty", icon: Target, section: "info" },
];

export const ALL_NAV = [...MAIN_NAV, ...INFO_NAV];

/** Bottom nav only highlights main tabs; info pages map to home. */
export function toMobileNavActive(active: AppNavId): AppNavId {
  if (active === "rules" || active === "about" || active === "bounties") {
    return "home";
  }
  return active;
}
