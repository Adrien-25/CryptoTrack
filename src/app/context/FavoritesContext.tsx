"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  toggleShowFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Ajoute Bitcoin par défaut aux favoris si ce n'est pas déjà fait
  useEffect(() => {
    if (!favoriteIds.includes("bitcoin")) {
      setFavoriteIds((prevIds) => ["bitcoin", ...prevIds]); // Ajoute l'ID de Bitcoin aux favoris
    }
  }, [favoriteIds]); // Se déclenche seulement si favoriteIds change

  const toggleFavorite = (id: string) => {
    if (id === "bitcoin") return;
    setFavoriteIds((prevIds) => (prevIds.includes(id) ? prevIds.filter((favId) => favId !== id) : [...prevIds, id]));
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, showFavoritesOnly, toggleShowFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
