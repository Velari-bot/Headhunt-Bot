import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyServerSecret } from "@/lib/server-auth";

type RouteContext = {
  params: Promise<{ xuid: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  if (!process.env.MINECRAFT_SERVER_SECRET) {
    return NextResponse.json(
      { error: "Server API is not configured (MINECRAFT_SERVER_SECRET missing)" },
      { status: 503 },
    );
  }

  const serverSecret = request.headers.get("x-server-secret");
  if (!verifyServerSecret(request, serverSecret ?? undefined)) {
    return NextResponse.json(
      { error: "Invalid or missing server secret" },
      { status: 401 },
    );
  }

  const { xuid } = await context.params;

  const account = await prisma.minecraftAccount.findUnique({
    where: { minecraftXuid: xuid },
    include: {
      user: {
        include: {
          playerStats: {
            include: { team: true },
          },
        },
      },
    },
  });

  if (!account) {
    return NextResponse.json(
      { error: "Player not found. Link the account first." },
      { status: 404 },
    );
  }

  const stats = account.user.playerStats;

  return NextResponse.json({
    minecraftName: account.minecraftName,
    minecraftXuid: account.minecraftXuid,
    discordId: account.user.discordId,
    discordUsername: account.user.discordUsername,
    stats: stats
      ? {
          coins: stats.coins,
          lives: stats.lives,
          maxHearts: stats.maxHearts,
          status: stats.status,
          team: stats.team?.name ?? null,
          ghostBuybacksUsed: stats.ghostBuybacksUsed,
        }
      : null,
  });
}
