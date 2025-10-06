import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.js'

export type AuthenticatedUser = {
  sub: string
  role?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization ?? ''
  const match = authorization.match(/^Bearer\s+(.+)/i)
  if (!match) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = match[1]
  try {
    const user = verifyToken(token)
    req.user = user
    return next()
  } catch (error) {
    console.warn('[AUTH] Invalid token', error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
