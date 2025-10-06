
import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

export function NotFound() {
  return (
    <div className='not-found'>
      <div className='not-found-card'>
        <div className='error-code'>404</div>
        <h2>Page Introuvable</h2>
        <p>Oops ! Il semblerait que cette page se soit perdue dans l'espace numérique. Ne vous inquiétez pas, nous allons vous ramener en sécurité.</p>
        <div className='not-found-actions'>
          <Link to="/" className='glass-link-404 primary'>Retour à l'accueil</Link>
          <Link to="/tasks" className='glass-link-404 secondary'>Voir mes tâches</Link>
        </div>
      </div>
    </div>
  )
}
