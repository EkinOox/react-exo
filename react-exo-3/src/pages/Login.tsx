import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService, type LoginCredentials } from '../services/authService'
import './Login.css'

export function LoginPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await authService.login(credentials)
      // Rediriger vers la liste des tâches après connexion réussie
      navigate('/tasks/list')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
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

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Connexion</h1>
          <p>Connectez-vous pour gérer vos tâches</p>
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

          {error && (
            <div className="error-message">
              {error}
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
          <p>Informations de démonstration :</p>
          <p><strong>Email :</strong> student@example.com</p>
          <p><strong>Mot de passe :</strong> password</p>
        </div>
      </div>
    </div>
  )
}