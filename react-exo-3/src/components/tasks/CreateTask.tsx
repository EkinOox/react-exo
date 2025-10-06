import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { taskService } from '../../services/taskService'
import '../../styles/CreateTask.css'

interface CreateTaskProps {
  onTaskCreated?: () => void
}

export function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const { getAuthHeaders } = useAuth()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Le titre ne peut pas être vide')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const authHeaders = getAuthHeaders()
      await taskService.createTask(title.trim(), authHeaders)
      setTitle('')
      setSuccess(true)
      onTaskCreated?.()

      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-task-container">
      <form onSubmit={handleSubmit} className="create-task-form">
        <div className="form-header">
          <h3>Créer une nouvelle tâche</h3>
        </div>
        
        <div className="form-body">
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la tâche..."
              className="task-title-input"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              Tâche créée avec succès !
            </div>
          )}

          <button 
            type="submit" 
            className="create-task-button"
            disabled={loading || !title.trim()}
          >
            {loading ? 'Création...' : 'Créer la tâche'}
          </button>
        </div>
      </form>
    </div>
  )
}