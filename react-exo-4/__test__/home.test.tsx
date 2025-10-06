import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home';

// Composant wrapper pour les tests avec Router
function HomeWithRouter() {
  return (
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Test de la page Home', () => {
  test('affiche le contenu principal de la page', () => {
    render(<HomeWithRouter />);

    // Vérifier que le titre principal est affiché
    expect(screen.getByText('Bienvenue')).toBeInTheDocument();
    
    // Vérifier que la description est présente
    expect(screen.getByText(/Découvrez une interface moderne avec des effets glassmorphism/)).toBeInTheDocument();
    
    // Vérifier que le lien vers les tâches existe
    const linkToTasks = screen.getByText('Voir mes tâches');
    expect(linkToTasks).toBeInTheDocument();
  });

  test('le lien vers les tâches a la bonne destination', () => {
    render(<HomeWithRouter />);

    // Vérifier que le lien pointe vers /tasks
    const linkToTasks = screen.getByRole('link', { name: 'Voir mes tâches' });
    expect(linkToTasks).toHaveAttribute('href', '/tasks');
  });

  test('contient les bonnes classes CSS', () => {
    render(<HomeWithRouter />);

    // Vérifier les classes pour le styling glassmorphism
    const homeContainer = document.querySelector('.home');
    expect(homeContainer).toBeInTheDocument();
    
    const homeCard = document.querySelector('.home-card');
    expect(homeCard).toBeInTheDocument();
    
    const glassLink = document.querySelector('.glass-link');
    expect(glassLink).toBeInTheDocument();
  });

  test('structure HTML est correcte', () => {
    render(<HomeWithRouter />);

    // Vérifier la hiérarchie des éléments
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Bienvenue');
    
    // Vérifier qu'il y a un paragraphe de description
    const description = screen.getByText(/Découvrez une interface moderne/);
    expect(description.tagName).toBe('P');
  });

  test('accessibilité - éléments sont correctement étiquetés', () => {
    render(<HomeWithRouter />);

    // Vérifier qu'il y a un heading principal
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    
    // Vérifier que le lien est accessible
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Voir mes tâches');
  });
});
