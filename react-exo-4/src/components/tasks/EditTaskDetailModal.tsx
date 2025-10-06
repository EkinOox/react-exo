import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { taskService, type Task } from '../../services/taskService'
import '../../styles/EditTaskDetailModal.css'

interface EditTaskDetailModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onTaskUpdated: (updatedTask: Task) => void
}

export function EditTaskDetailModal({ 
  task, 
  isOpen, 
  onClose, 
  onTaskUpdated 
}: EditTaskDetailModalProps) {
  const { getAuthHeaders } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'pending' as Task['status'],
    category: '',
    dueDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialiser le formulaire avec les données de la tâche
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        category: task.category,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      })
    }
  }, [task])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const authHeaders = getAuthHeaders()
      
      // Préparer les données pour l'API
      const updateData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        completed: formData.status === 'completed',
        category: formData.category,
        dueDate: formData.dueDate || undefined
      }

      await taskService.updateTask(task.id, updateData, authHeaders)
      
      // Créer la tâche mise à jour pour l'affichage local
      const updatedTask: Task = {
        ...task,
        ...formData,
        dueDate: formData.dueDate || undefined
      }
      
      onTaskUpdated(updatedTask)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
      console.error('Erreur lors de la mise à jour:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modifier la tâche</h2>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-task-form">
          <div className="form-group">
            <label htmlFor="edit-title">Titre de la tâche</label>
            <input
              id="edit-title"
              type="text"
              value={formData.title}
              onChange={handleChange('title')}
              required
              disabled={loading}
              placeholder="Titre de votre tâche"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={formData.description}
              onChange={handleChange('description')}
              disabled={loading}
              placeholder="Description détaillée de la tâche"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-priority">Priorité</label>
              <select
                id="edit-priority"
                value={formData.priority}
                onChange={handleChange('priority')}
                disabled={loading}
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-status">Statut</label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={handleChange('status')}
                disabled={loading}
              >
                <option value="pending">En attente</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminée</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-category">Catégorie</label>
              <input
                id="edit-category"
                type="text"
                value={formData.category}
                onChange={handleChange('category')}
                disabled={loading}
                placeholder="Catégorie de la tâche"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-dueDate">Date d'échéance</label>
              <input
                id="edit-dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange('dueDate')}
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              ?? {error}
            </div>
          )}

          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={loading}
            >
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}