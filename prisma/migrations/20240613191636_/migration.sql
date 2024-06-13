/*
  Warnings:

  - You are about to drop the column `unverifiedEmail` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "unverifiedEmail",
ADD COLUMN     "newEmail" TEXT,
ADD COLUMN     "tokenExpires" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT;
