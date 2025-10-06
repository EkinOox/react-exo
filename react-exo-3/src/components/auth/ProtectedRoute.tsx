import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Afficher un loading pendant la vérification initiale
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Vérification de l'authentification...
      </div>
    )
  }

  if (!isAuthenticated) {
    // Rediriger vers la page de login en sauvegardant la page demandée
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}