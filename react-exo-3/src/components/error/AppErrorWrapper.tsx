import type { ReactNode } from 'react'
import { ErrorProvider } from '../../context/ErrorContext'
import { ErrorBoundary } from './ErrorBoundary'
import { ErrorDisplay } from './ErrorDisplay'

interface AppErrorWrapperProps {
  children: ReactNode
}

export function AppErrorWrapper({ children }: AppErrorWrapperProps) {
  const handleError = (error: Error) => {
    // Ici on pourrait envoyer l'erreur à un service de monitoring
    console.error('Application Error:', error)
  }

  return (
    <ErrorProvider>
      <ErrorBoundary onError={handleError}>
        <div className="app-error-wrapper">
          {children}
          <ErrorDisplay />
        </div>
      </ErrorBoundary>
    </ErrorProvider>
  )
}