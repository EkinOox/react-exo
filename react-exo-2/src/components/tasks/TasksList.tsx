import { Link } from 'react-router-dom'
import '../../styles/TasksList.css'

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

interface TasksListProps {
  tasks: Task[]
  category?: string
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void
  onTaskDelete?: (taskId: string) => void
}

export function TasksList({ tasks, category, onTaskUpdate, onTaskDelete }: TasksListProps) {
  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    if (onTaskUpdate) {
      onTaskUpdate(taskId, { status: newStatus })
    }
  }

  const handleDelete = (taskId: string) => {
    if (onTaskDelete && window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      onTaskDelete(taskId)
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Élevée'
      case 'medium': return 'Moyenne'
      case 'low': return 'Faible'
      default: return priority
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'in-progress': return 'En cours'
      case 'completed': return 'Terminée'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>Aucune tâche trouvée</h3>
        <p>
          {category 
            ? `Il n'y a pas encore de tâches dans la catégorie "${category}".`
            : "Il n'y a pas encore de tâches. Commencez par en créer une !"
          }
        </p>
        <Link to="/tasks/new" className="create-task-btn">
          Créer une nouvelle tâche
        </Link>
      </div>
    )
  }

  return (
    <div className="tasks-grid">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          
          <div className="task-meta">
            <span className={`task-priority ${task.priority}`}>
              {getPriorityLabel(task.priority)}
            </span>
            <span className={`task-status ${task.status}`}>
              {getStatusLabel(task.status)}
            </span>
          </div>

          <div className="task-details">
            <small style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Créée le {formatDate(task.createdAt)}
              {task.dueDate && ` • Échéance: ${formatDate(task.dueDate)}`}
            </small>
          </div>

          <div className="task-actions">
            {task.status !== 'completed' && (
              <button
                className="task-action-btn"
                onClick={() => handleStatusChange(task.id, 
                  task.status === 'pending' ? 'in-progress' : 'completed'
                )}
              >
                {task.status === 'pending' ? 'Commencer' : 'Terminer'}
              </button>
            )}
            
            {task.status === 'completed' && (
              <button
                className="task-action-btn"
                onClick={() => handleStatusChange(task.id, 'in-progress')}
              >
                Reprendre
              </button>
            )}

            <Link to={`/tasks/detail?id=${task.id}&source=${encodeURIComponent(window.location.pathname)}`} className="task-action-btn">
              Voir détails
            </Link>

            <Link to={`/tasks/${task.id}/edit`} className="task-action-btn">
              Modifier
            </Link>
            
            <button
              className="task-action-btn"
              onClick={() => handleDelete(task.id)}
              style={{ background: 'rgba(255, 75, 75, 0.3)' }}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}