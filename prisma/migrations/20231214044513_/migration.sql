/*
  Warnings:

  - A unique constraint covering the columns `[name,serversBelongId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_serversBelongId_key" ON "Channel"("name", "serversBelongId");

-- CreateIndex
CREATE UNIQUE INDEX "server_name_key" ON "server"("name");
