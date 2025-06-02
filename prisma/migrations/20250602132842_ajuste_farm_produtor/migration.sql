/*
  Warnings:

  - You are about to drop the column `producers_id` on the `farms` table. All the data in the column will be lost.
  - Added the required column `producer_id` to the `farms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "farms" DROP CONSTRAINT "farms_producers_id_fkey";

-- AlterTable
ALTER TABLE "farms" DROP COLUMN "producers_id",
ADD COLUMN     "producer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
