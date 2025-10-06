import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(express.json())

const SECRET = process.env.JWT_SECRET || 'dev-secret'

let nextId = 3
const tasks = [
  { id: 1, title: 'Demo', completed: false, hidden: false },
  { id: 2, title: 'Read docs', completed: true, hidden: false }
]

app.get('/tasks', (req, res) => {
  const showHidden = String(req.query.showHidden || 'false') === 'true'
  const status = String(req.query.status || 'active') // active | completed | all
  let list = tasks.slice()
  if (!showHidden) {
    list = list.filter(t => !t.hidden)
  }
  if (status === 'active') {
    list = list.filter(t => !t.completed)
  } else if (status === 'completed') {
    list = list.filter(t => t.completed)
  }
  res.json(list)
})

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find(t => t.id === id)
  if (!task) return res.status(404).json({ error: 'Not found' })
  res.json(task)
})

app.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  if (email === 'student@example.com' && password === 'password') {
    const token = jwt.sign({ sub: email }, SECRET, { expiresIn: '1h' })
    return res.json({ token })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
})

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || ''
  const m = auth.match(/^Bearer\s+(.+)/i)
  if (!m) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = jwt.verify(m[1], SECRET)
    req.user = payload
    return next()
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

app.post('/tasks', requireAuth, (req, res) => {
  const { title } = req.body || {}
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Invalid title' })
  }
  const task = { id: nextId++, title, completed: false, hidden: false }
  tasks.push(task)
  res.status(201).json(task)
})

app.patch('/tasks/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find(t => t.id === id)
  if (!task) return res.status(404).json({ error: 'Not found' })

  const { title, completed, hidden } = req.body || {}
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Invalid title' })
    }
    task.title = title
  }
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Invalid completed' })
    }
    task.completed = completed
  }
  if (hidden !== undefined) {
    if (typeof hidden !== 'boolean') {
      return res.status(400).json({ error: 'Invalid hidden' })
    }
    task.hidden = hidden
  }
  res.json(task)
})

app.delete('/tasks/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === id)
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }
  
  // Supprimer la tâche du tableau
  const deletedTask = tasks.splice(taskIndex, 1)[0]
  
  res.json({ 
    message: 'Task deleted successfully', 
    deletedTask 
  })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
