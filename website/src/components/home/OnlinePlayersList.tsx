import { Circle } from "lucide-react";
import {
  MOCK_ONLINE_PLAYERS,
  STATUS_STYLES,
  OnlinePlayer,
} from "@/lib/home-data";

export function OnlinePlayersList() {
  return (
    <section>
      <SectionHeader title="Players Online" count={MOCK_ONLINE_PLAYERS.length} />
      <div className="space-y-1.5">
        {MOCK_ONLINE_PLAYERS.map((player) => (
          <OnlinePlayerRow key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}

function OnlinePlayerRow({ player }: { player: OnlinePlayer }) {
  const style = STATUS_STYLES[player.status];

  return (
    <div className="flex items-center gap-3 rounded-lg border border-hh-border/60 bg-hh-panel/50 px-3 py-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hh-border/60 bg-hh-bg/60 font-market text-xs font-bold text-hh-white">
        {player.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-hh-white">{player.name}</p>
        <p className="truncate text-[10px] text-hh-gray">
          {player.team ? `Team ${player.team}` : "No team"}
        </p>
      </div>
      <span
        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-medium ${style.bg} ${style.text}`}
      >
        <Circle className={`h-1.5 w-1.5 fill-current`} strokeWidth={0} />
        {player.status}
      </span>
    </div>
  );
}

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-xs font-semibold text-hh-white">{title}</h3>
      {count !== undefined && (
        <span className="text-[10px] text-hh-gray">{count} shown</span>
      )}
    </div>
  );
}
