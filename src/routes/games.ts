import { Request, Response, Router } from "express";
import prisma from "../db";

const router = Router();

// GET tutti i giochi
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const games = await prisma.game.findMany({ orderBy: { id: "asc" } });
  res.json(games);
});

// GET gioco singolo
router.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const game = await prisma.game.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!game) return res.status(404).json({ error: "Gioco non trovato" });
  return res.json(game);
});

// POST nuovo gioco
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const newGame = await prisma.game.create({ data: req.body });
  res.json(newGame);
});

export default router;
