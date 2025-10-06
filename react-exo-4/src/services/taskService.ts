import axios from 'axios'

// Configuration de base pour Axios
const API_BASE_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interface pour la tâche venant de l'API
export interface ApiTask {
  id: number
  title: string
  completed: boolean
  hidden: boolean
}

// Interface pour la tâche dans l'application (adaptée)
export interface Task {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  category: string
  createdAt: string
  dueDate?: string
}

// Interface pour les métadonnées stockées localement
interface TaskMetadata {
  description: string
  priority: 'high' | 'medium' | 'low'
  category: string
  createdAt: string
  dueDate?: string
  status?: 'pending' | 'in-progress' | 'completed'
}

// Stockage local pour les métadonnées
const METADATA_KEY = 'task_metadata'

const getMetadata = (): Record<string, TaskMetadata> => {
  try {
    const stored = localStorage.getItem(METADATA_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

const setMetadata = (id: string, metadata: TaskMetadata) => {
  try {
    const allMetadata = getMetadata()
    allMetadata[id] = metadata
    localStorage.setItem(METADATA_KEY, JSON.stringify(allMetadata))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des métadonnées:', error)
  }
}

const removeMetadata = (id: string) => {
  try {
    const allMetadata = getMetadata()
    delete allMetadata[id]
    localStorage.setItem(METADATA_KEY, JSON.stringify(allMetadata))
  } catch (error) {
    console.error('Erreur lors de la suppression des métadonnées:', error)
  }
}

// Fonction pour transformer les données de l'API vers le format de l'application
export const transformApiTaskToTask = (apiTask: ApiTask): Task => {
  const metadata = getMetadata()
  const taskMetadata = metadata[apiTask.id.toString()] || {
    description: `Tâche ${apiTask.hidden ? 'cachée' : 'visible'} - ${apiTask.completed ? 'terminée' : 'en cours'}`,
    priority: 'medium' as const,
    category: 'général',
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: undefined,
    status: apiTask.completed ? 'completed' : 'pending' // Ajout du status dans les métadonnées
  }

  // Priorité au status dans les métadonnées s'il existe, sinon déduction de completed
  let status: Task['status'] = 'pending'
  if (taskMetadata.status) {
    status = taskMetadata.status
  } else if (apiTask.completed) {
    status = 'completed'
  }

  return {
    id: apiTask.id.toString(),
    title: apiTask.title,
    description: taskMetadata.description,
    priority: taskMetadata.priority,
    status: status,
    category: taskMetadata.category,
    createdAt: taskMetadata.createdAt,
    dueDate: taskMetadata.dueDate
  }
}

// Service API pour les tâches
export const taskService = {
  // Récupérer toutes les tâches
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await api.get<ApiTask[]>('/tasks')
      return response.data.map(transformApiTaskToTask)
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error)
      throw new Error('Impossible de récupérer les tâches')
    }
  },

  // Récupérer une tâche par ID
  getTaskById: async (id: string): Promise<Task | null> => {
    try {
      const response = await api.get<ApiTask>(`/tasks/${id}`)
      return transformApiTaskToTask(response.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null
      }
      console.error(`Erreur lors de la récupération de la tâche ${id}:`, error)
      throw new Error('Impossible de récupérer la tâche')
    }
  },

  // Mettre à jour une tâche
  updateTask: async (id: string, updates: Partial<Task>, authHeaders: any = {}): Promise<Task> => {
    try {
      // Mettre à jour l'API seulement pour title et completed
      const apiUpdates: Partial<ApiTask> = {}
      if (updates.title !== undefined) {
        apiUpdates.title = updates.title
      }
      if (updates.status !== undefined) {
        apiUpdates.completed = updates.status === 'completed'
      }

      // Appeler l'API si nécessaire
      if (Object.keys(apiUpdates).length > 0) {
        await api.patch<ApiTask>(`/tasks/${id}`, apiUpdates, {
          headers: authHeaders
        })
      }

      // Mettre à jour les métadonnées locales
      if (updates.description !== undefined || 
          updates.priority !== undefined || 
          updates.category !== undefined || 
          updates.dueDate !== undefined ||
          updates.status !== undefined) {
        
        const currentMetadata = getMetadata()[id] || {
          description: '',
          priority: 'medium' as const,
          category: 'général',
          createdAt: new Date().toISOString().split('T')[0]
        }

        const newMetadata: TaskMetadata = {
          ...currentMetadata,
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
          ...(updates.category !== undefined && { category: updates.category }),
          ...(updates.dueDate !== undefined && { dueDate: updates.dueDate }),
          ...(updates.status !== undefined && { status: updates.status })
        }

        setMetadata(id, newMetadata)
      }

      // Récupérer la tâche mise à jour
      const response = await api.get<ApiTask>(`/tasks/${id}`, {
        headers: authHeaders
      })
      
      return transformApiTaskToTask(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Vous devez être connecté pour modifier une tâche')
        }
        if (error.response?.status === 404) {
          throw new Error('Tâche non trouvée')
        }
        throw new Error(`Erreur lors de la mise à jour: ${error.response?.data?.error || error.message}`)
      }
      throw new Error('Erreur de connexion')
    }
  },

  // Supprimer une tâche
  deleteTask: async (id: string, authHeaders: any = {}): Promise<void> => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: authHeaders
      })
      
      // Supprimer les métadonnées locales
      removeMetadata(id)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Vous devez être connecté pour supprimer une tâche')
        }
        if (error.response?.status === 404) {
          throw new Error('Tâche non trouvée')
        }
        throw new Error(`Erreur lors de la suppression: ${error.response?.data?.error || error.message}`)
      }
      throw new Error('Erreur de connexion')
    }
  },

  // Créer une nouvelle tâche
  createTask: async (title: string, authHeaders: any = {}): Promise<Task> => {
    try {
      const response = await api.post<ApiTask>('/tasks', 
        { title },
        {
          headers: authHeaders
        }
      )
      
      // Initialiser les métadonnées pour la nouvelle tâche
      const initialMetadata: TaskMetadata = {
        description: `Nouvelle tâche créée`,
        priority: 'medium',
        category: 'général',
        createdAt: new Date().toISOString().split('T')[0],
        dueDate: undefined
      }
      
      setMetadata(response.data.id.toString(), initialMetadata)
      
      return transformApiTaskToTask(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Vous devez être connecté pour créer une tâche')
        }
        if (error.response?.status === 400) {
          throw new Error('Titre invalide')
        }
        throw new Error(`Erreur lors de la création: ${error.response?.data?.error || error.message}`)
      }
      throw new Error('Erreur de connexion')
    }
  }
}

export default taskService