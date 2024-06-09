-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "savedGameId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedGame" (
    "id" SERIAL NOT NULL,
    "seed" INTEGER NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "endPositionX" INTEGER NOT NULL,
    "endPositionY" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "moves" INTEGER NOT NULL,

    CONSTRAINT "SavedGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_savedGameId_fkey" FOREIGN KEY ("savedGameId") REFERENCES "SavedGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;
