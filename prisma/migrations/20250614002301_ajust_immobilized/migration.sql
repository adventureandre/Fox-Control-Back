/*
  Warnings:

  - You are about to drop the column `currentValue` on the `immobilized` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedValue` on the `immobilized` table. All the data in the column will be lost.
  - You are about to alter the column `depreciation_rate` on the `immobilized` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - Added the required column `current_value` to the `immobilized` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_value` to the `immobilized` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "immobilized" DROP COLUMN "currentValue",
DROP COLUMN "estimatedValue",
ADD COLUMN     "current_value" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "estimated_value" DECIMAL(15,2) NOT NULL,
ALTER COLUMN "depreciation_rate" SET DATA TYPE DECIMAL(5,2);
