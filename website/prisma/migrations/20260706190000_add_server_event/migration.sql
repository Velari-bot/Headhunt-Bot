-- CreateTable
CREATE TABLE "ServerEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "minecraftXuid" TEXT,
    "playerName" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServerEvent_type_idx" ON "ServerEvent"("type");

-- CreateIndex
CREATE INDEX "ServerEvent_minecraftXuid_idx" ON "ServerEvent"("minecraftXuid");

-- CreateIndex
CREATE INDEX "ServerEvent_createdAt_idx" ON "ServerEvent"("createdAt");
