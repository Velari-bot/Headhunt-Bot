"use client";

import { useState } from "react";
import { formatTimeRemaining } from "@/lib/link-code";

export function MinecraftLinkInline() {
  const [code, setCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [expanded, setExpanded] = useState(false);

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
      setExpanded(true);

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

  if (!expanded) {
    return (
      <div className="rounded-lg border border-dashed border-hh-border/70 bg-hh-bg/40 p-3">
        <p className="text-xs font-medium text-hh-white">Minecraft Bedrock</p>
        <p className="mt-1 text-[10px] leading-relaxed text-hh-gray">
          Link your in-game account to unlock lives, coins, hearts, and team stats.
        </p>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="mt-3 w-full rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 py-2.5 text-[11px] font-bold text-black disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Link Code"}
        </button>
        {error && <p className="mt-2 text-[10px] text-hh-red">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-hh-gold/20 bg-hh-bg/40 p-3">
      <div>
        <p className="text-xs font-medium text-hh-white">Link Minecraft</p>
        <p className="text-[10px] text-hh-gray">Enter this code in-game</p>
      </div>

      <div className="rounded-lg border border-hh-gold/30 bg-hh-gold/10 px-3 py-4 text-center">
        <p className="font-mono text-2xl font-bold tracking-widest text-hh-gold">
          {code}
        </p>
        <p className="mt-1 text-[10px] text-hh-gray">
          Expires in <span className="text-hh-white">{timeLeft}</span>
        </p>
      </div>

      <ol className="list-decimal space-y-1.5 pl-4 text-[10px] leading-relaxed text-hh-gray">
        <li>Join the HeadHunt Survival server</li>
        <li>
          Type{" "}
          <code className="rounded bg-hh-panel px-1.5 py-0.5 font-mono text-hh-gold">
            /link {code}
          </code>{" "}
          in chat
        </li>
        <li>Come back here and tap Refresh once linked</li>
      </ol>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex-1 rounded-lg bg-hh-green py-2 text-[10px] font-semibold text-white"
        >
          Refresh Profile
        </button>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 rounded-lg border border-hh-border bg-hh-panel py-2 text-[10px] font-medium text-hh-gray"
        >
          New Code
        </button>
      </div>

      {error && <p className="text-[10px] text-hh-red">{error}</p>}
      {expiresAt && (
        <p className="text-[9px] text-hh-gray">
          Code expires at {expiresAt.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
