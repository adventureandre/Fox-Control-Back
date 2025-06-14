/*
  Warnings:

  - Added the required column `conta` to the `producer_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "producer_account" ADD COLUMN     "conta" TEXT NOT NULL;
