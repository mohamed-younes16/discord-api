/*
  Warnings:

  - You are about to drop the column `fileId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileIdFreind` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contentId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentIdFreind]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileIdFreind_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileId_fkey";

-- DropIndex
DROP INDEX "File_fileIdFreind_key";

-- DropIndex
DROP INDEX "File_fileId_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileId",
DROP COLUMN "fileIdFreind",
ADD COLUMN     "contentId" TEXT,
ADD COLUMN     "contentIdFreind" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "File_contentId_key" ON "File"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "File_contentIdFreind_key" ON "File"("contentIdFreind");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_contentIdFreind_fkey" FOREIGN KEY ("contentIdFreind") REFERENCES "FreindChatContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
