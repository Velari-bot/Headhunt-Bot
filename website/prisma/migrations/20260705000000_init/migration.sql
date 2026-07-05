-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('Alive', 'Ghost', 'Eliminated');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('Active', 'Sold', 'Cancelled');

-- CreateEnum
CREATE TYPE "BountyStatus" AS ENUM ('Active', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('Owner', 'Member');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "discordAvatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinecraftAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "minecraftName" TEXT NOT NULL,
    "minecraftXuid" TEXT NOT NULL,
    "linkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MinecraftAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "minecraftXuid" TEXT NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 250,
    "lives" INTEGER NOT NULL DEFAULT 3,
    "maxHearts" INTEGER NOT NULL DEFAULT 10,
    "status" "PlayerStatus" NOT NULL DEFAULT 'Alive',
    "teamId" TEXT,
    "ghostBuybacksUsed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL DEFAULT 'Member',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketListing" (
    "id" TEXT NOT NULL,
    "sellerUserId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "rarity" TEXT,
    "price" INTEGER NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bounty" (
    "id" TEXT NOT NULL,
    "creatorUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "BountyStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "MinecraftAccount_userId_key" ON "MinecraftAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MinecraftAccount_minecraftXuid_key" ON "MinecraftAccount"("minecraftXuid");

-- CreateIndex
CREATE UNIQUE INDEX "LinkCode_code_key" ON "LinkCode"("code");

-- CreateIndex
CREATE INDEX "LinkCode_code_idx" ON "LinkCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_userId_key" ON "PlayerStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_minecraftXuid_key" ON "PlayerStats"("minecraftXuid");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_teamId_userId_key" ON "TeamMember"("teamId", "userId");

-- AddForeignKey
ALTER TABLE "MinecraftAccount" ADD CONSTRAINT "MinecraftAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkCode" ADD CONSTRAINT "LinkCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketListing" ADD CONSTRAINT "MarketListing_sellerUserId_fkey" FOREIGN KEY ("sellerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
