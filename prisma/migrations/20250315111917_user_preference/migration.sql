/*
  Warnings:

  - You are about to drop the `Swipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Swipe" DROP CONSTRAINT "Swipe_swipedId_fkey";

-- DropForeignKey
ALTER TABLE "Swipe" DROP CONSTRAINT "Swipe_swiperId_fkey";

-- DropTable
DROP TABLE "Swipe";

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredGender" "Gender",
    "codingTimePreference" "CodingTimePreference"[],
    "languages" TEXT[],
    "technologies" TEXT[],

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwipeUser" (
    "id" TEXT NOT NULL,
    "swiperId" TEXT NOT NULL,
    "swipedId" TEXT NOT NULL,
    "direction" "Direction" NOT NULL,

    CONSTRAINT "SwipeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwipeProject" (
    "id" TEXT NOT NULL,
    "swiperId" TEXT NOT NULL,
    "swipedId" TEXT NOT NULL,
    "direction" "Direction" NOT NULL,

    CONSTRAINT "SwipeProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwipeUser" ADD CONSTRAINT "SwipeUser_swiperId_fkey" FOREIGN KEY ("swiperId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwipeUser" ADD CONSTRAINT "SwipeUser_swipedId_fkey" FOREIGN KEY ("swipedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwipeProject" ADD CONSTRAINT "SwipeProject_swiperId_fkey" FOREIGN KEY ("swiperId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwipeProject" ADD CONSTRAINT "SwipeProject_swipedId_fkey" FOREIGN KEY ("swipedId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
