import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Récupère la langue depuis localStorage ou 'fr' par défaut
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : 'fr';
  });

  useEffect(() => {
    // Sauvegarde la langue dans localStorage dès qu'elle change
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
