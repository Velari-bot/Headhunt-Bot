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

  if (!process.env.MINECRAFT_SERVER_SECRET) {
    return NextResponse.json(
      { error: "Server API is not configured (MINECRAFT_SERVER_SECRET missing)" },
      { status: 503 },
    );
  }

  if (!verifyServerSecret(request, body.serverSecret)) {
    return NextResponse.json(
      { error: "Invalid or missing server secret" },
      { status: 401 },
    );
  }

  const rawCode = body.linkCode ?? body.code;
  const { minecraftName, minecraftXuid } = body;

  if (!rawCode || !minecraftName || !minecraftXuid) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: linkCode (or code), minecraftName, minecraftXuid",
      },
      { status: 400 },
    );
  }

  const code = rawCode.trim().toUpperCase();

  const linkCode = await prisma.linkCode.findUnique({
    where: { code },
    include: { user: true },
  });

  if (!linkCode) {
    return NextResponse.json(
      { error: "Invalid link code. Generate a new code on the website." },
      { status: 404 },
    );
  }

  if (linkCode.usedAt) {
    return NextResponse.json(
      { error: "This link code has already been used. Generate a new code." },
      { status: 400 },
    );
  }

  if (linkCode.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Link code expired. Generate a new code on the website." },
      { status: 400 },
    );
  }

  const existingXuid = await prisma.minecraftAccount.findUnique({
    where: { minecraftXuid },
  });

  if (existingXuid && existingXuid.userId !== linkCode.userId) {
    return NextResponse.json(
      {
        error:
          "This Minecraft account is already linked to another Discord account.",
      },
      { status: 409 },
    );
  }

  const existingUserAccount = await prisma.minecraftAccount.findUnique({
    where: { userId: linkCode.userId },
  });

  if (existingUserAccount) {
    return NextResponse.json(
      { error: "This Discord account already has a linked Minecraft account." },
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

    await tx.serverEvent.create({
      data: {
        type: "ACCOUNT_LINKED",
        minecraftXuid,
        playerName: minecraftName,
        payload: {
          discordUserId: linkCode.user.discordId,
          discordUsername: linkCode.user.discordUsername,
          minecraftName,
        },
      },
    });
  });

  return NextResponse.json({
    success: true,
    message: `Linked to Discord account ${linkCode.user.discordUsername}`,
    discordUsername: linkCode.user.discordUsername,
  });
}
