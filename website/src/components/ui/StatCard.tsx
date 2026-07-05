import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  icon?: string;
  accent?: "red" | "gold" | "green" | "blue" | "default";
};

const accentColors = {
  red: "border-hh-red/30 text-hh-red",
  gold: "border-hh-gold/30 text-hh-gold",
  green: "border-hh-green/30 text-hh-green",
  blue: "border-hh-blue/30 text-hh-blue",
  default: "border-hh-border text-hh-gray",
};

export function StatCard({ label, value, icon, accent = "default" }: StatCardProps) {
  return (
    <div className={`rounded-xl border bg-hh-card p-5 ${accentColors[accent].split(" ")[0]}`}>
      <div className="mb-2 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-xs font-medium uppercase tracking-wider text-hh-gray">
          {label}
        </span>
      </div>
      <div className={`text-2xl font-bold ${accentColors[accent].split(" ")[1]}`}>
        {value}
      </div>
    </div>
  );
}
