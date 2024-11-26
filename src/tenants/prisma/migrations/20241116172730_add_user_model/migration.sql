-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nume" VARCHAR(20) NOT NULL,
    "prenume" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "parola" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
