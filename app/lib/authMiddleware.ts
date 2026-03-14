import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export interface AuthUser {
  id: string
  email: string
}

/**
 * Call this at the top of every API route.
 * Returns { user } on success, or { error: NextResponse } if token is missing/invalid.
 *
 * Usage:
 *   const auth = getUserFromToken(req)
 *   if (auth.error) return auth.error
 *   const userId = auth.user.id
 */
export function getUserFromToken(req: Request): { user: AuthUser } | { error: NextResponse } {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 }),
    }
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser
    return { user: decoded }
  } catch (err) {
    return {
      error: NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 }),
    }
  }
}