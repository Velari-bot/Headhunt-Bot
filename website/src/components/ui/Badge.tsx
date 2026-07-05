import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "coming-soon" | "rarity";
  className?: string;
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-hh-border/50 text-hh-gray",
    "coming-soon": "bg-hh-red/20 text-hh-red border border-hh-red/30",
    rarity: "bg-transparent border",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ComingSoonBadge() {
  return <Badge variant="coming-soon">Coming Soon</Badge>;
}
