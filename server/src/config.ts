import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(1).default('dev-secret'),
  JWT_EXPIRES_IN_SECONDS: z.coerce.number().positive().default(60 * 60),
  AUTH_EMAIL: z.string().email().default('student@example.com'),
  AUTH_PASSWORD: z.string().min(1).default('password')
})

const env = envSchema.parse({
  PORT: process.env.PORT,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN_SECONDS: process.env.JWT_EXPIRES_IN_SECONDS,
  AUTH_EMAIL: process.env.AUTH_EMAIL,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD
})

export const config = {
  port: env.PORT,
  clientOrigin: env.CLIENT_ORIGIN,
  jwtSecret: env.JWT_SECRET,
  jwtExpiresInSeconds: env.JWT_EXPIRES_IN_SECONDS,
  authEmail: env.AUTH_EMAIL,
  authPassword: env.AUTH_PASSWORD
}
