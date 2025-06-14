/*
  Warnings:

  - A unique constraint covering the columns `[producer_id]` on the table `producer_account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "producer_account_producer_id_key" ON "producer_account"("producer_id");
