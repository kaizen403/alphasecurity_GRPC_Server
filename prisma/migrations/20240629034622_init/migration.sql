-- CreateTable
CREATE TABLE "Vulnerability" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "pentester" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vulnerability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pentester" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pentester_pkey" PRIMARY KEY ("id")
);
