-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "producers_id" TEXT NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_producers_id_fkey" FOREIGN KEY ("producers_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
