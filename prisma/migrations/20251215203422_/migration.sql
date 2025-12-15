/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeSessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSessionId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingAddress",
DROP COLUMN "userId",
ADD COLUMN     "collectionId" INTEGER NOT NULL,
ADD COLUMN     "collectionName" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'eur',
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "shippedAt" TIMESTAMP(3),
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingCost" INTEGER,
ADD COLUMN     "shippingCountry" TEXT,
ADD COLUMN     "shippingLine1" TEXT,
ADD COLUMN     "shippingLine2" TEXT,
ADD COLUMN     "shippingName" TEXT,
ADD COLUMN     "shippingPostal" TEXT,
ADD COLUMN     "shippingRate" TEXT,
ADD COLUMN     "shippingState" TEXT,
ADD COLUMN     "stripeSessionId" TEXT NOT NULL,
ALTER COLUMN "stripePaymentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");
