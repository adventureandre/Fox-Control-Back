/*
  Warnings:

  - You are about to drop the `transacoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "transacoes";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" "TransacaoTipo" NOT NULL,
    "conta" TEXT NOT NULL,
    "categoria" TEXT,
    "conciliado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
