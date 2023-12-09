-- CreateEnum
CREATE TYPE "ChannelTypes" AS ENUM ('VIDEO', 'AUDIO', 'TEXT');

-- CreateEnum
CREATE TYPE "FileTypes" AS ENUM ('PDF', 'IMAGE');

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "type" "ChannelTypes" NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" "FileTypes" NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_key" ON "Channel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Content_id_key" ON "Content"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Content_chatId_key" ON "Content"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");

-- CreateIndex
CREATE UNIQUE INDEX "File_fileId_key" ON "File"("fileId");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
