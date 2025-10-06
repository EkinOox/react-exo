// GUIDE D'UTILISATION DU SYSTÈME D'ERREURS
// =====================================

// 1. IMPORT DU HOOK
import { useErrorHandler } from '../hooks/useErrorHandler'

// 2. DANS LE COMPOSANT
export function ExampleComponent() {
  const { 
    // Erreurs spécifiques par type
    authError,           // Erreurs d'authentification
    taskError,           // Erreurs liées aux tâches
    networkError,        // Erreurs réseau
    validationError,     // Erreurs de validation
    permissionError,     // Erreurs de permission
    notFoundError,       // Erreurs 404
    
    // Erreur personnalisée
    customError,
    
    // Gestion automatique des erreurs API
    handleApiError,
    
    // Nettoyage
    clearErrors
  } = useErrorHandler()

  // 3. EXEMPLES D'UTILISATION

  // === ERREURS D'AUTHENTIFICATION ===
  const handleLogin = async () => {
    try {
      // tentative de connexion...
    } catch (error) {
      // Gestion automatique basée sur le code de réponse
      handleApiError(error, 'LoginComponent')
      
      // OU gestion manuelle spécifique
      authError('login_failed', 'LoginComponent')
    }
  }

  // === ERREURS DE TÂCHES ===
  const handleTaskUpdate = async () => {
    try {
      // mise à jour de tâche...
    } catch (error) {
      // Erreur spécifique de tâche
      taskError('update_failed', 'TaskComponent')
      
      // OU gestion automatique
      handleApiError(error, 'TaskComponent')
    }
  }

  // === ERREURS DE VALIDATION ===
  const handleFormSubmit = (formData) => {
    if (!formData.title) {
      validationError('required_field', 'TaskForm')
      return
    }
    
    if (!formData.email.includes('@')) {
      validationError('invalid_email', 'TaskForm')
      return
    }
  }

  // === ERREURS PERSONNALISÉES ===
  const handleCustomAction = () => {
    try {
      // action personnalisée...
    } catch (error) {
      customError('task', 'Une erreur spécifique est survenue', 'CustomComponent')
    }
  }

  // === ERREURS RÉSEAU ===
  const handleNetworkRequest = async () => {
    try {
      // requête réseau...
    } catch (error) {
      if (error.code === 'NETWORK_ERROR') {
        networkError('connection_failed', 'NetworkComponent')
      } else {
        networkError('server_error', 'NetworkComponent')
      }
    }
  }

  // === GESTION AUTOMATIQUE RECOMMANDÉE ===
  const handleApiCall = async () => {
    try {
      const response = await api.get('/data')
      return response.data
    } catch (error) {
      // Cette méthode gère automatiquement :
      // - 401: erreur d'authentification
      // - 403: erreur de permission
      // - 404: ressource non trouvée
      // - 500+: erreur serveur
      // - Network Error: erreur de connexion
      handleApiError(error, 'ApiComponent')
      throw error // Re-throw si nécessaire pour la logique locale
    }
  }

  // === NETTOYAGE DES ERREURS ===
  useEffect(() => {
    // Nettoyer les erreurs au montage du composant
    clearErrors()
  }, [clearErrors])

  return (
    <div>
      {/* Le contenu du composant */}
      {/* Les erreurs s'affichent automatiquement via ErrorDisplay */}
    </div>
  )
}

// 4. TYPES D'ERREURS DISPONIBLES ET LEURS ACTIONS

/*
AUTH:
- login_failed: "Email ou mot de passe incorrect"
- token_expired: "Votre session a expiré, veuillez vous reconnecter"
- unauthorized: "Vous devez être connecté pour accéder à cette page"
- network_error: "Erreur de connexion au serveur d'authentification"

TASK:
- load_failed: "Impossible de charger les tâches"
- update_failed: "Erreur lors de la mise à jour de la tâche"
- delete_failed: "Impossible de supprimer la tâche"
- create_failed: "Erreur lors de la création de la tâche"
- not_found: "Tâche non trouvée"
- validation_title: "Le titre de la tâche ne peut pas être vide"
- unauthorized_update: "Vous n'avez pas les droits pour modifier cette tâche"
- unauthorized_delete: "Vous n'avez pas les droits pour supprimer cette tâche"

NETWORK:
- connection_failed: "Erreur de connexion réseau"
- server_error: "Erreur serveur, veuillez réessayer plus tard"
- timeout: "La requête a pris trop de temps, veuillez réessayer"

VALIDATION:
- required_field: "Ce champ est obligatoire"
- invalid_email: "Format d'email invalide"
- password_too_short: "Le mot de passe doit contenir au moins 6 caractères"
- invalid_format: "Format de données invalide"

PERMISSION:
- access_denied: "Accès refusé"
- insufficient_rights: "Droits insuffisants pour cette action"

NOT-FOUND:
- page_not_found: "Page non trouvée"
- resource_not_found: "Ressource non trouvée"
*/

// 5. AVANTAGES DU SYSTÈME

/*
? Centralisation des erreurs
? Messages cohérents dans toute l'application
? Gestion automatique des erreurs API
? Affichage uniforme avec glassmorphism
? Auto-suppression des erreurs non critiques
? TypeScript pour la sécurité des types
? Facilité d'utilisation avec des helpers spécifiques
? Extensibilité pour ajouter de nouveaux types d'erreurs
*/