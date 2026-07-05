import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
};

export function Card({ children, className = "", glow }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-hh-border bg-hh-card p-6 ${
        glow ? "shadow-inner shadow-red-900/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
