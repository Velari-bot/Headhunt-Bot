import { Crown, Heart, Info, Skull } from "lucide-react";

const RULES = [
  { icon: Skull, text: "Heads can be bought and sold." },
  { icon: Heart, text: "Extra Hearts increase max health, not lives." },
  {
    icon: Skull,
    iconClass: "text-hh-red",
    text: "Selling your own Common or Rare head costs 1 life.",
  },
  {
    icon: Crown,
    iconClass: "text-hh-gold",
    text: "Legendary own head cannot be sold.",
  },
];

export function MarketRulesCard() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-hh-blue/20 bg-hh-blue/[0.04] p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5 text-hh-blue" strokeWidth={2.25} />
        <h3 className="text-[10px] font-bold text-hh-white">
          Market Rules & Tips
        </h3>
      </div>
      <ul className="space-y-1.5">
        {RULES.map((rule) => {
          const Icon = rule.icon;
          return (
            <li
              key={rule.text}
              className="flex items-start gap-1.5 text-[8px] leading-snug text-hh-gray"
            >
              <Icon
                className={`mt-px h-3 w-3 shrink-0 ${rule.iconClass ?? "text-hh-gray"}`}
                strokeWidth={2}
              />
              <span>{rule.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
