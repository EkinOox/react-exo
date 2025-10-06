import { useState } from 'react'
import type { Task } from '../../services/taskService'
import './DeleteTaskModal.css'

interface DeleteTaskModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (taskId: string) => Promise<void>
}

export function DeleteTaskModal({ task, isOpen, onClose, onConfirm }: DeleteTaskModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!task) return

    setLoading(true)
    setError(null)

    try {
      await onConfirm(task.id)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setError(null)
    onClose()
  }

  if (!isOpen || !task) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-header">
          <h2>Confirmer la suppression</h2>
        </div>

        <div className="delete-modal-body">
          <div className="warning-icon">⚠️</div>
          <p>
            êtes-vous sûr de vouloir supprimer la tche
            <strong> "{task.title}" </strong> ?
          </p>
          <p className="warning-text">
            Cette action est irréversible.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        <div className="delete-modal-actions">
          <button
            type="button"
            onClick={handleClose}
            className="cancel-button"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="delete-button"
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  )
}