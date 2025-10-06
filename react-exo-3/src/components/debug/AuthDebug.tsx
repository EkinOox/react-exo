import { useAuth } from '../../context/AuthContext'
import './AuthDebug.css'

export function AuthDebug() {
  const authContext = useAuth()

  return (
    <div className="auth-debug">
      <div className="auth-debug-header">
        <span className="debug-icon">🔍</span>
        <h4>Auth Debug</h4>
      </div>
      
      <div className="debug-section">
        <div className="debug-item">
          <span className="debug-label">Status:</span>
          <span className={`debug-status ${authContext.isAuthenticated ? 'authenticated' : 'not-authenticated'}`}>
            {authContext.isAuthenticated ? '✅ Connecté' : '❌ Déconnecté'}
          </span>
        </div>
        
        <div className="debug-item">
          <span className="debug-label">Loading:</span>
          <span className={`debug-value ${authContext.loading ? 'loading' : ''}`}>
            {authContext.loading ? '⏳ En cours...' : '✅ Prêt'}
          </span>
        </div>
        
        {authContext.error && (
          <div className="debug-item error">
            <span className="debug-label">Erreur:</span>
            <span className="debug-error">{authContext.error}</span>
          </div>
        )}
      </div>

      {authContext.user && (
        <div className="debug-section">
          <div className="debug-section-title">👤 Utilisateur</div>
          <div className="debug-json">
            <pre>{JSON.stringify(authContext.user, null, 2)}</pre>
          </div>
        </div>
      )}
      
      {authContext.token && (
        <>
          <div className="debug-section">
            <div className="debug-section-title">🔑 Token</div>
            <div className="debug-token">
              {authContext.token.substring(0, 30)}...
            </div>
          </div>

          <div className="debug-section">
            <div className="debug-section-title">📋 Headers</div>
            <div className="debug-json">
              <pre>{JSON.stringify(authContext.getAuthHeaders(), null, 2)}</pre>
            </div>
          </div>

          <div className="debug-section">
            <div className="debug-section-title">🔓 Token décodé</div>
            <div className="debug-json">
              <pre>{JSON.stringify(
                JSON.parse(atob(authContext.token.split('.')[1])), 
                null, 2
              )}</pre>
            </div>
          </div>
        </>
      )}
    </div>
  )
}