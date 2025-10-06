// GUIDE D'UTILISATION DU SYST�ME D'ERREURS
// =====================================

// 1. IMPORT DU HOOK
import { useErrorHandler } from '../hooks/useErrorHandler'

// 2. DANS LE COMPOSANT
export function ExampleComponent() {
  const { 
    // Erreurs sp�cifiques par type
    authError,           // Erreurs d'authentification
    taskError,           // Erreurs li�es aux t�ches
    networkError,        // Erreurs r�seau
    validationError,     // Erreurs de validation
    permissionError,     // Erreurs de permission
    notFoundError,       // Erreurs 404
    
    // Erreur personnalis�e
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
      // Gestion automatique bas�e sur le code de r�ponse
      handleApiError(error, 'LoginComponent')
      
      // OU gestion manuelle sp�cifique
      authError('login_failed', 'LoginComponent')
    }
  }

  // === ERREURS DE T�CHES ===
  const handleTaskUpdate = async () => {
    try {
      // mise � jour de t�che...
    } catch (error) {
      // Erreur sp�cifique de t�che
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

  // === ERREURS PERSONNALIS�ES ===
  const handleCustomAction = () => {
    try {
      // action personnalis�e...
    } catch (error) {
      customError('task', 'Une erreur sp�cifique est survenue', 'CustomComponent')
    }
  }

  // === ERREURS R�SEAU ===
  const handleNetworkRequest = async () => {
    try {
      // requ�te r�seau...
    } catch (error) {
      if (error.code === 'NETWORK_ERROR') {
        networkError('connection_failed', 'NetworkComponent')
      } else {
        networkError('server_error', 'NetworkComponent')
      }
    }
  }

  // === GESTION AUTOMATIQUE RECOMMAND�E ===
  const handleApiCall = async () => {
    try {
      const response = await api.get('/data')
      return response.data
    } catch (error) {
      // Cette m�thode g�re automatiquement :
      // - 401: erreur d'authentification
      // - 403: erreur de permission
      // - 404: ressource non trouv�e
      // - 500+: erreur serveur
      // - Network Error: erreur de connexion
      handleApiError(error, 'ApiComponent')
      throw error // Re-throw si n�cessaire pour la logique locale
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
- token_expired: "Votre session a expir�, veuillez vous reconnecter"
- unauthorized: "Vous devez �tre connect� pour acc�der � cette page"
- network_error: "Erreur de connexion au serveur d'authentification"

TASK:
- load_failed: "Impossible de charger les t�ches"
- update_failed: "Erreur lors de la mise � jour de la t�che"
- delete_failed: "Impossible de supprimer la t�che"
- create_failed: "Erreur lors de la cr�ation de la t�che"
- not_found: "T�che non trouv�e"
- validation_title: "Le titre de la t�che ne peut pas �tre vide"
- unauthorized_update: "Vous n'avez pas les droits pour modifier cette t�che"
- unauthorized_delete: "Vous n'avez pas les droits pour supprimer cette t�che"

NETWORK:
- connection_failed: "Erreur de connexion r�seau"
- server_error: "Erreur serveur, veuillez r�essayer plus tard"
- timeout: "La requ�te a pris trop de temps, veuillez r�essayer"

VALIDATION:
- required_field: "Ce champ est obligatoire"
- invalid_email: "Format d'email invalide"
- password_too_short: "Le mot de passe doit contenir au moins 6 caract�res"
- invalid_format: "Format de donn�es invalide"

PERMISSION:
- access_denied: "Acc�s refus�"
- insufficient_rights: "Droits insuffisants pour cette action"

NOT-FOUND:
- page_not_found: "Page non trouv�e"
- resource_not_found: "Ressource non trouv�e"
*/

// 5. AVANTAGES DU SYST�ME

/*
? Centralisation des erreurs
? Messages coh�rents dans toute l'application
? Gestion automatique des erreurs API
? Affichage uniforme avec glassmorphism
? Auto-suppression des erreurs non critiques
? TypeScript pour la s�curit� des types
? Facilit� d'utilisation avec des helpers sp�cifiques
? Extensibilit� pour ajouter de nouveaux types d'erreurs
*/