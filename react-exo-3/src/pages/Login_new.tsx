import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth, type LoginCredentials } from '../context/AuthContext'
import './Login.css'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, loading: authLoading, error: authError, clearError } = useAuth()
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  // Rediriger si d�j� connect�
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const from = (location.state as any)?.from?.pathname || '/tasks/list'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate, location])

  // Nettoyer les erreurs au montage
  useEffect(() => {
    clearError()
  }, [clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(credentials)
      // La redirection sera g�r�e par l'useEffect ci-dessus
    } catch (err) {
      // L'erreur est d�j� g�r�e par le Context
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  // Afficher un loading si on v�rifie l'authentification
  if (authLoading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'rgba(255, 255, 255, 0.8)' 
          }}>
            <h2>V�rification...</h2>
            <p>V�rification de votre session</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Connexion</h1>
          <p>Connectez-vous pour g�rer vos t�ches</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={handleChange('email')}
              placeholder="student@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={handleChange('password')}
              placeholder="Votre mot de passe"
              required
              disabled={loading}
            />
          </div>

          {authError && (
            <div className="error-message">
              {authError}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-demo">
          <p>Informations de d�monstration :</p>
          <p><strong>Email :</strong> student@example.com</p>
          <p><strong>Mot de passe :</strong> password</p>
        </div>
      </div>
    </div>
  )
}