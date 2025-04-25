/*
  Warnings:

  - You are about to drop the column `data` on the `transacoes` table. All the data in the column will be lost.
  - Added the required column `date` to the `transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transacoes" DROP COLUMN "data",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
