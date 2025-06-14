/*
  Warnings:

  - You are about to drop the column `farm_name` on the `producers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "producers" DROP COLUMN "farm_name",
ADD COLUMN     "farm" TEXT;
