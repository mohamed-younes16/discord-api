/*
  Warnings:

  - You are about to drop the column `freinfOfId` on the `FreindsChatObject` table. All the data in the column will be lost.
  - You are about to drop the column `freinfWithId` on the `FreindsChatObject` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `FreindsChatList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ChatWithId` to the `FreindsChatObject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatCreatorId` to the `FreindsChatObject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FreindsChatObject" DROP CONSTRAINT "FreindsChatObject_freinfOfId_fkey";

-- DropForeignKey
ALTER TABLE "FreindsChatObject" DROP CONSTRAINT "FreindsChatObject_freinfWithId_fkey";

-- AlterTable
ALTER TABLE "FreindsChatList" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FreindsChatObject" DROP COLUMN "freinfOfId",
DROP COLUMN "freinfWithId",
ADD COLUMN     "ChatWithId" TEXT NOT NULL,
ADD COLUMN     "chatCreatorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_freindship" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_freindship_AB_unique" ON "_freindship"("A", "B");

-- CreateIndex
CREATE INDEX "_freindship_B_index" ON "_freindship"("B");

-- AddForeignKey
ALTER TABLE "FreindsChatObject" ADD CONSTRAINT "FreindsChatObject_chatCreatorId_fkey" FOREIGN KEY ("chatCreatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreindsChatObject" ADD CONSTRAINT "FreindsChatObject_ChatWithId_fkey" FOREIGN KEY ("ChatWithId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreindsChatList" ADD CONSTRAINT "FreindsChatList_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_freindship" ADD CONSTRAINT "_freindship_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_freindship" ADD CONSTRAINT "_freindship_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
