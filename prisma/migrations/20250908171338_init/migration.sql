-- CreateTable
CREATE TABLE "public"."FoodEntry" (
    "id" SERIAL NOT NULL,
    "session" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodEntry_pkey" PRIMARY KEY ("id")
);
