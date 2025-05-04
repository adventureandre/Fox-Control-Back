/*
  Warnings:

  - You are about to drop the column `tipo` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "tipo";

-- DropEnum
DROP TYPE "TransacaoTipo";
