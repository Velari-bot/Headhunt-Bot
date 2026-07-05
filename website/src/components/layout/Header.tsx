import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rules", label: "Rules" },
  { href: "/market", label: "Market" },
  { href: "/teams", label: "Teams" },
  { href: "/bounties", label: "Bounties" },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-hh-border bg-hh-bg/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/icons/logo.png"
            alt="HeadHunt Survival"
            width={140}
            height={56}
            className="h-11 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-hh-gray transition-colors hover:bg-white/5 hover:text-hh-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-hh-gray hover:text-hh-white sm:flex"
              >
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                Dashboard
              </Link>
              <form action="/api/logout" method="POST">
                <Button type="submit" variant="ghost" className="!px-3 !py-2">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <Button href="/login" variant="primary">
              Login with Discord
            </Button>
          )}
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-hh-border px-4 py-2 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-hh-gray hover:text-hh-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
