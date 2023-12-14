/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "server_name_key" ON "server"("name");
