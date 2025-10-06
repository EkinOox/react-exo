import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TaskDetails } from '../components/tasks/TasksDetails'
import type { Task } from '../components/tasks/TasksList'

// Données de démonstration - même que dans TasksList
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Développer l\'interface utilisateur',
    description: 'Créer les composants React avec le design glassmorphism pour améliorer l\'expérience utilisateur. Cette tâche implique la création de composants réutilisables, l\'implémentation d\'animations fluides et l\'optimisation pour différentes tailles d\'écran.',
    priority: 'high',
    status: 'in-progress',
    category: 'développement',
    createdAt: '2024-01-15',
    dueDate: '2024-02-01'
  },
  {
    id: '2',
    title: 'Rédiger la documentation',
    description: 'Documenter l\'API et les composants pour faciliter la maintenance future. Inclure des exemples d\'utilisation, des guides de contribution et des bonnes pratiques pour les développeurs.',
    priority: 'medium',
    status: 'pending',
    category: 'documentation',
    createdAt: '2024-01-10',
    dueDate: '2024-01-25'
  },
  {
    id: '3',
    title: 'Optimiser les performances',
    description: 'Analyser et améliorer les temps de chargement de l\'application. Mettre en place le lazy loading, optimiser les bundles et implémenter des stratégies de cache efficaces.',
    priority: 'high',
    status: 'completed',
    category: 'développement',
    createdAt: '2024-01-05',
    dueDate: '2024-01-20'
  },
  {
    id: '4',
    title: 'Tests unitaires',
    description: 'écrire des tests pour assurer la qualité du code et éviter les régressions. Couvrir les composants principaux, les utilitaires et les hooks personnalisés.',
    priority: 'medium',
    status: 'pending',
    category: 'qualité',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Déploiement production',
    description: 'Configurer le pipeline de déploiement automatique vers l\'environnement de production. Inclure les tests automatisés, la validation de sécurité et le monitoring.',
    priority: 'low',
    status: 'pending',
    category: 'devops',
    createdAt: '2024-01-08'
  }
]

export function TaskDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Récupérer seulement l'ID depuis les paramètres de requête
  const id = searchParams.get('id')

  useEffect(() => {
    // Simuler un appel API
    const fetchTask = () => {
      setLoading(true)
      
      // Simule un délai d'API
      setTimeout(() => {
        const foundTask = mockTasks.find(t => t.id === id)
        setTask(foundTask || null)
        setLoading(false)
      }, 300)
    }

    if (id) {
      fetchTask()
    } else {
      setLoading(false)
    }
  }, [id])

  const handleStatusChange = (newStatus: Task['status']) => {
    if (task) {
      const updatedTask = { ...task, status: newStatus }
      setTask(updatedTask)
      console.log('Statut mis à jour:', newStatus)
    }
  }

  const handleDelete = () => {
    console.log('Tâche supprimée:', task?.id)
    navigate('/tasks/list')
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

  return (
    <TaskDetails
      task={task}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      onTaskIdChange={handleTaskIdChange}
    />
  )
}