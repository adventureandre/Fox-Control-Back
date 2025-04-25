/*
  Warnings:

  - Changed the type of `tipo` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransacaoTipo" AS ENUM ('CREDITO', 'DEBITO');

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TransacaoTipo" NOT NULL;
