-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genre" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "valueCn" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Genre" ("key", "value") SELECT "key", "value" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
CREATE UNIQUE INDEX "Genre_key_key" ON "Genre"("key");
CREATE TABLE "new_Country" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "valueCn" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Country" ("key", "value") SELECT "key", "value" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_key_key" ON "Country"("key");
CREATE TABLE "new_Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameCn" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Actor" ("id", "name") SELECT "id", "name" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE UNIQUE INDEX "Actor_id_key" ON "Actor"("id");
CREATE TABLE "new_ImdbItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot" TEXT NOT NULL,
    "plotCn" TEXT NOT NULL DEFAULT '',
    "fullTitle" TEXT NOT NULL,
    "imDbRating" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imDbRatingCount" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleCn" TEXT NOT NULL DEFAULT '',
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
