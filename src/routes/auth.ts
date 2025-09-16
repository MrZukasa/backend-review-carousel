import { Router, Request, Response } from "express";
import { authMiddleware } from "../authMiddleware";

const authRouter = Router();

authRouter.get("/protected", authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ message: "Accesso autorizzato 🔒", user });
});

export default authRouter;
