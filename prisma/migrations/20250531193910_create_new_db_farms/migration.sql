-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "hectares" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "producers_id" TEXT NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producers_id_fkey" FOREIGN KEY ("producers_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
