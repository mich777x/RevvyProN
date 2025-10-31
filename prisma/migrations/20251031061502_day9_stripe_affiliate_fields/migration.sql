/*
  Warnings:

  - A unique constraint covering the columns `[stripeSessionId]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Affiliate" ADD COLUMN     "stripeAccountId" TEXT;

-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "stripeSessionId" TEXT;

-- AlterTable
ALTER TABLE "WeeklyBonus" ADD COLUMN     "stripePayoutId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Referral_stripeSessionId_key" ON "Referral"("stripeSessionId");
