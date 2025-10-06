import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

// Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  getAuthHeaders: () => { Authorization: string } | {}
}

// Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { token: string; user: User } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_CHECK_TOKEN'; payload: { token: string; user: User } | null }

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        error: action.payload
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        error: null
      }
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    case 'AUTH_CHECK_TOKEN':
      if (action.payload) {
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user,
          loading: false
        }
      }
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false
      }
    default:
      return state
  }
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true, // Commencer en loading pour vérifier le token
  error: null
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Utilitaires
const TOKEN_KEY = 'auth_token'

const setTokenStorage = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const getTokenStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

const removeTokenStorage = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const decodeToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    
    // Vérifier l'expiration
    if (payload.exp && payload.exp < currentTime) {
      return null
    }
    
    return { email: payload.sub }
  } catch {
    return null
  }
}

// Provider
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Vérification initiale du token au démarrage
  useEffect(() => {
    const checkInitialAuth = () => {
      const token = getTokenStorage()
      
      if (token) {
        const user = decodeToken(token)
        if (user) {
          dispatch({
            type: 'AUTH_CHECK_TOKEN',
            payload: { token, user }
          })
        } else {
          // Token expiré ou invalide
          removeTokenStorage()
          dispatch({ type: 'AUTH_CHECK_TOKEN', payload: null })
        }
      } else {
        dispatch({ type: 'AUTH_CHECK_TOKEN', payload: null })
      }
    }

    checkInitialAuth()
  }, [])

  // Vérification périodique du token
  useEffect(() => {
    if (!state.isAuthenticated || !state.token) return

    const checkTokenValidity = () => {
      const user = decodeToken(state.token!)
      if (!user) {
        // Token expiré, déconnecter automatiquement
        logout()
      }
    }

    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkTokenValidity, 30000)
    
    return () => clearInterval(interval)
  }, [state.isAuthenticated, state.token])

  // Actions
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' })
    
    try {
      const response = await axios.post(`${API_URL}/login`, credentials)
      const { token } = response.data
      
      const user = decodeToken(token)
      if (!user) {
        throw new Error('Token invalide reçu du serveur')
      }
      
      setTokenStorage(token)
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { token, user }
      })
    } catch (error) {
      let errorMessage = 'Erreur de connexion au serveur'
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Email ou mot de passe incorrect'
        }
      }
      
      dispatch({
        type: 'AUTH_FAILURE',
        payload: errorMessage
      })
      
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    removeTokenStorage()
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  const clearError = () => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' })
  }

  const getAuthHeaders = () => {
    return state.token ? { Authorization: `Bearer ${state.token}` } : {}
  }

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    getAuthHeaders
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personnalisé
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}