-- DropIndex
DROP INDEX "Channel_name_key";

-- CreateIndex
CREATE INDEX "server_id_idx" ON "server"("id");
