import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AuthStatus.css'

export function AuthStatus() {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout, loading } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  // Afficher un �tat de chargement pendant la v�rification
  if (loading) {
    return (
      <div className="auth-status">
        <span className="auth-status-text">V�rification...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-status">
        <span className="auth-status-text">Non connect�</span>
        <button 
          className="auth-button login-button"
          onClick={handleLogin}
        >
          Se connecter
        </button>
      </div>
    )
  }

  return (
    <div className="auth-status">
      <span className="auth-status-text">
        Connect� en tant que <strong>{user?.email}</strong>
      </span>
      <button 
        className="auth-button logout-button"
        onClick={handleLogout}
      >
        Se d�connecter
      </button>
    </div>
  )
}