/*
  Warnings:

  - You are about to drop the column `current_value` on the `immobilized` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_value` on the `immobilized` table. All the data in the column will be lost.
  - Added the required column `currentValue` to the `immobilized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedValue` to the `immobilized` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "immobilized" DROP COLUMN "current_value",
DROP COLUMN "estimated_value",
ADD COLUMN     "currentValue" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "estimatedValue" DECIMAL(65,30) NOT NULL;
