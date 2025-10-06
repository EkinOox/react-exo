import { Link } from 'react-router-dom'
import '../styles/Home.css'

export function Home() {
  return (
    <div className='home'>
      <div className='home-card'>
        <h2>Bienvenue</h2>
        <p>Découvrez une interface moderne avec des effets glassmorphism ! Explorez vos tâches avec style.</p>
        <Link to="/tasks" className='glass-link'>Voir mes tâches</Link>
      </div>
    </div>
  )
}
