/*
  Warnings:

  - The values [VIDEO,AUDIO,TEXT] on the enum `ChannelTypes` will be removed. If these variants are still used in the database, this will fail.
  - The values [PDF,IMAGE] on the enum `FileTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChannelTypes_new" AS ENUM ('video', 'audio', 'text');
ALTER TABLE "Channel" ALTER COLUMN "type" TYPE "ChannelTypes_new" USING ("type"::text::"ChannelTypes_new");
ALTER TYPE "ChannelTypes" RENAME TO "ChannelTypes_old";
ALTER TYPE "ChannelTypes_new" RENAME TO "ChannelTypes";
DROP TYPE "ChannelTypes_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "FileTypes_new" AS ENUM ('pdf', 'image');
ALTER TABLE "File" ALTER COLUMN "fileType" TYPE "FileTypes_new" USING ("fileType"::text::"FileTypes_new");
ALTER TYPE "FileTypes" RENAME TO "FileTypes_old";
ALTER TYPE "FileTypes_new" RENAME TO "FileTypes";
DROP TYPE "FileTypes_old";
COMMIT;
