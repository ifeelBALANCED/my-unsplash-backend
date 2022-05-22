-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT E'',
    "photoUrl" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
