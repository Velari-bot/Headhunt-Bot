import type { ReactNode } from "react";
import { Orbitron } from "next/font/google";
import { ResponsiveAppPage } from "@/components/app/ResponsiveAppPage";
import type { AppNavId } from "@/lib/app-nav";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-market",
  weight: ["500", "600", "700", "800"],
});

type AppPageRootProps = {
  active: AppNavId;
  mobile: ReactNode;
  desktop: ReactNode;
  desktopFullWidth?: boolean;
  showNav?: boolean;
};

export function AppPageRoot({
  active,
  mobile,
  desktop,
  desktopFullWidth,
  showNav = true,
}: AppPageRootProps) {
  return (
    <div className={`${orbitron.variable} h-[100dvh] font-market`}>
      <ResponsiveAppPage
        active={active}
        mobile={mobile}
        desktop={desktop}
        desktopFullWidth={desktopFullWidth}
        showNav={showNav}
      />
    </div>
  );
}

/** @deprecated Use AppPageRoot with mobile + desktop children */
export function immersivePage(children: ReactNode) {
  return (
    <div className={`${orbitron.variable} h-[100dvh] font-market`}>
      <div className="flex h-full justify-center bg-[#030508] lg:hidden">
        <div className="flex h-full w-full max-w-[430px] flex-col border-x border-hh-border/30 bg-hh-bg">
          {children}
        </div>
      </div>
      <div className="hidden h-full lg:flex">
        {children}
      </div>
    </div>
  );
}

export { orbitron };
