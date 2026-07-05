import { Activity, Link2 } from "lucide-react";
import { ProfileData } from "@/lib/profile-data";
import { ProfileSection } from "./ProfileSection";

export function RecentActivity({ profile }: { profile: ProfileData }) {
  const activities = [
    ...(profile.minecraftLinked
      ? [
          {
            id: "mc",
            label: "Minecraft account linked",
            detail: profile.minecraftName ?? "",
            time: "Connected",
            icon: Link2,
          },
        ]
      : []),
    {
      id: "discord",
      label: "Discord account connected",
      detail: profile.discordUsername,
      time: `Since ${profile.memberSince}`,
      icon: Activity,
    },
  ];

  return (
    <ProfileSection
      title="Recent Activity"
      icon={<Activity className="h-3.5 w-3.5 text-hh-gray" strokeWidth={2} />}
    >
      <ul className="space-y-3">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hh-border/60 bg-hh-bg/60">
                <Icon className="h-3.5 w-3.5 text-hh-gray" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-hh-white">{item.label}</p>
                {item.detail && (
                  <p className="text-[10px] text-hh-gray">{item.detail}</p>
                )}
              </div>
              <span className="shrink-0 text-[9px] text-hh-gray">{item.time}</span>
            </li>
          );
        })}
      </ul>
    </ProfileSection>
  );
}
