-- CreateTable
CREATE TABLE "public"."Game" (
    "id" SERIAL NOT NULL,
    "nomeGioco" TEXT NOT NULL,
    "votoLancio" DOUBLE PRECISION,
    "votoAggiornato" DOUBLE PRECISION,
    "recensioneOriginale" TEXT NOT NULL,
    "analisiAggiornata" TEXT,
    "ultimaRevisione" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
