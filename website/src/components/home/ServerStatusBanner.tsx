import { Signal, Users } from "lucide-react";
import { SERVER_STATUS } from "@/lib/home-data";

export function ServerStatusBanner() {
  const serverIp = process.env.NEXT_PUBLIC_SERVER_IP;
  const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT ?? "19132";
  const showIp =
    serverIp && serverIp !== "NOT CURRENTLY AVAILABLE" && serverIp !== "your.server.ip.here";

  return (
    <div className="rounded-xl border border-hh-green/20 bg-hh-green/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hh-green opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-hh-green" />
            </span>
            <span className="text-xs font-semibold text-hh-green">Online</span>
          </div>
          <h2 className="mt-1 font-market text-base font-bold text-hh-white">
            {SERVER_STATUS.name}
          </h2>
          {showIp && (
            <p className="mt-0.5 font-mono text-[10px] text-hh-gray">
              {serverIp}:{serverPort}
            </p>
          )}
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-hh-white">
            <Users className="h-4 w-4 text-hh-green" strokeWidth={2.25} />
            <span className="text-2xl font-bold tabular-nums">
              {SERVER_STATUS.playersOnline}
            </span>
          </div>
          <p className="text-[10px] text-hh-gray">players online</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-hh-border/50 bg-hh-panel/50 px-3 py-2">
        <Signal className="h-3.5 w-3.5 text-hh-green" strokeWidth={2.5} />
        <span className="text-[10px] text-hh-gray">
          {SERVER_STATUS.maxPlayers - SERVER_STATUS.playersOnline} slots open · Bedrock SMP
        </span>
      </div>
    </div>
  );
}
