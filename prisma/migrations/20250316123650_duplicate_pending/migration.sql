/*
  Warnings:

  - A unique constraint covering the columns `[projectId,userId]` on the table `PendingProjectMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PendingProjectMember_projectId_userId_key" ON "PendingProjectMember"("projectId", "userId");
