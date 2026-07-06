"use client";

import { useState } from "react";
import { Server } from "lucide-react";
import { formatServerAddress } from "@/lib/server-address";
import { formatTimeRemaining } from "@/lib/link-code";
import { ProfileSection } from "./ProfileSection";

const SERVER_ADDRESS = formatServerAddress(
  process.env.NEXT_PUBLIC_SERVER_IP,
  process.env.NEXT_PUBLIC_SERVER_PORT ?? "19132",
);

export function MinecraftLinkSetup() {
  const [code, setCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/link/create", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to generate code");
        return;
      }

      const expiry = new Date(data.expiresAt);
      setCode(data.code);
      setExpiresAt(expiry);
      setTimeLeft(formatTimeRemaining(expiry));

      const interval = setInterval(() => {
        const remaining = formatTimeRemaining(expiry);
        setTimeLeft(remaining);
        if (remaining === "Expired") clearInterval(interval);
      }, 1000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProfileSection
      title="Link Minecraft Account"
      icon={<Server className="h-3.5 w-3.5 text-hh-gold" strokeWidth={2} />}
    >
      <div className="space-y-4 rounded-xl border border-hh-gold/20 bg-hh-gold/5 p-4">
        <p className="text-[11px] leading-relaxed text-hh-gray">
          Generate a one-time link code, join the server, and type{" "}
          <code className="rounded bg-hh-panel px-1 py-0.5 font-mono text-hh-gold">
            ?link CODE
          </code>{" "}
          in chat.
        </p>

        {!code ? (
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 py-3 text-xs font-bold text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Link Code"}
          </button>
        ) : (
          <>
            <div className="rounded-lg border border-hh-gold/30 bg-hh-gold/10 px-3 py-4 text-center">
              <p className="font-mono text-2xl font-bold tracking-widest text-hh-gold">
                {code}
              </p>
              <p className="mt-1 text-[10px] text-hh-gray">
                Expires in <span className="text-hh-white">{timeLeft}</span>
              </p>
            </div>

            <ol className="list-decimal space-y-2 pl-4 text-[11px] leading-relaxed text-hh-gray">
              <li>Join the HeadHunt Survival server</li>
              <li>
                Type{" "}
                <code className="rounded bg-hh-panel px-1.5 py-0.5 font-mono text-hh-gold">
                  ?link {code}
                </code>{" "}
                in chat
              </li>
              <li>Return here and refresh your profile once linked</li>
            </ol>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 rounded-lg bg-hh-green py-2.5 text-[11px] font-semibold text-white"
              >
                Refresh Profile
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 rounded-lg border border-hh-border bg-hh-panel py-2.5 text-[11px] font-medium text-hh-gray disabled:cursor-not-allowed"
              >
                New Code
              </button>
            </div>
          </>
        )}

        <div className="rounded-lg border border-hh-border/50 bg-hh-bg/40 px-3 py-2.5">
          <p className="text-[10px] font-medium text-hh-white">Server Address</p>
          <p className="mt-1 font-mono text-sm text-hh-gold">{SERVER_ADDRESS}</p>
        </div>

        {error && <p className="text-[10px] text-hh-red">{error}</p>}
        {expiresAt && (
          <p className="text-[9px] text-hh-gray">
            Code expires at {expiresAt.toLocaleTimeString()}
          </p>
        )}
      </div>
    </ProfileSection>
  );
}
