-- CreateEnum
CREATE TYPE "TransacaoTipo" AS ENUM ('CREDITO', 'DEBITO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacoes" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" "TransacaoTipo" NOT NULL,
    "conta" TEXT NOT NULL,
    "categoria" TEXT,
    "conciliado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
