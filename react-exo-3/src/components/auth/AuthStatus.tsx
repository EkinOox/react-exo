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

  // Afficher un état de chargement pendant la vérification
  if (loading) {
    return (
      <div className="auth-status">
        <span className="auth-status-text">Vérification...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-status">
        <span className="auth-status-text">Non connecté</span>
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
        Connecté en tant que <strong>{user?.email}</strong>
      </span>
      <button 
        className="auth-button logout-button"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </div>
  )
}