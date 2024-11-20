import React, { createContext, useContext } from 'react';

// Créer le contexte
const localContext = createContext(null);

// Exporter le provider
export const LocalProvider = localContext.Provider;

// Exporter un hook personnalisé pour consommer le contexte
export const useLocalContext = () => {
  const context = useContext(localContext);
  if (context === null) {
    throw new Error('useLocalContext must be used within a LocalProvider');
  }
  return context;
};
