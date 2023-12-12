/*
  Warnings:

  - A unique constraint covering the columns `[idc]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idc` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_idc_key" ON "User"("idc");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
