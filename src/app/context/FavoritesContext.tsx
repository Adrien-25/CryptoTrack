// context/FavoritesContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Déclare un type pour le contexte
type FavoritesContextType = {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

// 2. Crée le contexte avec ce type et initialise-le avec null comme valeur par défaut
const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (id: string) => setFavorites([...favorites, id]);
  const removeFavorite = (id: string) => setFavorites(favorites.filter(fav => fav !== id));
  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Met à jour le hook `useFavorites` pour gérer le cas où le contexte serait `null`
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
