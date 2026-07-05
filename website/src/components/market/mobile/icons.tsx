import Image from "next/image";

export const MARKET_ASSETS = {
  logo: "/icons/logo.png",
  categories: {
    heads: "/icons/category-heads.png",
    hearts: "/icons/category-hearts.png",
    gear: "/icons/category-gear.png",
    resources: "/icons/category-resources.png",
    teams: "/icons/category-teams.png",
    special: "/icons/category-special.png",
  },
} as const;

export type CategoryIconKey = keyof typeof MARKET_ASSETS.categories;

export type ListingIconKey = "heart" | "sword" | "tracker";

export const LISTING_ICON_MAP: Record<ListingIconKey, string> = {
  heart: MARKET_ASSETS.categories.hearts,
  sword: MARKET_ASSETS.categories.gear,
  tracker: MARKET_ASSETS.categories.special,
};

type ItemImageProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "tab";
  className?: string;
};

const sizeMap = {
  tab: 28,
  sm: 40,
  md: 52,
  lg: 72,
};

export function ItemImage({ src, alt, size = "md", className = "" }: ItemImageProps) {
  const px = sizeMap[size];

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      style={{ width: px, height: px }}
    >
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        unoptimized
      />
    </div>
  );
}
