-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "producers_id" TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_producers_id_fkey" FOREIGN KEY ("producers_id") REFERENCES "producers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
