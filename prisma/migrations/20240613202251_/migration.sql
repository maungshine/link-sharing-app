/*
  Warnings:

  - You are about to drop the column `newEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokenExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "newEmail",
DROP COLUMN "tokenExpires",
DROP COLUMN "verificationToken";
