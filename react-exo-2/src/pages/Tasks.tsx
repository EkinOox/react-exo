import { Link } from 'react-router-dom'
import '../styles/Tasks.css'

export function TasksLayout() {
  return (
    <div className='tasks-layout'>
      <div className='tasks-card'>
        <h2>Mes Tâches</h2>
        <p>Gérez vos tâches avec élégance dans cette interface moderne. Organisez votre productivité avec style !</p>
                <div className='tasks-actions'>
          <Link to="/tasks/new" className='glass-button primary'>Créer une tâche</Link>
          <Link to="/tasks/list" className='glass-button secondary'>Voir toutes les tâches</Link>
        </div>
      </div>
    </div>
  )
}
