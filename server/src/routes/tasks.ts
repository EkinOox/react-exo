import { Router } from 'express'
import { z } from 'zod'
import {
  createTask,
  findTask,
  listTasks,
  updateTask
} from '../data/tasksStore.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

const listSchema = z.object({
  status: z.enum(['all', 'active', 'done']).optional(),
  showHidden: z
    .string()
    .transform((value) => value === 'true')
    .optional()
})

router.get('/tasks', (req, res) => {
  const parsed = listSchema.safeParse(req.query)
  const filters = parsed.success ? parsed.data : {}
  const tasks = listTasks(filters)
  return res.json(tasks)
})

const createSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional()
})

router.post('/tasks', requireAuth, (req, res) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: parsed.error.flatten().fieldErrors.title?.[0] ?? 'Invalid payload' })
  }

  const task = createTask(parsed.data)
  return res.status(201).json(task)
})

const updateSchema = z.object({
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
  done: z.boolean().optional(),
  hidden: z.boolean().optional()
})

router.patch('/tasks/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const parsed = updateSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  const updated = updateTask(id, parsed.data)
  if (!updated) {
    return res.status(404).json({ error: 'Task not found' })
  }

  return res.json(updated)
})

router.get('/tasks/:id', (req, res) => {
  const task = findTask(req.params.id)
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  return res.json(task)
})

export const tasksRouter = router
