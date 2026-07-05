import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "discord" || !account.providerAccountId) {
        return false;
      }

      const discordId = account.providerAccountId;
      const discordProfile = profile as {
        username?: string;
        global_name?: string;
        avatar?: string | null;
      };
      const discordUsername =
        discordProfile.global_name ??
        discordProfile.username ??
        "Unknown";
      const discordAvatar = discordProfile.avatar
        ? `https://cdn.discordapp.com/avatars/${discordId}/${discordProfile.avatar}.png`
        : null;

      await prisma.user.upsert({
        where: { discordId },
        create: { discordId, discordUsername, discordAvatar },
        update: { discordUsername, discordAvatar },
      });

      return true;
    },
    async jwt({ token, account }) {
      if (account?.providerAccountId) {
        token.discordId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      const discordId = token.discordId as string | undefined;
      if (discordId) {
        const user = await prisma.user.findUnique({
          where: { discordId },
        });
        if (user) {
          session.user.id = user.id;
          session.user.discordId = user.discordId;
          session.user.name = user.discordUsername;
          session.user.image = user.discordAvatar;
        }
      }
      return session;
    },
  },
});
