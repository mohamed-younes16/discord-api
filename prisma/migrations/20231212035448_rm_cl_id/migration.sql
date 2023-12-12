/*
  Warnings:

  - You are about to drop the column `idc` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_idc_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idc";
