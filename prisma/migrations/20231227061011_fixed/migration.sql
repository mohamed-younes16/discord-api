/*
  Warnings:

  - A unique constraint covering the columns `[chatCreatorId,ChatWithId]` on the table `FreindsChatObject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FreindsChatObject_chatCreatorId_ChatWithId_key" ON "FreindsChatObject"("chatCreatorId", "ChatWithId");
