import { Shield } from "lucide-react";
import { TeamSection } from "./TeamSection";

type PeaceWarSectionProps = {
  peaceContracts: number;
  activeWars: number;
  outlawRisk: string;
};

export function PeaceWarSection({
  peaceContracts,
  activeWars,
  outlawRisk,
}: PeaceWarSectionProps) {
  return (
    <TeamSection
      title="Peace & War"
      icon={<Shield className="h-3.5 w-3.5 text-hh-blue" strokeWidth={2} />}
    >
      <div className="grid grid-cols-3 gap-2">
        <MiniStat label="Peace Contracts" value={String(peaceContracts)} />
        <MiniStat label="Active Wars" value={String(activeWars)} />
        <MiniStat label="Outlaw Risk" value={outlawRisk} accent="text-hh-green" />
      </div>
      <p className="mt-3 rounded-lg border border-hh-border/40 bg-hh-bg/30 px-3 py-2 text-center text-[10px] text-hh-gray">
        Peace and war systems coming soon.
      </p>
    </TeamSection>
  );
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-hh-border/40 bg-hh-bg/30 px-2 py-2 text-center">
      <p className="text-[8px] text-hh-gray">{label}</p>
      <p className={`text-xs font-semibold ${accent ?? "text-hh-white"}`}>
        {value}
      </p>
    </div>
  );
}
