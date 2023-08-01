-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "hashedPassword" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ImdbItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot" TEXT NOT NULL,
    "fullTitle" TEXT NOT NULL,
    "imDbRating" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imDbRatingCount" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isTop250" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "imDbId" TEXT NOT NULL,
    "actorId" TEXT,
    "title" TEXT,
    CONSTRAINT "Image_imDbId_fkey" FOREIGN KEY ("imDbId") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Image_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Keyword" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImdbItemToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImdbItemToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImdbItemToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_similarItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_similarItem_A_fkey" FOREIGN KEY ("A") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_similarItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImdbItemToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImdbItemToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImdbItemToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword" ("key") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActorToImdbItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActorToImdbItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActorToImdbItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GenreToImdbItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GenreToImdbItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre" ("key") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GenreToImdbItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountryToImdbItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToImdbItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("key") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToImdbItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ImdbItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ImdbItem_id_key" ON "ImdbItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_id_key" ON "Actor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_key_key" ON "Genre"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Country_key_key" ON "Country"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_key_key" ON "Keyword"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_ImdbItemToUser_AB_unique" ON "_ImdbItemToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ImdbItemToUser_B_index" ON "_ImdbItemToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_similarItem_AB_unique" ON "_similarItem"("A", "B");

-- CreateIndex
CREATE INDEX "_similarItem_B_index" ON "_similarItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImdbItemToKeyword_AB_unique" ON "_ImdbItemToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_ImdbItemToKeyword_B_index" ON "_ImdbItemToKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToImdbItem_AB_unique" ON "_ActorToImdbItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToImdbItem_B_index" ON "_ActorToImdbItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToImdbItem_AB_unique" ON "_GenreToImdbItem"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToImdbItem_B_index" ON "_GenreToImdbItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToImdbItem_AB_unique" ON "_CountryToImdbItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToImdbItem_B_index" ON "_CountryToImdbItem"("B");
