import { Eye, Lock, Scale, Target, Users } from "lucide-react";
import { ProfileSection } from "./ProfileSection";

const LOCKED_FEATURES = [
  { title: "Market Locked", icon: Scale, accent: "text-hh-red" },
  { title: "Team Locked", icon: Users, accent: "text-hh-blue" },
  { title: "Watchlist Locked", icon: Eye, accent: "text-hh-gold" },
  { title: "Bounties Locked", icon: Target, accent: "text-hh-green" },
] as const;

export function LockedFeatureCards() {
  return (
    <ProfileSection
      title="Locked Features"
      icon={<Lock className="h-3.5 w-3.5 text-hh-gray" strokeWidth={2} />}
    >
      <div className="grid grid-cols-2 gap-2">
        {LOCKED_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex items-center gap-2 rounded-lg border border-hh-border/50 bg-hh-bg/40 px-3 py-2.5 opacity-70"
            >
              <Icon className={`h-4 w-4 shrink-0 ${feature.accent}`} strokeWidth={2} />
              <span className="text-[10px] font-medium text-hh-gray">
                {feature.title}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[10px] text-hh-gray">
        Link your Minecraft account to unlock the app.
      </p>
    </ProfileSection>
  );
}
