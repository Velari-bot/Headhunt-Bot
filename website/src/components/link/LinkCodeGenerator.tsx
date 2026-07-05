"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatTimeRemaining } from "@/lib/link-code";

type LinkCodeGeneratorProps = {
  isLinked: boolean;
};

export function LinkCodeGenerator({ isLinked }: LinkCodeGeneratorProps) {
  const [code, setCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  if (isLinked) return null;

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
    <Card className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-hh-white">Generate Link Code</h2>
        <p className="mt-1 text-sm text-hh-gray">
          Create a temporary code to link your Minecraft Bedrock account in-game.
        </p>
      </div>

      {!code ? (
        <Button onClick={handleGenerate} disabled={loading} variant="gold">
          {loading ? "Generating..." : "Generate Minecraft Link Code"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-hh-gold/30 bg-hh-gold/10 p-6 text-center">
            <p className="text-sm text-hh-gray">Your Minecraft Link Code</p>
            <p className="mt-2 font-mono text-4xl font-bold tracking-widest text-hh-gold">
              {code}
            </p>
            <p className="mt-2 text-sm text-hh-gray">
              Expires in <span className="text-hh-white">{timeLeft}</span>
            </p>
          </div>

          <ol className="list-decimal space-y-2 pl-5 text-sm text-hh-gray">
            <li>Join the HeadHunt Survival Minecraft Bedrock server</li>
            <li>
              Type{" "}
              <code className="rounded bg-hh-bg px-2 py-0.5 font-mono text-hh-gold">
                /link {code}
              </code>{" "}
              in chat
            </li>
            <li>Wait for in-game confirmation, then refresh this page</li>
          </ol>

          <Button onClick={handleGenerate} variant="secondary" disabled={loading}>
            Generate New Code
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-hh-red">{error}</p>}
      {expiresAt && code && (
        <p className="text-xs text-hh-gray">
          Code expires at {expiresAt.toLocaleTimeString()}
        </p>
      )}
    </Card>
  );
}
