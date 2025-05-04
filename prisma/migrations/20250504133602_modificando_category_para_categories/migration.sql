/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parent_id_fkey";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
