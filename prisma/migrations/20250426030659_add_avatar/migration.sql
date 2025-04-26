-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
