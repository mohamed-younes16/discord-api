/*
  Warnings:

  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fileIdFreind]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileIdFreind" TEXT;

-- DropTable
DROP TABLE "_friends";

-- CreateTable
CREATE TABLE "FreindsChatObject" (
    "id" TEXT NOT NULL,
    "freinfOfId" TEXT NOT NULL,
    "freinfWithId" TEXT NOT NULL,

    CONSTRAINT "FreindsChatObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreindsChatList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freindChatRefrenceId" TEXT NOT NULL,

    CONSTRAINT "FreindsChatList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreindChatContent" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "FreindChatContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FreindsChatObject_id_key" ON "FreindsChatObject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FreindsChatList_id_key" ON "FreindsChatList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FreindChatContent_id_key" ON "FreindChatContent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FreindChatContent_chatId_key" ON "FreindChatContent"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "File_fileIdFreind_key" ON "File"("fileIdFreind");

-- AddForeignKey
ALTER TABLE "FreindsChatObject" ADD CONSTRAINT "FreindsChatObject_freinfOfId_fkey" FOREIGN KEY ("freinfOfId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreindsChatObject" ADD CONSTRAINT "FreindsChatObject_freinfWithId_fkey" FOREIGN KEY ("freinfWithId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreindsChatList" ADD CONSTRAINT "FreindsChatList_freindChatRefrenceId_fkey" FOREIGN KEY ("freindChatRefrenceId") REFERENCES "FreindsChatObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreindChatContent" ADD CONSTRAINT "FreindChatContent_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "FreindsChatList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileIdFreind_fkey" FOREIGN KEY ("fileIdFreind") REFERENCES "FreindChatContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
