import Image from "next/image";
import { BadgeCheck, Shield } from "lucide-react";
import { ProfileData } from "@/lib/profile-data";

export function ProfileHero({ profile }: { profile: ProfileData }) {
  const status = profile.stats?.status;
  const isAlive = status === "Alive";
  const linked = profile.minecraftLinked;

  return (
    <div className="rounded-xl border border-hh-border/70 bg-hh-panel/80 p-4">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-full bg-hh-red/20 blur-md" />
          {profile.discordAvatar ? (
            <Image
              src={profile.discordAvatar}
              alt=""
              width={64}
              height={64}
              className="relative h-16 w-16 rounded-full border-2 border-hh-border object-cover"
              unoptimized
            />
          ) : (
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-hh-border bg-hh-card text-xl font-bold text-hh-white">
              {profile.discordUsername.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-market text-lg font-bold text-hh-white">
            {profile.discordUsername}
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-hh-blue/30 bg-hh-blue/10 px-2 py-0.5 text-[10px] font-medium text-hh-blue">
              <BadgeCheck className="h-3 w-3" strokeWidth={2.5} />
              Verified
            </span>
            {linked && status && (
              <span
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                  isAlive
                    ? "border-hh-green/30 bg-hh-green/10 text-hh-green"
                    : "border-hh-blue/30 bg-hh-blue/10 text-hh-blue"
                }`}
              >
                <Shield className="h-3 w-3" strokeWidth={2.5} />
                {status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
