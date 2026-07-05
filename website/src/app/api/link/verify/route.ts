import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyServerSecret } from "@/lib/server-auth";

type VerifyBody = {
  linkCode?: string;
  code?: string;
  minecraftName: string;
  minecraftXuid: string;
  serverSecret?: string;
};

export async function POST(request: NextRequest) {
  let body: VerifyBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!verifyServerSecret(request, body.serverSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const code = body.linkCode ?? body.code;
  const { minecraftName, minecraftXuid } = body;

  if (!code || !minecraftName || !minecraftXuid) {
    return NextResponse.json(
      { error: "Missing required fields: code, minecraftName, minecraftXuid" },
      { status: 400 },
    );
  }

  const linkCode = await prisma.linkCode.findUnique({
    where: { code: code.toUpperCase() },
    include: { user: true },
  });

  if (!linkCode) {
    return NextResponse.json({ error: "Invalid link code" }, { status: 404 });
  }

  if (linkCode.usedAt) {
    return NextResponse.json({ error: "Link code already used" }, { status: 400 });
  }

  if (linkCode.expiresAt < new Date()) {
    return NextResponse.json({ error: "Link code expired" }, { status: 400 });
  }

  const existingXuid = await prisma.minecraftAccount.findUnique({
    where: { minecraftXuid },
  });

  if (existingXuid && existingXuid.userId !== linkCode.userId) {
    return NextResponse.json(
      { error: "This Minecraft account is already linked to another Discord account" },
      { status: 400 },
    );
  }

  const existingUserAccount = await prisma.minecraftAccount.findUnique({
    where: { userId: linkCode.userId },
  });

  if (existingUserAccount) {
    return NextResponse.json(
      { error: "Discord account already has a linked Minecraft account" },
      { status: 400 },
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.minecraftAccount.create({
      data: {
        userId: linkCode.userId,
        minecraftName,
        minecraftXuid,
      },
    });

    await tx.playerStats.upsert({
      where: { userId: linkCode.userId },
      create: {
        userId: linkCode.userId,
        minecraftXuid,
        coins: 250,
        lives: 3,
        maxHearts: 10,
        status: "Alive",
        ghostBuybacksUsed: 0,
      },
      update: {
        minecraftXuid,
      },
    });

    await tx.linkCode.update({
      where: { id: linkCode.id },
      data: { usedAt: new Date() },
    });
  });

  return NextResponse.json({
    success: true,
    message: `Linked to Discord account ${linkCode.user.discordUsername}`,
    discordUsername: linkCode.user.discordUsername,
  });
}
