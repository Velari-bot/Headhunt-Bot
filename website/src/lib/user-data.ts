import { prisma } from "@/lib/prisma";

export async function getUserWithRelations(discordId: string) {
  return prisma.user.findUnique({
    where: { discordId },
    include: {
      minecraftAccount: true,
      playerStats: {
        include: { team: true },
      },
    },
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      minecraftAccount: true,
      playerStats: {
        include: { team: true },
      },
    },
  });
}

export function serializeUser(user: NonNullable<Awaited<ReturnType<typeof getUserWithRelations>>>) {
  return {
    id: user.id,
    discordId: user.discordId,
    discordUsername: user.discordUsername,
    discordAvatar: user.discordAvatar,
    createdAt: user.createdAt.toISOString(),
    minecraftAccount: user.minecraftAccount
      ? {
          minecraftName: user.minecraftAccount.minecraftName,
          minecraftXuid: user.minecraftAccount.minecraftXuid,
          linkedAt: user.minecraftAccount.linkedAt.toISOString(),
        }
      : null,
    playerStats: user.playerStats
      ? {
          coins: user.playerStats.coins,
          lives: user.playerStats.lives,
          maxHearts: user.playerStats.maxHearts,
          status: user.playerStats.status,
          ghostBuybacksUsed: user.playerStats.ghostBuybacksUsed,
          team: user.playerStats.team?.name ?? null,
        }
      : null,
  };
}
