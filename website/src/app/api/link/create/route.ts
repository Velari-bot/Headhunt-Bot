import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateLinkCode, getLinkCodeExpiry } from "@/lib/link-code";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingAccount = await prisma.minecraftAccount.findUnique({
    where: { userId: session.user.id },
  });

  if (existingAccount) {
    return NextResponse.json(
      { error: "Minecraft account already linked" },
      { status: 400 },
    );
  }

  await prisma.linkCode.updateMany({
    where: {
      userId: session.user.id,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    data: { usedAt: new Date() },
  });

  let code = generateLinkCode();
  let attempts = 0;

  while (attempts < 5) {
    const existing = await prisma.linkCode.findUnique({ where: { code } });
    if (!existing) break;
    code = generateLinkCode();
    attempts++;
  }

  const expiresAt = getLinkCodeExpiry();

  const linkCode = await prisma.linkCode.create({
    data: {
      userId: session.user.id,
      code,
      expiresAt,
    },
  });

  return NextResponse.json({
    code: linkCode.code,
    expiresAt: linkCode.expiresAt.toISOString(),
  });
}
