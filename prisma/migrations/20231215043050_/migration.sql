/*
  Warnings:

  - A unique constraint covering the columns `[memberId,serverId]` on the table `member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "member_memberId_serverId_key" ON "member"("memberId", "serverId");
