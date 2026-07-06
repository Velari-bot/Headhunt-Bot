import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";

export const authConfig = {
  trustHost: true,
  providers: [
    Discord({
      clientId: (process.env.DISCORD_CLIENT_ID ?? process.env.AUTH_DISCORD_ID)!,
      clientSecret: (process.env.DISCORD_CLIENT_SECRET ??
        process.env.AUTH_DISCORD_SECRET)!,
    }),
  ],
  pages: {
    signIn: "/",
  },
} satisfies NextAuthConfig;
