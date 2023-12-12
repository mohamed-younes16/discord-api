/*
  Warnings:

  - You are about to drop the column `active` on the `server` table. All the data in the column will be lost.
  - Added the required column `serversBelongId` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "serversBelongId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "server" DROP COLUMN "active";

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_serversBelongId_fkey" FOREIGN KEY ("serversBelongId") REFERENCES "server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
