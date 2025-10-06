import type { ReactNode } from 'react'
import '../../styles/Alert.css'

export interface AlertProps {
  type?: 'error' | 'warning' | 'success' | 'info'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

export function Alert({ 
  type = 'error', 
  title, 
  children, 
  onClose, 
  className = '' 
}: AlertProps) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '??'
      case 'warning':
        return '??'
      case 'success':
        return '?'
      case 'info':
        return '??'
      default:
        return '??'
    }
  }

  return (
    <div className={`alert alert-${type} ${className}`}>
      <div className="alert-content">
        <div className="alert-icon">
          {getIcon()}
        </div>
        <div className="alert-text">
          {title && <div className="alert-title">{title}</div>}
          <div className="alert-message">{children}</div>
        </div>
        {onClose && (
          <button 
            className="alert-close" 
            onClick={onClose}
            aria-label="Fermer l'alerte"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}