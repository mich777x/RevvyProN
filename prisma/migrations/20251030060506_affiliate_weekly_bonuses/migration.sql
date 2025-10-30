-- AlterTable
ALTER TABLE "Affiliate" ADD COLUMN     "lastWeekRank" INTEGER,
ADD COLUMN     "weeklyPoints" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "WeeklyBonus" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "rank" INTEGER NOT NULL,
    "bonusAmount" DOUBLE PRECISION NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyBonus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeeklyBonus_weekStart_idx" ON "WeeklyBonus"("weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyBonus_affiliateId_weekStart_key" ON "WeeklyBonus"("affiliateId", "weekStart");

-- AddForeignKey
ALTER TABLE "WeeklyBonus" ADD CONSTRAINT "WeeklyBonus_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
