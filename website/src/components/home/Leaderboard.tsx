import { Coins, Crown, Skull, Trophy } from "lucide-react";
import {
  MOCK_LEADERBOARD,
  STATUS_STYLES,
  LeaderboardEntry,
  formatCoins,
} from "@/lib/home-data";

type LeaderboardProps = {
  compact?: boolean;
};

export function Leaderboard({ compact }: LeaderboardProps) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2.25} />
          <h3 className="text-xs font-semibold text-hh-white">Coin Leaderboard</h3>
        </div>
        <span className="text-[10px] text-hh-gray">Season 1</span>
      </div>

      <div className="rounded-xl border border-hh-border/60 bg-hh-panel/50 overflow-hidden">
        {MOCK_LEADERBOARD.map((entry, i) => (
          <LeaderboardRow
            key={entry.name}
            entry={entry}
            isLast={i === MOCK_LEADERBOARD.length - 1}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
}

function LeaderboardRow({
  entry,
  isLast,
  compact,
}: {
  entry: LeaderboardEntry;
  isLast: boolean;
  compact?: boolean;
}) {
  const style = STATUS_STYLES[entry.status];
  const isTop = entry.rank <= 3;

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 ${
        !isLast ? "border-b border-hh-border/40" : ""
      } ${entry.rank === 1 ? "bg-hh-gold/5" : ""}`}
    >
      <RankBadge rank={entry.rank} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium text-hh-white">{entry.name}</p>
          {isTop && (
            <Crown
              className={`h-3 w-3 shrink-0 ${
                entry.rank === 1
                  ? "text-hh-gold"
                  : entry.rank === 2
                    ? "text-zinc-300"
                    : "text-amber-700"
              }`}
              strokeWidth={2}
            />
          )}
        </div>
        {!compact && (
          <div className="mt-0.5 flex items-center gap-3 text-[10px] text-hh-gray">
            <span className="flex items-center gap-0.5">
              <Skull className="h-2.5 w-2.5" />
              {entry.heads} heads
            </span>
            <span>{entry.lives} lives</span>
            <span className={style.text}>{entry.status}</span>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Coins className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2.5} />
        <span className="text-sm font-bold tabular-nums text-hh-gold">
          {formatCoins(entry.coins)}
        </span>
      </div>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const colors =
    rank === 1
      ? "border-hh-gold/40 bg-hh-gold/15 text-hh-gold"
      : rank === 2
        ? "border-zinc-500/40 bg-zinc-500/10 text-zinc-300"
        : rank === 3
          ? "border-amber-800/40 bg-amber-900/20 text-amber-600"
          : "border-hh-border bg-hh-bg/60 text-hh-gray";

  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${colors}`}
    >
      {rank}
    </span>
  );
}
