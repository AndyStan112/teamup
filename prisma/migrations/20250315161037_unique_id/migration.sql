/*
  Warnings:

  - A unique constraint covering the columns `[swiperId,swipedId]` on the table `SwipeUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SwipeUser_swiperId_swipedId_key" ON "SwipeUser"("swiperId", "swipedId");
