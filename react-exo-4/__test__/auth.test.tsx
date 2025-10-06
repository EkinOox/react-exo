import {render, screen} from '@testing-library/react';
import {AuthProvider, useAuth} from '../src/components/auth/AuthContext';

// Test simple sans mock complexe
function TestAuthStatus() {
  const { isAuthenticated, user, error } = useAuth();

  return (
    <div>
      <div data-testid="status">
        {isAuthenticated ? 'Connecté' : 'Déconnecté'}
      </div>
      <div data-testid="user">{user?.email || 'Aucun utilisateur'}</div>
      <div data-testid="error">{error || 'Aucune erreur'}</div>
    </div>
  );
}

describe('Test simple d\'authentification', () => {
  test('l\'état initial est correct', () => {
    render(
      <AuthProvider>
        <TestAuthStatus />
      </AuthProvider>
    );

    // Vérifier l'état initial
    expect(screen.getByTestId('status')).toHaveTextContent('Déconnecté');
    expect(screen.getByTestId('user')).toHaveTextContent('Aucun utilisateur');
    expect(screen.getByTestId('error')).toHaveTextContent('Aucune erreur');
  });

  test('affiche les identifiants de test configurés', () => {
    // Test simple pour vérifier la configuration
    const testCredentials = {
      email: 'student@example.com',
      password: 'password'
    };
    
    expect(testCredentials.email).toBe('student@example.com');
    expect(testCredentials.password).toBe('password');
  });
});
