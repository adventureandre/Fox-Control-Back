/*
  Warnings:

  - You are about to alter the column `valor` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "valor" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "immobilized" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "current_value" DECIMAL(65,30) NOT NULL,
    "estimated_value" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "avaliable_as_collateral" BOOLEAN NOT NULL DEFAULT false,
    "depreciation_rate" DECIMAL(65,30),
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "useful_life_years" INTEGER,
    "notes" TEXT,
    "producer_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "immobilized_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "immobilized" ADD CONSTRAINT "immobilized_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
