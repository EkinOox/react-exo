import { Router } from 'express'
import { z } from 'zod'
import { config } from '../config.js'
import { signToken } from '../utils/jwt.js'

const router = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

router.post('/login', (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid credentials payload' })
  }

  const { email, password } = parsed.data
  if (email !== config.authEmail || password !== config.authPassword) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = signToken({ sub: email, role: 'student' })
  return res.json({ token, expiresIn: config.jwtExpiresInSeconds })
})

export const loginRouter = router
