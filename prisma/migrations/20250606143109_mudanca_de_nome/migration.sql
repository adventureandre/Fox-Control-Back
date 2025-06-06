/*
  Warnings:

  - You are about to drop the column `harvest` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "harvest",
ADD COLUMN     "safra" TEXT;
