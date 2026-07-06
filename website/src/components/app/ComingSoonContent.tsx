import { Clock } from "lucide-react";

export function ComingSoonContent() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hh-border/60 bg-hh-panel/60">
        <Clock className="h-7 w-7 text-hh-gray" strokeWidth={1.75} />
      </div>
      <h2 className="mt-5 font-market text-xl font-bold text-hh-white">
        Coming Soon
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-hh-gray">
        This feature will sync with the Minecraft server in a later update.
      </p>
    </div>
  );
}
