import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import { logRequests } from './middleware/logRequests.js'
import { loginRouter } from './routes/login.js'
import { tasksRouter } from './routes/tasks.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: config.clientOrigin,
      credentials: true
    })
  )
  app.use(express.json())
  app.use(logRequests)

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use(loginRouter)
  app.use(tasksRouter)

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[API] Unhandled error', error)
    res.status(500).json({ error: 'Internal server error' })
  })

  return app
}
