import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import './AuthStatus.css'

export function AuthStatus() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      
      if (authenticated) {
        const token = authService.getToken()
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            setUserEmail(payload.sub)
          } catch (error) {
            setUserEmail(null)
          }
        }
      } else {
        setUserEmail(null)
      }
    }

    checkAuth()

    // Vérifier le statut d'authentification périodiquement
    const interval = setInterval(checkAuth, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUserEmail(null)
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
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
        Connecté en tant que <strong>{userEmail}</strong>
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