/*
  Warnings:

  - The values [ADMIN,MODERATOR,MEMBER] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[memberId]` on the table `member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('admin', 'moderator', 'member');
ALTER TABLE "member" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "member_memberId_key" ON "member"("memberId");
