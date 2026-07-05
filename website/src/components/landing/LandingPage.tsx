import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Link2,
  Scale,
  User,
  Users,
} from "lucide-react";
import { MARKET_ASSETS } from "@/components/market/mobile/icons";

const UNLOCK_CARDS = [
  {
    title: "Player Profile",
    description: "View your lives, hearts, coins, team, and survival status.",
    icon: User,
    accent: "border-hh-blue/25 bg-hh-blue/5 text-hh-blue",
  },
  {
    title: "Minecraft Linking",
    description:
      "Generate a code and type /link CODE in-game to connect your Bedrock account.",
    icon: Link2,
    accent: "border-hh-green/25 bg-hh-green/5 text-hh-green",
  },
  {
    title: "Market Access",
    description:
      "Buy and sell heads, extra hearts, gear, resources, and special items.",
    icon: Scale,
    accent: "border-hh-red/25 bg-hh-red/5 text-hh-red",
  },
  {
    title: "Teams",
    description: "Create or join a 3-player team and track group stats.",
    icon: Users,
    accent: "border-hh-gold/25 bg-hh-gold/5 text-hh-gold",
  },
] as const;

const STEPS = [
  "Connect Discord",
  "Link Minecraft",
  "Join Server",
  "Unlock App",
] as const;

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function LandingPage() {
  return (
    <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain bg-hh-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(239,68,68,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <header className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-hh-red/25 bg-hh-red/10 shadow-[0_0_32px_rgba(239,68,68,0.15)]">
            <Image
              src={MARKET_ASSETS.logo}
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
              priority
              unoptimized
            />
          </div>
          <h1 className="mt-4 font-market text-lg font-bold tracking-[0.2em] text-hh-white">
            HEADHUNT SURVIVAL
          </h1>
          <p className="mt-2 text-xs text-hh-gray">
            3 Lives. Rare Heads. Player Market. Real Survival.
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-hh-border/70 bg-hh-panel/60 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-6">
          <h2 className="text-center font-market text-base font-bold leading-snug text-hh-white sm:text-lg">
            Connect Discord to Access HeadHunt Survival
          </h2>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-hh-gray sm:text-xs">
            Your Discord account is your main HeadHunt identity. Connect it to
            unlock your player profile, Minecraft linking, market access, teams,
            bounties, and stats.
          </p>

          <Link
            href="/api/login/discord"
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#5865F2] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(88,101,242,0.4)] transition-all hover:bg-[#4752C4] hover:brightness-105"
          >
            <DiscordIcon className="h-5 w-5" />
            Connect Discord
          </Link>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-hh-gray/80">
            You must connect Discord before linking your Minecraft Bedrock
            account.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
          {UNLOCK_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`rounded-xl border p-3 ${card.accent}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                <p className="mt-2 text-[11px] font-semibold text-hh-white">
                  {card.title}
                </p>
                <p className="mt-1 text-[9px] leading-snug text-hh-gray">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-hh-border/50 bg-hh-panel/30 px-3 py-4">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-hh-gray">
            How It Works
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-hh-red/30 bg-hh-red/10 text-[9px] font-bold text-hh-red">
                  {i + 1}
                </span>
                <span className="text-[10px] text-hh-gray">{step}</span>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden h-3 w-3 text-hh-gray/50 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
