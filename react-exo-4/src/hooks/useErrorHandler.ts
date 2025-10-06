import { useCallback } from 'react'
import { useError, ERROR_MESSAGES } from '../context/ErrorContext'

type ErrorTypes = keyof typeof ERROR_MESSAGES
type ErrorActions<T extends ErrorTypes> = keyof typeof ERROR_MESSAGES[T]

export function useErrorHandler() {
  const { addError, clearErrors } = useError()

  // Helpers pour chaque type d'erreur
  const authError = useCallback((action: ErrorActions<'auth'>, component?: string) => {
    addError('auth', action as string, component)
  }, [addError])

  const taskError = useCallback((action: ErrorActions<'task'>, component?: string) => {
    addError('task', action as string, component)
  }, [addError])

  const networkError = useCallback((action: ErrorActions<'network'>, component?: string) => {
    addError('network', action as string, component)
  }, [addError])

  const validationError = useCallback((action: ErrorActions<'validation'>, component?: string) => {
    addError('validation', action as string, component)
  }, [addError])

  const permissionError = useCallback((action: ErrorActions<'permission'>, component?: string) => {
    addError('permission', action as string, component)
  }, [addError])

  const notFoundError = useCallback((action: ErrorActions<'not-found'>, component?: string) => {
    addError('not-found', action as string, component)
  }, [addError])

  // Helper générique avec message personnalisé
  const customError = useCallback((
    type: ErrorTypes, 
    customMessage: string, 
    component?: string
  ) => {
    addError(type, 'custom', component, customMessage)
  }, [addError])

  // Helper pour gérer les erreurs d'API automatiquement
  const handleApiError = useCallback((error: unknown, component?: string) => {
    const apiError = error as { response?: { status?: number }, code?: string, message?: string }
    
    if (apiError?.response?.status === 401) {
      authError('unauthorized', component)
    } else if (apiError?.response?.status === 403) {
      permissionError('access_denied', component)
    } else if (apiError?.response?.status === 404) {
      notFoundError('resource_not_found', component)
    } else if (apiError?.response?.status && apiError.response.status >= 500) {
      networkError('server_error', component)
    } else if (apiError?.code === 'NETWORK_ERROR' || apiError?.message?.includes('Network Error')) {
      networkError('connection_failed', component)
    } else {
      customError('network', apiError?.message || 'Une erreur est survenue', component)
    }
  }, [authError, permissionError, notFoundError, networkError, customError])

  return {
    // Helpers spécifiques
    authError,
    taskError,
    networkError,
    validationError,
    permissionError,
    notFoundError,
    
    // Helper générique
    customError,
    
    // Helper pour API
    handleApiError,
    
    // Utilitaires
    clearErrors
  }
}