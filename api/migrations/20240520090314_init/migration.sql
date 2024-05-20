-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "savedGameId" INTEGER,
    CONSTRAINT "User_savedGameId_fkey" FOREIGN KEY ("savedGameId") REFERENCES "SavedGame" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SavedGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seed" INTEGER NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "endPositionX" INTEGER NOT NULL,
    "endPositionY" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "moves" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
