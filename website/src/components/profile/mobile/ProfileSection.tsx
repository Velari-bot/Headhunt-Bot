import { ReactNode } from "react";

type ProfileSectionProps = {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
};

export function ProfileSection({
  title,
  icon,
  action,
  children,
}: ProfileSectionProps) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {icon}
          <h3 className="text-xs font-semibold text-hh-white">{title}</h3>
        </div>
        {action}
      </div>
      <div className="rounded-xl border border-hh-border/60 bg-hh-panel/50 p-3">
        {children}
      </div>
    </section>
  );
}
