/*
  Warnings:

  - You are about to drop the column `producers_id` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_producers_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "producers_id",
ADD COLUMN     "producer_id" TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
