/*
  Warnings:

  - You are about to drop the column `code` on the `Affiliate` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `Affiliate` table. All the data in the column will be lost.
  - You are about to drop the column `signups` on the `Affiliate` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Affiliate` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Affiliate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refCode]` on the table `Affiliate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refCode` to the `Affiliate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Affiliate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Affiliate" DROP CONSTRAINT "Affiliate_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropIndex
DROP INDEX "public"."Affiliate_code_key";

-- DropIndex
DROP INDEX "public"."Affiliate_userId_idx";

-- AlterTable
ALTER TABLE "Affiliate" DROP COLUMN "code",
DROP COLUMN "revenue",
DROP COLUMN "signups",
DROP COLUMN "userId",
ADD COLUMN     "earnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "refCode" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Subscription";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creative" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagePrompt" TEXT,
    "viralScore" INTEGER NOT NULL DEFAULT 0,
    "ctr" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionRun" (
    "id" TEXT NOT NULL,
    "creativeId" TEXT NOT NULL,
    "cpc" DOUBLE PRECISION,
    "cpa" DOUBLE PRECISION,
    "roi" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PredictionRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuningJob" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "TuningJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "visitorIp" TEXT,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_handle_key" ON "Product"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_userEmail_key" ON "Affiliate"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_refCode_key" ON "Affiliate"("refCode");

-- AddForeignKey
ALTER TABLE "Creative" ADD CONSTRAINT "Creative_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionRun" ADD CONSTRAINT "PredictionRun_creativeId_fkey" FOREIGN KEY ("creativeId") REFERENCES "Creative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
