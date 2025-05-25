-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "favoriteMovie" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);
