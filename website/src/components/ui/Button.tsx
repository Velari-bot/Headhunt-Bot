import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "gold" | "green" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-hh-red hover:bg-red-500 text-white shadow-lg shadow-red-900/20",
  secondary:
    "bg-hh-card border border-hh-border hover:border-gray-500 text-hh-white",
  gold: "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold",
  green:
    "bg-hh-green hover:bg-green-400 text-white shadow-lg shadow-green-900/20",
  ghost: "bg-transparent hover:bg-white/5 text-hh-gray hover:text-hh-white",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`;

  if (href) {
    // API routes that redirect (OAuth, etc.) need a full page load, not Next.js client navigation
    if (href.startsWith("/api/")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
