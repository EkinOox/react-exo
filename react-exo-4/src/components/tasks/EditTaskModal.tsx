import { useState } from 'react'
import type { Task } from '../../services/taskService'
import '../../styles/EditTaskModal.css'

interface EditTaskModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onSave: (taskId: string, updates: Partial<Task>) => Promise<void>
}

export function EditTaskModal({ task, isOpen, onClose, onSave }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [category, setCategory] = useState(task.category)
  const [dueDate, setDueDate] = useState(task.dueDate || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Le titre ne peut pas être vide')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await onSave(task.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        category: category.trim(),
        dueDate: dueDate || undefined
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la modification')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    // Réinitialiser les valeurs
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority)
    setStatus(task.status)
    setCategory(task.category)
    setDueDate(task.dueDate || '')
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modifier la tâche</h2>
          <button className="close-button" onClick={handleClose}>✖️</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priorité</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className="form-select"
                disabled={loading}
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Task['status'])}
                className="form-select"
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
              <label htmlFor="category">Catégorie</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Date d'échéance</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="cancel-button"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={loading || !title.trim()}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}