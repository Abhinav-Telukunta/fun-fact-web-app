/*
  Warnings:

  - You are about to drop the column `favoriteMovie` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteMovie",
ADD COLUMN     "movies" TEXT[];
