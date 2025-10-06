import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TasksList as TasksListComponent, type Task } from '../components/tasks/TasksList'
import '../styles/TasksList.css'

// Données de démonstration - en production, ceci viendrait d'une API
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Développer l\'interface utilisateur',
    description: 'Créer les composants React avec le design glassmorphism pour améliorer l\'expérience utilisateur.',
    priority: 'high',
    status: 'in-progress',
    category: 'développement',
    createdAt: '2024-01-15',
    dueDate: '2024-02-01'
  },
  {
    id: '2',
    title: 'Rédiger la documentation',
    description: 'Documenter l\'API et les composants pour faciliter la maintenance future.',
    priority: 'medium',
    status: 'pending',
    category: 'documentation',
    createdAt: '2024-01-10',
    dueDate: '2024-01-25'
  },
  {
    id: '3',
    title: 'Optimiser les performances',
    description: 'Analyser et améliorer les temps de chargement de l\'application.',
    priority: 'high',
    status: 'completed',
    category: 'développement',
    createdAt: '2024-01-05',
    dueDate: '2024-01-20'
  },
  {
    id: '4',
    title: 'Tests unitaires',
    description: 'Écrire des tests pour assurer la qualité du code et éviter les régressions.',
    priority: 'medium',
    status: 'pending',
    category: 'qualité',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Déploiement production',
    description: 'Configurer le pipeline de déploiement automatique vers l\'environnement de production.',
    priority: 'low',
    status: 'pending',
    category: 'devops',
    createdAt: '2024-01-08'
  }
]

export function TasksListPage() {
  const { category, status } = useParams<{ category?: string; status?: string }>()
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('all')

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

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    )
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
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

      {/* Liste des tâches */}
      <TasksListComponent
        tasks={filteredTasks}
        category={category}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />

      {/* Actions rapides */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/tasks/new" className="create-task-btn">
          Créer une nouvelle tâche
        </Link>
      </div>
    </div>
  )
}