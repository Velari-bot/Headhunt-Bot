import { formatServerAddress } from "@/lib/server-address";

export function Footer() {
  const discordInvite = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL;
  const serverAddress = formatServerAddress(
    process.env.NEXT_PUBLIC_SERVER_IP,
    process.env.NEXT_PUBLIC_SERVER_PORT ?? "19132",
  );

  return (
    <footer className="mt-auto border-t border-hh-border bg-hh-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-bold text-hh-white">HeadHunt Survival</p>
          <p className="text-sm text-hh-gray">Minecraft Bedrock SMP</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-hh-gray sm:items-end">
          {serverAddress !== "Not configured" && (
            <p>
              Server: <span className="text-hh-gold">{serverAddress}</span>
            </p>
          )}
          {discordInvite && (
            <a
              href={discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-hh-blue hover:underline"
            >
              Join Discord
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
