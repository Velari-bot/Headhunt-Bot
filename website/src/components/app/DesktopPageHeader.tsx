import { ReactNode } from "react";

type DesktopPageHeaderProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
};

export function DesktopPageHeader({
  title,
  subtitle,
  action,
}: DesktopPageHeaderProps) {
  return (
    <header className="shrink-0 border-b border-hh-border/60 bg-hh-bg/80 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-market text-xl font-bold text-hh-white">{title}</h1>
          <p className="mt-0.5 text-sm text-hh-gray">{subtitle}</p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
