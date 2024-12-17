/*
  Warnings:

  - You are about to drop the column `membershipId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_membershipId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "membershipId";

-- CreateTable
CREATE TABLE "_MembershipToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MembershipToUser_AB_unique" ON "_MembershipToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MembershipToUser_B_index" ON "_MembershipToUser"("B");

-- AddForeignKey
ALTER TABLE "_MembershipToUser" ADD CONSTRAINT "_MembershipToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembershipToUser" ADD CONSTRAINT "_MembershipToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
