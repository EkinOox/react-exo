import axios from 'axios'

const API_URL = 'http://localhost:3001'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token'

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials)
      
      // Sauvegarder le token dans le localStorage
      this.setToken(response.data.token)
      
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Email ou mot de passe incorrect')
      }
      throw new Error('Erreur de connexion au serveur')
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      // Décoder le JWT pour vérifier l'expiration
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      
      if (payload.exp && payload.exp < currentTime) {
        this.logout()
        return false
      }
      
      return true
    } catch (error) {
      this.logout()
      return false
    }
  }

  getAuthHeaders(): { Authorization: string } | {} {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

export const authService = new AuthService()