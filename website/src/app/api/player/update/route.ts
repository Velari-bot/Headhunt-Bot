import { NextRequest, NextResponse } from "next/server";
import { PlayerStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyServerSecret } from "@/lib/server-auth";

type UpdateBody = {
  minecraftXuid: string;
  serverSecret?: string;
  coins?: number;
  lives?: number;
  maxHearts?: number;
  status?: PlayerStatus;
  teamName?: string | null;
  ghostBuybacksUsed?: number;
};

export async function POST(request: NextRequest) {
  let body: UpdateBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!verifyServerSecret(request, body.serverSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { minecraftXuid } = body;

  if (!minecraftXuid) {
    return NextResponse.json({ error: "minecraftXuid is required" }, { status: 400 });
  }

  const account = await prisma.minecraftAccount.findUnique({
    where: { minecraftXuid },
    include: { user: { include: { playerStats: true } } },
  });

  if (!account) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  let teamId: string | null | undefined = undefined;

  if (body.teamName === null) {
    teamId = null;
  } else if (body.teamName) {
    const team = await prisma.team.findUnique({ where: { name: body.teamName } });
    teamId = team?.id ?? null;
  }

  const updateData: {
    coins?: number;
    lives?: number;
    maxHearts?: number;
    status?: PlayerStatus;
    teamId?: string | null;
    ghostBuybacksUsed?: number;
  } = {};

  if (body.coins !== undefined) updateData.coins = body.coins;
  if (body.lives !== undefined) updateData.lives = body.lives;
  if (body.maxHearts !== undefined) updateData.maxHearts = body.maxHearts;
  if (body.status !== undefined) updateData.status = body.status;
  if (teamId !== undefined) updateData.teamId = teamId;
  if (body.ghostBuybacksUsed !== undefined) {
    updateData.ghostBuybacksUsed = body.ghostBuybacksUsed;
  }

  const stats = await prisma.playerStats.upsert({
    where: { userId: account.userId },
    create: {
      userId: account.userId,
      minecraftXuid,
      coins: body.coins ?? 250,
      lives: body.lives ?? 3,
      maxHearts: body.maxHearts ?? 10,
      status: body.status ?? "Alive",
      teamId: teamId ?? null,
      ghostBuybacksUsed: body.ghostBuybacksUsed ?? 0,
    },
    update: updateData,
    include: { team: true },
  });

  return NextResponse.json({
    success: true,
    stats: {
      coins: stats.coins,
      lives: stats.lives,
      maxHearts: stats.maxHearts,
      status: stats.status,
      team: stats.team?.name ?? null,
      ghostBuybacksUsed: stats.ghostBuybacksUsed,
    },
  });
}
