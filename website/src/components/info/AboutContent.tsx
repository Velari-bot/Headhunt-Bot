import { Compass, Ghost, Heart, Skull, Users } from "lucide-react";
import { ABOUT_SECTIONS, SERVER_HIGHLIGHTS } from "@/lib/about-data";

const SECTION_ICONS: Record<string, typeof Skull> = {
  server: Compass,
  lives: Skull,
  ghost: Ghost,
  economy: Heart,
};

export function AboutContent() {
  return (
    <>
      <div className="rounded-xl border border-hh-green/20 bg-hh-green/5 p-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hh-green/30 bg-hh-green/10">
          <Compass className="h-5 w-5 text-hh-green" strokeWidth={2} />
        </div>
        <h2 className="mt-3 font-market text-base font-bold text-hh-white">
          HeadHunt Survival
        </h2>
        <p className="mt-1 text-xs text-hh-gray">
          A premium Bedrock survival experience with real stakes.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {SERVER_HIGHLIGHTS.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-hh-border/50 bg-hh-panel/50 px-1.5 py-2 text-center"
          >
            <p className="text-[8px] text-hh-gray">{item.label}</p>
            <p className="text-[10px] font-bold text-hh-white">{item.value}</p>
          </div>
        ))}
      </div>

      {ABOUT_SECTIONS.map((section) => {
        const Icon = SECTION_ICONS[section.id] ?? Users;
        return (
          <section key={section.id}>
            <div className="mb-2 flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-hh-green" strokeWidth={2} />
              <h3 className="text-xs font-semibold text-hh-white">
                {section.title}
              </h3>
            </div>
            <div className="rounded-xl border border-hh-border/60 bg-hh-panel/50 p-3">
              {section.content && (
                <p className="text-[11px] leading-relaxed text-hh-gray">
                  {section.content}
                </p>
              )}
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[11px] leading-snug text-hh-gray"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-hh-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
