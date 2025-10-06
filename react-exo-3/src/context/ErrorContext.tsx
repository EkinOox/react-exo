import { createContext, useContext, useReducer, useCallback } from 'react'
import type { ReactNode } from 'react'

// Types d'erreurs par composant/page
export interface ErrorType {
  id: string
  type: 'auth' | 'task' | 'network' | 'validation' | 'permission' | 'not-found'
  message: string
  component?: string
  timestamp: number
  action?: string
}

interface ErrorState {
  errors: ErrorType[]
  isVisible: boolean
}

type ErrorAction =
  | { type: 'ADD_ERROR'; payload: Omit<ErrorType, 'id' | 'timestamp'> }
  | { type: 'REMOVE_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_VISIBILITY'; payload: boolean }

// Messages d'erreur pr�d�finis par type et composant
export const ERROR_MESSAGES = {
  auth: {
    login_failed: 'Email ou mot de passe incorrect',
    token_expired: 'Votre session a expir�, veuillez vous reconnecter',
    unauthorized: 'Vous devez �tre connect� pour acc�der � cette page',
    network_error: 'Erreur de connexion au serveur d\'authentification'
  },
  task: {
    load_failed: 'Impossible de charger les t�ches',
    update_failed: 'Erreur lors de la mise � jour de la t�che',
    delete_failed: 'Impossible de supprimer la t�che',
    create_failed: 'Erreur lors de la cr�ation de la t�che',
    not_found: 'T�che non trouv�e',
    validation_title: 'Le titre de la t�che ne peut pas �tre vide',
    unauthorized_update: 'Vous n\'avez pas les droits pour modifier cette t�che',
    unauthorized_delete: 'Vous n\'avez pas les droits pour supprimer cette t�che'
  },
  network: {
    connection_failed: 'Erreur de connexion r�seau',
    server_error: 'Erreur serveur, veuillez r�essayer plus tard',
    timeout: 'La requ�te a pris trop de temps, veuillez r�essayer'
  },
  validation: {
    required_field: 'Ce champ est obligatoire',
    invalid_email: 'Format d\'email invalide',
    password_too_short: 'Le mot de passe doit contenir au moins 6 caract�res',
    invalid_format: 'Format de donn�es invalide'
  },
  permission: {
    access_denied: 'Acc�s refus�',
    insufficient_rights: 'Droits insuffisants pour cette action'
  },
  'not-found': {
    page_not_found: 'Page non trouv�e',
    resource_not_found: 'Ressource non trouv�e'
  }
}

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case 'ADD_ERROR': {
      const newError: ErrorType = {
        ...action.payload,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: Date.now()
      }
      return {
        ...state,
        errors: [...state.errors, newError],
        isVisible: true
      }
    }

    case 'REMOVE_ERROR': {
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload)
      }
    }

    case 'CLEAR_ERRORS': {
      return {
        ...state,
        errors: [],
        isVisible: false
      }
    }

    case 'SET_VISIBILITY': {
      return {
        ...state,
        isVisible: action.payload
      }
    }

    default:
      return state
  }
}

interface ErrorContextType {
  errors: ErrorType[]
  isVisible: boolean
  addError: (type: keyof typeof ERROR_MESSAGES, action: string, component?: string, customMessage?: string) => void
  removeError: (id: string) => void
  clearErrors: () => void
  setVisibility: (visible: boolean) => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(errorReducer, {
    errors: [],
    isVisible: false
  })

  const addError = useCallback((
    type: keyof typeof ERROR_MESSAGES, 
    action: string, 
    component?: string, 
    customMessage?: string
  ) => {
    const messageMap = ERROR_MESSAGES[type] as Record<string, string>
    const message = customMessage || messageMap[action] || `Erreur ${type}: ${action}`
    
    dispatch({
      type: 'ADD_ERROR',
      payload: {
        type,
        message,
        component,
        action
      }
    })
  }, [])

  const removeError = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ERROR', payload: id })
  }, [])

  const clearErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }, [])

  const setVisibility = useCallback((visible: boolean) => {
    dispatch({ type: 'SET_VISIBILITY', payload: visible })
  }, [])

  return (
    <ErrorContext.Provider value={{
      errors: state.errors,
      isVisible: state.isVisible,
      addError,
      removeError,
      clearErrors,
      setVisibility
    }}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useError() {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}