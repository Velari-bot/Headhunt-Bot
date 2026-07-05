import { Crown } from "lucide-react";
import { TeamSection } from "./TeamSection";

const LEADER_ACTIONS = [
  "Invite Player",
  "Kick Member",
  "Rename Team",
  "Transfer Leader",
  "Disband Team",
  "Declare War",
  "Request Peace",
  "Withdraw From Bank",
];

export function LeaderControls() {
  return (
    <TeamSection
      title="Leader Controls"
      icon={<Crown className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2} />}
    >
      <div className="grid grid-cols-2 gap-2">
        {LEADER_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            disabled
            className="rounded-lg border border-hh-border/60 bg-hh-bg/40 px-2 py-2.5 text-[10px] font-medium text-hh-gray disabled:cursor-not-allowed"
          >
            {action}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[9px] text-hh-gray/70">
        Placeholder controls — coming soon
      </p>
    </TeamSection>
  );
}
