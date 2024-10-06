import { Box, GlobalStyles } from '@mui/material';
import './App.css';
import Header from './Common/Header/header';
import Home from './Home';
import { useState } from 'react';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('fr'); // Gérer la langue dans App directement

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage); // Mettre à jour la langue
  };

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: 'rgb(40,44,52)', 
            margin: 0, 
            padding: 0,
            height: '100%',
          },
        }}
      />
      <Box>
        {/* On passe currentLanguage et handleLanguageChange à Header et Home  */}
        <Header currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
        <Home currentLanguage={currentLanguage} />
      </Box>
    </>
  );
}

export default App;
