-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "average_price" DECIMAL(15,2) NOT NULL,
    "estimated_value" DECIMAL(15,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);
