import { Coins, History } from "lucide-react";
import { formatCoins } from "@/lib/team-data";
import { TeamSection } from "./TeamSection";

type TeamBankCardProps = {
  balance: number;
  isLeader: boolean;
};

export function TeamBankCard({ balance, isLeader }: TeamBankCardProps) {
  return (
    <TeamSection
      title="Team Bank"
      icon={<Coins className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2} />}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-hh-gray">Balance</p>
          <p className="text-xl font-bold tabular-nums text-hh-gold">
            {formatCoins(balance)} <span className="text-sm">Coins</span>
          </p>
        </div>
        <div className="rounded-lg border border-hh-gold/20 bg-hh-gold/5 px-2 py-1 text-[9px] text-hh-gold">
          Shared
        </div>
      </div>

      <p className="mt-2 text-[10px] leading-relaxed text-hh-gray">
        Shared coins for bounties, upgrades, peace contracts, and team costs.
      </p>

      <div className="mt-3 flex gap-2">
        <BankButton label="Deposit" primary />
        <BankButton label="Withdraw" leaderOnly={!isLeader} />
        <BankButton label="History" icon />
      </div>
    </TeamSection>
  );
}

function BankButton({
  label,
  primary,
  leaderOnly,
  icon,
}: {
  label: string;
  primary?: boolean;
  leaderOnly?: boolean;
  icon?: boolean;
}) {
  return (
    <button
      type="button"
      disabled
      className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[10px] font-semibold disabled:cursor-not-allowed ${
        primary
          ? "border-hh-gold/40 bg-hh-gold/15 text-hh-gold"
          : leaderOnly
            ? "border-hh-border/40 bg-hh-bg/30 text-hh-gray/50"
            : "border-hh-border/60 bg-hh-bg/40 text-hh-gray"
      }`}
    >
      {icon && <History className="h-3 w-3" strokeWidth={2} />}
      {label}
      {leaderOnly && (
        <span className="ml-0.5 text-[8px] text-hh-gray/60">(Leader)</span>
      )}
    </button>
  );
}
