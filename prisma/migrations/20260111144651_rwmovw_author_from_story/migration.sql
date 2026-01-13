/*
  Warnings:

  - You are about to drop the column `userid` on the `SuccessStory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SuccessStory" DROP CONSTRAINT "SuccessStory_userid_fkey";

-- AlterTable
ALTER TABLE "SuccessStory" DROP COLUMN "userid";
