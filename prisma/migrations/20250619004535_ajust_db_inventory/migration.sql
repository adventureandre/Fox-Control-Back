/*
  Warnings:

  - You are about to drop the column `category_id` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `inventory` table. All the data in the column will be lost.
  - Added the required column `crop` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Made the column `average_price` on table `inventory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimated_value` on table `inventory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "category_id",
DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "unit",
ADD COLUMN     "crop" TEXT NOT NULL,
ALTER COLUMN "average_price" SET NOT NULL,
ALTER COLUMN "estimated_value" SET NOT NULL;
