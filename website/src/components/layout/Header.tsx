import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { Button } from "@/components/ui/Button";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-hh-border bg-hh-bg/95 backdrop-blur-md">
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

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              <Link
                href="/profile"
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
                Profile
              </Link>
              <form action="/api/logout" method="POST">
                <Button type="submit" variant="ghost" className="!px-3 !py-2">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <Button href="/api/login/discord" variant="primary">
              Connect Discord
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
