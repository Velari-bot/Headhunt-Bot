import type { ReactNode } from "react";
import { BookOpen, Shield } from "lucide-react";
import { SERVER_RULES, SURVIVAL_RULES } from "@/lib/rules-data";

function InfoCard({
  title,
  icon,
  children,
  accent,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-1.5">
        {icon}
        <h3 className="text-xs font-semibold text-hh-white">{title}</h3>
      </div>
      <div
        className={`rounded-xl border bg-hh-panel/50 p-3 ${accent ?? "border-hh-border/60"}`}
      >
        {children}
      </div>
    </section>
  );
}

export function RulesContent() {
  return (
    <>
      <div className="rounded-xl border border-hh-border/60 bg-hh-panel/50 p-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hh-border/60 bg-hh-bg/40">
          <BookOpen className="h-5 w-5 text-hh-gray" strokeWidth={2} />
        </div>
        <h2 className="mt-3 font-market text-base font-bold text-hh-white">
          Server Rules
        </h2>
        <p className="mt-1 text-xs text-hh-gray">
          Play fair. Survive smart. Respect the hunt.
        </p>
      </div>

      <InfoCard
        title="Core Rules"
        icon={<Shield className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />}
        accent="border-hh-red/20"
      >
        <div className="space-y-3">
          {SERVER_RULES.map((rule, i) => (
            <div key={rule.title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-hh-red/30 bg-hh-red/10 text-xs font-bold text-hh-red">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-hh-white">{rule.title}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-hh-gray">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard
        title="Survival Basics"
        icon={<BookOpen className="h-3.5 w-3.5 text-hh-gray" strokeWidth={2} />}
      >
        <ul className="space-y-2">
          {SURVIVAL_RULES.map((rule) => (
            <li
              key={rule}
              className="flex items-start gap-2 text-[11px] leading-snug text-hh-gray"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-hh-red" />
              {rule}
            </li>
          ))}
        </ul>
      </InfoCard>
    </>
  );
}
