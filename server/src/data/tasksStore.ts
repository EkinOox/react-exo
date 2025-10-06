export type Task = {
  id: string
  title: string
  description?: string
  done: boolean
  hidden: boolean
  createdAt: string
  updatedAt: string
}

export type TaskCreateInput = {
  title: string
  description?: string
}

export type TaskUpdateInput = Partial<Pick<Task, 'title' | 'description' | 'done' | 'hidden'>>

let nextId = 3
const tasks: Task[] = [
  {
    id: '1',
    title: 'Préparer la démo React',
    description: 'Lister les cas happy path',
    done: false,
    hidden: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Lire la doc Express',
    description: 'Focus sur les middlewares',
    done: true,
    hidden: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export type TaskListFilters = {
  status?: 'all' | 'active' | 'done'
  showHidden?: boolean
}

export function listTasks(filters: TaskListFilters = {}): Task[] {
  const { status = 'all', showHidden = false } = filters
  return tasks
    .filter((task) => (showHidden ? true : !task.hidden))
    .filter((task) => {
      if (status === 'active') return !task.done
      if (status === 'done') return task.done
      return true
    })
}

export function findTask(id: string): Task | undefined {
  return tasks.find((task) => task.id === id)
}

export function createTask(input: TaskCreateInput): Task {
  const now = new Date().toISOString()
  const task: Task = {
    id: String(nextId++),
    title: input.title,
    description: input.description,
    done: false,
    hidden: false,
    createdAt: now,
    updatedAt: now
  }
  tasks.unshift(task)
  return task
}

export function updateTask(id: string, input: TaskUpdateInput): Task | undefined {
  const task = findTask(id)
  if (!task) {
    return undefined
  }
  const now = new Date().toISOString()
  if (input.title !== undefined) {
    task.title = input.title
  }
  if (input.description !== undefined) {
    task.description = input.description
  }
  if (typeof input.done === 'boolean') {
    task.done = input.done
  }
  if (typeof input.hidden === 'boolean') {
    task.hidden = input.hidden
  }
  task.updatedAt = now
  return task
}
