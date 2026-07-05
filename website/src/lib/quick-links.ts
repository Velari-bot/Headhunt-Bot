import { BookOpen, Compass, Target } from "lucide-react";

export const QUICK_LINKS = [
  {
    href: "/rules",
    label: "Rules",
    description: "How to survive",
    icon: BookOpen,
    accent: "border-hh-border/60 bg-hh-panel/60 text-hh-gray",
  },
  {
    href: "/about",
    label: "About",
    description: "Learn more",
    icon: Compass,
    accent: "border-hh-green/30 bg-hh-green/10 text-hh-green",
  },
  {
    href: "/bounties",
    label: "Bounty",
    description: "Active hunts",
    icon: Target,
    accent: "border-hh-gold/30 bg-hh-gold/10 text-hh-gold",
  },
] as const;
