-- CreateTable
CREATE TABLE "PayoutTier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PayoutTier_pkey" PRIMARY KEY ("id")
);
