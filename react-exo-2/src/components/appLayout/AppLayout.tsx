import { Link, NavLink, Outlet } from 'react-router-dom'
import '../../styles/AppLayout.css'

export function AppLayout() {
  return (
    <div className="app-layout">
      <header className="glass-header">
        <Link to="/" className="logo">React Cours</Link>
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