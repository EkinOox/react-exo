import { useState, useTransition, useDeferredValue, useMemo } from 'react';
import './Liste.css';

const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    category: ['Électronique', 'Vêtements', 'Livres', 'Sports', 'Maison'][index % 5],
    description: `Description détaillée de l'item ${index + 1}. Lorem ipsum dolor sit amet consectetur.`,
    price: Math.floor(Math.random() * 1000) + 10,
  }));
};

interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

export default function Liste() {
  const [items] = useState<Item[]>(() => generateItems(10));
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredItems = useMemo(() => {
    if (!deferredSearchTerm.trim()) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [items, deferredSearchTerm]);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

  };
  
  return (
    <div className="liste-container">
      <div className="search-section">
        <h2>Liste avec Recherche ({items.length} items)</h2>
        
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Rechercher dans la liste..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="search-info">
          <p>
            Affichage de <strong>{filteredItems.length}</strong> sur {items.length} items
            {deferredSearchTerm && (
              <> • Recherche: "<em>{deferredSearchTerm}</em>"</>
            )}
          </p>
        </div>
      </div>
      
      <div className="liste-content">
        {filteredItems.length > 0 ? (
          <div className="items-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <span className="item-price">{item.price}€</span>
                </div>
                <div className="item-category">{item.category}</div>
                <p className="item-description">{item.description}</p>
                <div className="item-id">ID: {item.id}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucun résultat trouvé pour "{deferredSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
