import { Request, Response, NextFunction, Router } from "express"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const auth = Router()

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

// Client backend con service_role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

// Middleware per validare il token
async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: "Missing auth header" })

  const token = authHeader.replace("Bearer ", "")
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
  (req as any).user = data.user
  next()
}

// Rotta protetta
auth.get("/protected", authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user
  res.json({ message: "Accesso autorizzato 🔒", user })
})

export default auth
