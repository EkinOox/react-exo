import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Appeler le callback d'erreur si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log l'erreur pour le debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Si un fallback personnalisé est fourni, l'utiliser
      if (this.props.fallback && this.state.error && this.state.errorInfo) {
        return this.props.fallback(this.state.error, this.state.errorInfo)
      }

      // Fallback par défaut
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2>Oups ! Une erreur est survenue</h2>
            <p>Une erreur inattendue s'est produite. Veuillez rafraîchir la page ou réessayer plus tard.</p>
            <details className="error-details">
              <summary>Détails techniques</summary>
              <pre>{this.state.error?.toString()}</pre>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="error-boundary-button"
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}