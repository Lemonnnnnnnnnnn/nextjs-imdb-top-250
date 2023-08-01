/*
  Warnings:

  - You are about to alter the column `year` on the `ImdbItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImdbItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot" TEXT NOT NULL,
    "fullTitle" TEXT NOT NULL,
    "imDbRating" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imDbRatingCount" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "isTop250" BOOLEAN NOT NULL
);
INSERT INTO "new_ImdbItem" ("fullTitle", "id", "imDbRating", "imDbRatingCount", "image", "isTop250", "plot", "rank", "thumbnail", "title", "year") SELECT "fullTitle", "id", "imDbRating", "imDbRatingCount", "image", "isTop250", "plot", "rank", "thumbnail", "title", "year" FROM "ImdbItem";
DROP TABLE "ImdbItem";
ALTER TABLE "new_ImdbItem" RENAME TO "ImdbItem";
CREATE UNIQUE INDEX "ImdbItem_id_key" ON "ImdbItem"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
