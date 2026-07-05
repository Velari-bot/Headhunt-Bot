import Image from "next/image";
import { ReactNode } from "react";
import { MARKET_ASSETS } from "@/components/market/mobile/icons";

type AppPageHeaderProps = {
  title: string;
  subtitle: string;
  action?: ReactNode;
};

export function AppPageHeader({ title, subtitle, action }: AppPageHeaderProps) {
  return (
    <header className="shrink-0 border-b border-hh-border/60 bg-hh-bg px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex items-center">
          <Image
            src={MARKET_ASSETS.logo}
            alt="HeadHunt Survival"
            width={120}
            height={48}
            className="h-10 w-auto object-contain object-left"
            priority
            unoptimized
          />
        </div>

        <div className="text-center">
          <h1 className="font-market text-[15px] font-bold tracking-wide text-hh-white">
            {title}
          </h1>
          <p className="mt-0.5 text-[9px] tracking-wide text-hh-gray">{subtitle}</p>
        </div>

        <div className="flex justify-end">{action}</div>
      </div>
    </header>
  );
}
