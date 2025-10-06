import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TaskDetails } from '../components/tasks/TasksDetails'
import { taskService, type Task } from '../services/taskService'

export function TaskDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Récupérer seulement l'ID depuis les paramètres de requête
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const apiTask = await taskService.getTaskById(id)
        setTask(apiTask)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la tâche')
        console.error('Erreur lors du chargement de la tâche:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleStatusChange = async (newStatus: Task['status']) => {
    if (!task) return

    try {
      // Mettre à jour localement d'abord
      const updatedTask = { ...task, status: newStatus }
      setTask(updatedTask)

      // Puis appeler l'API
      await taskService.updateTask(task.id, {
        completed: newStatus === 'completed'
      })

      console.log('Statut mis à jour:', newStatus)
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err)
      // Restaurer l'état précédent en cas d'erreur
      setTask(task)
    }
  }

  const handleDelete = async () => {
    if (!task) return

    try {
      await taskService.deleteTask(task.id)
      console.log('Tâche supprimée:', task.id)
      navigate('/tasks/list')
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      setError('Impossible de supprimer la tâche')
    }
  }

  const handleTaskIdChange = (newId: string) => {
    if (newId.trim()) {
      setSearchParams({ id: newId.trim() })
    }
  }

  if (loading) {
    return (
      <div className="task-details-container">
        <div className="task-details-card">
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'rgba(255, 255, 255, 0.8)' 
          }}>
            <h2>Chargement...</h2>
            <p>Récupération des détails de la tâche</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="task-details-container">
        <div className="task-details-card">
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'rgba(255, 100, 100, 0.9)' 
          }}>
            <h2>Erreur</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TaskDetails
      task={task}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      onTaskIdChange={handleTaskIdChange}
    />
  )
}