import Link from "next/link";
import { QUICK_LINKS } from "@/lib/quick-links";

export function QuickLinks() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {QUICK_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-colors hover:brightness-110 ${link.accent}`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
            <span className="mt-1.5 text-[11px] font-semibold">{link.label}</span>
            <span className="mt-0.5 text-[8px] opacity-70">{link.description}</span>
          </Link>
        );
      })}
    </div>
  );
}
