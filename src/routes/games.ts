import { Request, Response, Router } from "express";
import prisma from "../db";
import { GameDetailProps } from "../interfaces";
import { authMiddleware } from "../authMiddleware";

const router = Router();

// GET tutti i giochi (protetto)
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const games = await prisma.game.findMany({ orderBy: { id: "asc" } });
    console.log("Chiamata GET");
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore durante il recupero dei giochi" });
  }
});

// POST nuovo gioco (protetto)
router.post("/", authMiddleware, async (req: Request<{}, {}, GameDetailProps>, res: Response) => {
  try {
    const newGame = await prisma.game.create({ data: req.body });
    console.log("Chiamata POST");
    res.json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nella creazione del gioco" });
  }
});

// DELETE gioco per ID (protetto)
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const deletedGame = await prisma.game.delete({
      where: { id },
    });

    console.log(`Gioco con ID ${id} eliminato`);
    res.json(deletedGame);
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      // Prisma: record not found
      return res.status(404).json({ error: "Gioco non trovato" });
    }

    res.status(500).json({ error: "Errore nella cancellazione del gioco" });
  }
});

export default router;
