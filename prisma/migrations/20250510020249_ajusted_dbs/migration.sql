/*
  Warnings:

  - You are about to drop the `BankAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_producers_id_fkey";

-- DropTable
DROP TABLE "BankAccount";

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "producers_id" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_producers_id_fkey" FOREIGN KEY ("producers_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
