import type { ReactNode } from "react";
import Image from "next/image";
import { BadgeCheck, Link2 } from "lucide-react";
import { ProfileData } from "@/lib/profile-data";
import { MARKET_ASSETS } from "@/components/market/mobile/icons";
import { ProfileSection } from "./ProfileSection";
import { MinecraftLinkInline } from "./MinecraftLinkInline";

export function ConnectedAccounts({ profile }: { profile: ProfileData }) {
  return (
    <ProfileSection
      title="Connected Accounts"
      icon={<Link2 className="h-3.5 w-3.5 text-hh-blue" strokeWidth={2} />}
    >
      <div className="space-y-3">
        <AccountRow
          icon={
            profile.discordAvatar ? (
              <Image
                src={profile.discordAvatar}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                unoptimized
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5865F2]/20 text-xs font-bold text-[#5865F2]">
                D
              </div>
            )
          }
          label="Discord"
          value={profile.discordUsername}
          linked
        />

        {profile.minecraftLinked && profile.minecraftName ? (
          <AccountRow
            icon={
              <Image
                src={MARKET_ASSETS.categories.resources}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                unoptimized
              />
            }
            label="Minecraft"
            value={profile.minecraftName}
            linked
          />
        ) : (
          <MinecraftLinkInline />
        )}
      </div>
    </ProfileSection>
  );
}

function AccountRow({
  icon,
  label,
  value,
  linked,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  linked: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-hh-gray">{label}</p>
        <p className="truncate text-sm font-medium text-hh-white">{value}</p>
      </div>
      {linked && (
        <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-hh-green">
          <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
          Linked
        </span>
      )}
    </div>
  );
}
