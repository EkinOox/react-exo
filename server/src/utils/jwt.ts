import jwt from 'jsonwebtoken'
import type { AuthenticatedUser } from '../middleware/requireAuth.js'
import { config } from '../config.js'

export function signToken(payload: AuthenticatedUser): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresInSeconds
  })
}

export function verifyToken(token: string): AuthenticatedUser {
  return jwt.verify(token, config.jwtSecret) as AuthenticatedUser
}
