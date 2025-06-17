/*
  Warnings:

  - You are about to drop the column `crop` on the `inventory` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producer_id` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "crop",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "producer_id" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL,
ALTER COLUMN "average_price" DROP NOT NULL,
ALTER COLUMN "estimated_value" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
