-- CreateEnum
CREATE TYPE "TipMembership" AS ENUM ('gratuit', 'standard', 'premium');

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "tipMembership" "TipMembership" NOT NULL,
    "nr_maxim_intrari_Scrise" INTEGER NOT NULL,
    "nr_maxim_intrari_Audio" INTEGER NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);
