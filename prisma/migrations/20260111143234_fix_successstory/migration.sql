/*
  Warnings:

  - You are about to drop the column `approved` on the `SuccessStory` table. All the data in the column will be lost.
  - You are about to drop the column `approvedAt` on the `SuccessStory` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `SuccessStory` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SuccessStory` table. All the data in the column will be lost.
  - Added the required column `projectid` to the `SuccessStory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SuccessStory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `SuccessStory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoryStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "SuccessStory" DROP CONSTRAINT "SuccessStory_authorId_fkey";

-- DropIndex
DROP INDEX "SuccessStory_approved_idx";

-- AlterTable
ALTER TABLE "SuccessStory" DROP COLUMN "approved",
DROP COLUMN "approvedAt",
DROP COLUMN "authorId",
DROP COLUMN "title",
ADD COLUMN     "projectid" TEXT NOT NULL,
ADD COLUMN     "status" "StoryStatus" NOT NULL,
ADD COLUMN     "userid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SuccessStory" ADD CONSTRAINT "SuccessStory_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuccessStory" ADD CONSTRAINT "SuccessStory_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
