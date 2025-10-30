-- CreateTable
CREATE TABLE "AffiliateLead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "audience" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateLead_email_key" ON "AffiliateLead"("email");
