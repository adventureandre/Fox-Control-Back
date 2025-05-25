/*
  Warnings:

  - You are about to drop the column `grupo` on the `producers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "producers" DROP COLUMN "grupo",
ADD COLUMN     "group" TEXT;
