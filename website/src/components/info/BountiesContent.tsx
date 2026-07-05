import type { ReactNode } from "react";
import { Crosshair, Plus, Skull, Target } from "lucide-react";
import {
  BOUNTY_HOW_IT_WORKS,
  MOCK_ACTIVE_BOUNTIES,
  MOCK_COMPLETED_BOUNTIES,
  BountyEntry,
  formatCoins,
} from "@/lib/bounties-data";

export function BountiesContent() {
  return (
    <>
      <div className="rounded-xl border border-hh-gold/20 bg-hh-gold/5 p-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hh-gold/30 bg-hh-gold/10">
          <Target className="h-5 w-5 text-hh-gold" strokeWidth={2} />
        </div>
        <h2 className="mt-3 font-market text-base font-bold text-hh-white">
          Bounty Board
        </h2>
        <p className="mt-1 text-xs text-hh-gray">
          Put a price on their head.
        </p>
        <button
          type="button"
          disabled
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-hh-gold/40 bg-hh-gold/15 px-4 py-2 text-[11px] font-semibold text-hh-gold disabled:cursor-not-allowed"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Place Bounty — Coming Soon
        </button>
      </div>

      <BountySection
        title="Active Bounties"
        icon={<Crosshair className="h-3.5 w-3.5 text-hh-red" strokeWidth={2} />}
        bounties={MOCK_ACTIVE_BOUNTIES}
        variant="active"
      />

      <BountySection
        title="Recently Claimed"
        icon={<Skull className="h-3.5 w-3.5 text-hh-gray" strokeWidth={2} />}
        bounties={MOCK_COMPLETED_BOUNTIES}
        variant="completed"
      />

      <section>
        <div className="mb-2 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2} />
          <h3 className="text-xs font-semibold text-hh-white">
            How Bounties Work
          </h3>
        </div>
        <div className="rounded-xl border border-hh-border/60 bg-hh-panel/50 p-3">
          <ul className="space-y-2">
            {BOUNTY_HOW_IT_WORKS.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-2 text-[11px] leading-snug text-hh-gray"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-hh-gold" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function BountySection({
  title,
  icon,
  bounties,
  variant,
}: {
  title: string;
  icon: ReactNode;
  bounties: BountyEntry[];
  variant: "active" | "completed";
}) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {icon}
          <h3 className="text-xs font-semibold text-hh-white">{title}</h3>
        </div>
        <span className="text-[10px] text-hh-gray">{bounties.length} listed</span>
      </div>
      <div className="space-y-1.5">
        {bounties.map((bounty) => (
          <BountyRow key={bounty.id} bounty={bounty} variant={variant} />
        ))}
      </div>
    </section>
  );
}

function BountyRow({
  bounty,
  variant,
}: {
  bounty: BountyEntry;
  variant: "active" | "completed";
}) {
  const isActive = variant === "active";

  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
        isActive
          ? "border-hh-red/20 bg-hh-red/5"
          : "border-hh-border/50 bg-hh-panel/40 opacity-70"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hh-border/60 bg-hh-bg/60 font-market text-xs font-bold text-hh-white">
            {bounty.target.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-hh-white">
              {bounty.target}
            </p>
            <p className="truncate text-[10px] text-hh-gray">
              by {bounty.placedBy} · {bounty.time}
            </p>
          </div>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold tabular-nums text-hh-gold">
          {formatCoins(bounty.amount)}
        </p>
        <p className="text-[9px] text-hh-gray">coins</p>
      </div>
    </div>
  );
}
