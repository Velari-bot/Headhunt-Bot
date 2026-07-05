import { Activity } from "lucide-react";
import { TeamActivity } from "@/lib/team-data";
import { TeamSection } from "./TeamSection";

type TeamActivityFeedProps = {
  activity: TeamActivity[];
};

export function TeamActivityFeed({ activity }: TeamActivityFeedProps) {
  return (
    <TeamSection
      title="Team Activity"
      icon={<Activity className="h-3.5 w-3.5 text-hh-gray" strokeWidth={2} />}
    >
      <div className="space-y-0">
        {activity.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-start justify-between gap-2 py-2 ${
              i < activity.length - 1 ? "border-b border-hh-border/30" : ""
            }`}
          >
            <p className="text-[11px] leading-snug text-hh-white">
              {item.message}
            </p>
            <span className="shrink-0 text-[9px] text-hh-gray">{item.time}</span>
          </div>
        ))}
      </div>
    </TeamSection>
  );
}
