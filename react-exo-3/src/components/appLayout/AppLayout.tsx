import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthStatus } from '../auth/AuthStatus'
import '../../styles/AppLayout.css'

export function AppLayout() {
  const navigate = useNavigate()
  const [taskId, setTaskId] = useState('')
  const [debouncedTaskId, setDebouncedTaskId] = useState('')

  // Debounce pour éviter trop d'appels lors de la frappe
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTaskId(taskId)
    }, 500) // 500ms de délai pour le header (un peu plus long)

    return () => clearTimeout(timer)
  }, [taskId])

  // Effectuer la navigation quand le debounced value change
  useEffect(() => {
    if (debouncedTaskId.trim() && /^\d+$/.test(debouncedTaskId.trim())) {
      navigate(`/tasks/detail?id=${debouncedTaskId.trim()}`)
      // Vider l'input après la navigation
      setTaskId('')
    }
  }, [debouncedTaskId, navigate])

  return (
    <div className="app-layout">
      <header className="glass-header">
        <Link to="/" className="logo">React Cours</Link>
        
        {/* Input de navigation rapide vers les tâches */}
        <div className="quick-task-nav">
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            placeholder="ID tâche (1-5)"
            className="quick-task-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && taskId.trim()) {
                navigate(`/tasks/detail?id=${taskId.trim()}`)
                setTaskId('')
              }
            }}
          />
        </div>
        
        <nav className="glass-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `glass-nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => `glass-nav-link ${isActive ? 'active' : ''}`}
          >
            Tâches
          </NavLink>
        </nav>
        
        {/* Composant de statut d'authentification */}
        <AuthStatus />
      </header>
      <main className="glass-main">
        <Outlet />
      </main>
      <footer className="glass-footer">
        © React Cours 2024
      </footer>
    </div>
  )
}