import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TasksList as TasksListComponent } from '../components/tasks/TasksList'
import { CreateTask } from '../components/tasks/CreateTask'
import { useAuth } from '../components/auth/AuthContext'
import { taskService, type Task } from '../services/taskService'
import '../styles/TasksList.css'

export function TasksListPage() {
  const { category, status } = useParams<{ category?: string; status?: string }>()
  const { getAuthHeaders } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les tâches depuis l'API
  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiTasks = await taskService.getAllTasks()
      setTasks(apiTasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      console.error('Erreur lors du chargement des tâches:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    let filtered = tasks

    // Filtrer par catégorie si spécifiée dans l'URL
    if (category) {
      filtered = filtered.filter(task => 
        task.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filtrer par statut si spécifié dans l'URL
    if (status) {
      filtered = filtered.filter(task => 
        task.status === status
      )
    }

    // Appliquer le filtre actif
    if (activeFilter !== 'all') {
      filtered = filtered.filter(task => task.status === activeFilter)
    }

    setFilteredTasks(filtered)
  }, [tasks, category, status, activeFilter])

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    const authHeaders = getAuthHeaders()
    
    try {
      // Mettre à jour localement d'abord pour une UX fluide
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      )

      // Puis appeler l'API
      await taskService.updateTask(taskId, updates, authHeaders)
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err)
      // Recharger les tâches en cas d'erreur
      const apiTasks = await taskService.getAllTasks()
      setTasks(apiTasks)
    }
  }

  const handleTaskDelete = async (taskId: string) => {
    const authHeaders = getAuthHeaders()
    
    try {
      // Supprimer localement d'abord
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
      
      // Puis appeler l'API
      await taskService.deleteTask(taskId, authHeaders)
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      // Recharger les tâches en cas d'erreur
      const apiTasks = await taskService.getAllTasks()
      setTasks(apiTasks)
    }
  }

  const getPageTitle = () => {
    if (category && status) {
      return `Tâches ${status} - ${category}`
    } else if (category) {
      return `Tâches - ${category}`
    } else if (status) {
      return `Tâches ${status}`
    }
    return 'Toutes les tâches'
  }

  const getPageDescription = () => {
    if (category && status) {
      return `Gérez vos tâches ${status} dans la catégorie "${category}"`
    } else if (category) {
      return `Explorez toutes vos tâches dans la catégorie "${category}"`
    } else if (status) {
      return `Visualisez toutes vos tâches avec le statut "${status}"`
    }
    return 'Gérez toutes vos tâches en un seul endroit avec style'
  }

  const categories = [...new Set(tasks.map(task => task.category))]
  const statuses = ['pending', 'in-progress', 'completed']

  // Gestion du chargement
  if (loading) {
    return (
      <div className="tasks-list-container">
        <div className="tasks-list-header">
          <h1>Chargement des tâches...</h1>
          <p>Récupération des données depuis l'API</p>
        </div>
      </div>
    )
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="tasks-list-container">
        <div className="tasks-list-header">
          <h1>Erreur</h1>
          <p style={{ color: '#ff6b6b' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="create-task-btn"
            style={{ marginTop: '1rem' }}
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="tasks-list-container">
      <div className="tasks-list-header">
        <h1>{getPageTitle()}</h1>
        <p>{getPageDescription()}</p>
        {category && (
          <span className="category-badge">{category}</span>
        )}
      </div>

      {/* Navigation rapide */}
      <div className="filter-controls">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          Toutes
        </button>
        {statuses.map(statusFilter => (
          <button
            key={statusFilter}
            className={`filter-btn ${activeFilter === statusFilter ? 'active' : ''}`}
            onClick={() => setActiveFilter(statusFilter)}
          >
            {statusFilter === 'pending' && 'En attente'}
            {statusFilter === 'in-progress' && 'En cours'}
            {statusFilter === 'completed' && 'Terminées'}
          </button>
        ))}
      </div>

      {/* Liens vers les catégories */}
      {!category && (
        <div className="filter-controls">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/tasks/category/${cat}`}
              className="filter-btn"
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* Composant de création de tâche */}
      <CreateTask onTaskCreated={fetchTasks} />

      {/* Liste des tâches */}
      <TasksListComponent
        tasks={filteredTasks}
        category={category}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  )
}