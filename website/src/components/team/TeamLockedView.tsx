import Link from "next/link";
import { Lock, Users } from "lucide-react";
import { MinecraftLinkInline } from "@/components/profile/mobile/MinecraftLinkInline";

type TeamLockedViewProps = {
  discordLinked: boolean;
};

export function TeamLockedView({ discordLinked }: TeamLockedViewProps) {
  if (!discordLinked) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-hh-border/60 bg-hh-panel/50 px-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hh-red/30 bg-hh-red/10">
          <Lock className="h-6 w-6 text-hh-red" strokeWidth={2} />
        </div>
        <h2 className="mt-4 font-market text-base font-bold text-hh-white">
          Sign In Required
        </h2>
        <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-hh-gray">
          Teams unlock after you sign in with Discord and link your Minecraft
          account.
        </p>
        <Link
          href="/"
          className="mt-5 rounded-lg bg-hh-red px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-hh-red/90"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center rounded-xl border border-hh-border/60 bg-hh-panel/50 px-4 py-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-hh-gold/30 bg-hh-gold/10">
          <Users className="h-6 w-6 text-hh-gold" strokeWidth={2} />
        </div>
        <h2 className="mt-4 font-market text-base font-bold text-hh-white">
          Link Minecraft First
        </h2>
        <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-hh-gray">
          Team features require a linked Minecraft account. Connect your account
          to create or join a squad.
        </p>
      </div>
      <MinecraftLinkInline />
    </div>
  );
}
