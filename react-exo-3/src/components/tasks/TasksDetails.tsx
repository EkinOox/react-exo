import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Task } from './TasksList'
import '../../styles/TaskDetails.css'

interface TaskDetailsProps {
  task: Task | null
  onStatusChange?: (newStatus: Task['status']) => void
  onDelete?: () => void
  onTaskIdChange?: (newId: string) => void
}

export function TaskDetails({ 
  task, 
  onStatusChange, 
  onDelete,
  onTaskIdChange
}: TaskDetailsProps) {
  const [inputId, setInputId] = useState('')
  const [debouncedInputId, setDebouncedInputId] = useState('')

  // Debounce pour éviter trop d'appels lors de la frappe
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputId(inputId)
    }, 300) // 300ms de délai

    return () => clearTimeout(timer)
  }, [inputId])

  // Effectuer le changement quand le debounced value change
  useEffect(() => {
    if (debouncedInputId.trim() && /^\d+$/.test(debouncedInputId.trim()) && onTaskIdChange) {
      onTaskIdChange(debouncedInputId.trim())
    }
  }, [debouncedInputId, onTaskIdChange])
  if (!task) {
    return (
      <div className="task-details-container">
        <div className="task-not-found">
          <h2>Tâche introuvable</h2>
          <p>La tâche que vous recherchez n'existe pas ou a été supprimée.</p>
          
          {/* Input pour changer d'ID même quand la tâche n'est pas trouvée */}
          <div style={{ margin: '2rem 0' }}>
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="Entrez un ID de tâche (1, 2, 3, 4, 5)"
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem',
                width: '300px',
                textAlign: 'center'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && onTaskIdChange && inputId.trim()) {
                  onTaskIdChange(inputId.trim())
                  setInputId('')
                }
              }}
            />
            <button
              onClick={() => {
                if (onTaskIdChange) {
                  onTaskIdChange(inputId)
                  setInputId('')
                }
              }}
              className="action-button primary"
              style={{ marginLeft: '1rem' }}
            >
              Charger la tâche
            </button>
          </div>
          
          <Link to="/tasks/list" className="action-button primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    )
  }

  const handleStatusChange = (newStatus: Task['status']) => {
    if (onStatusChange) {
      onStatusChange(newStatus)
    }
  }

  const handleDelete = () => {
    if (onDelete && window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      onDelete()
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return `En retard de ${Math.abs(diffDays)} jour(s)`
    if (diffDays === 0) return 'Échéance aujourd\'hui'
    if (diffDays === 1) return 'Échéance demain'
    return `${diffDays} jour(s) restant(s)`
  }

  const getNextStatusAction = () => {
    switch (task.status) {
      case 'pending': return { status: 'in-progress' as const, label: 'Commencer la tâche', variant: 'primary' }
      case 'in-progress': return { status: 'completed' as const, label: 'Marquer comme terminée', variant: 'success' }
      case 'completed': return { status: 'in-progress' as const, label: 'Reprendre la tâche', variant: 'warning' }
      default: return null
    }
  }

  const nextAction = getNextStatusAction()

  return (
    <div className="task-details-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Accueil</Link>
        <span>›</span>
        <Link to="/tasks">Tâches</Link>
        <span>›</span>
        <Link to="/tasks/list">Liste</Link>
        <span>›</span>
        <span>{task.title}</span>
      </div>

      <div className="task-details-card">
        {/* En-tête de la tâche */}
        <div className="task-header">
          <h1 className="task-title-main">{task.title}</h1>
          
          <div className="task-meta-badges">
            <span className={`task-badge priority ${task.priority}`}>
              Priorité {getPriorityLabel(task.priority)}
            </span>
            <span className={`task-badge status ${task.status}`}>
              {getStatusLabel(task.status)}
            </span>
            <span className="task-badge category">
              {task.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="task-description-section">
          <h2 className="section-title">Description</h2>
          <div className="task-description-full">
            {task.description}
          </div>
        </div>

        {/* Détails de la tâche */}
        <div className="task-details-grid">
          <div className="detail-item">
            <div className="detail-label">Date de création</div>
            <div className="detail-value">{formatDate(task.createdAt)}</div>
          </div>

          {task.dueDate && (
            <div className="detail-item">
              <div className="detail-label">Date d'échéance</div>
              <div className="detail-value">
                {formatDate(task.dueDate)}
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  marginTop: '0.3rem' 
                }}>
                  {getDaysUntilDue(task.dueDate)}
                </div>
              </div>
            </div>
          )}

          <div className="detail-item">
            <div className="detail-label">Identifiant</div>
            <div className="detail-value">#{task.id}</div>
          </div>

          <div className="detail-item">
            <div className="detail-label">Dernière modification</div>
            <div className="detail-value">{formatDateShort(task.createdAt)}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="task-actions-section">
          {nextAction && (
            <button
              className={`action-button ${nextAction.variant}`}
              onClick={() => handleStatusChange(nextAction.status)}
            >
              {nextAction.label}
            </button>
          )}

          <button 
            className="action-button primary"
            onClick={() => console.log('Modifier la tâche')}
          >
            Modifier la tâche
          </button>

          <Link 
            to="/tasks/list"
            className="action-button secondary"
          >
            Retour à la liste
          </Link>

          <button
            className="action-button danger"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}