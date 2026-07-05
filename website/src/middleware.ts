import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = [
  "/market",
  "/profile",
  "/teams",
  "/dashboard",
  "/link",
  "/rules",
  "/about",
  "/bounties",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/).*)"],
};
