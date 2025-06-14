/*
  Warnings:

  - You are about to drop the column `producers_id` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `producer_id` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_producers_id_fkey";

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "producers_id",
ADD COLUMN     "producer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
