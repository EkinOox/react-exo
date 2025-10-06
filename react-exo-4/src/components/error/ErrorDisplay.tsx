import { useEffect } from 'react'
import { useError } from '../../context/ErrorContext'
import { Alert } from '../ui/Alert'
import '../../styles/ErrorDisplay.css'

export function ErrorDisplay() {
  const { errors, isVisible, removeError, setVisibility } = useError()

  // Auto-masquer les erreurs après 5 secondes (sauf les erreurs critiques)
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        // Ne pas auto-masquer les erreurs d'auth ou de permission
        const nonCriticalErrors = errors.filter(
          error => !['auth', 'permission'].includes(error.type)
        )
        
        if (nonCriticalErrors.length > 0) {
          nonCriticalErrors.forEach(error => removeError(error.id))
        }
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errors, removeError])

  // Masquer le container si pas d'erreurs
  useEffect(() => {
    if (errors.length === 0) {
      setVisibility(false)
    }
  }, [errors.length, setVisibility])

  if (!isVisible || errors.length === 0) {
    return null
  }

  const getAlertType = (errorType: string) => {
    switch (errorType) {
      case 'auth':
      case 'permission':
        return 'error' as const
      case 'validation':
        return 'warning' as const
      case 'network':
        return 'error' as const
      default:
        return 'error' as const
    }
  }

  const getTitle = (errorType: string) => {
    switch (errorType) {
      case 'auth':
        return 'Erreur d\'authentification'
      case 'task':
        return 'Erreur de tâche'
      case 'network':
        return 'Erreur réseau'
      case 'validation':
        return 'Erreur de validation'
      case 'permission':
        return 'Erreur de permission'
      case 'not-found':
        return 'Ressource non trouvée'
      default:
        return 'Erreur'
    }
  }

  return (
    <div className="error-display">
      {errors.map(error => (
        <Alert
          key={error.id}
          type={getAlertType(error.type)}
          title={getTitle(error.type)}
          onClose={() => removeError(error.id)}
          className="error-alert"
        >
          <div className="error-content">
            <p>{error.message}</p>
            {error.component && (
              <small className="error-component">
                Composant: {error.component}
              </small>
            )}
            {error.action && (
              <small className="error-action">
                Action: {error.action}
              </small>
            )}
          </div>
        </Alert>
      ))}
    </div>
  )
}