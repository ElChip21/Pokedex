import { Box, GlobalStyles } from '@mui/material'
import './App.css'
import Header from './Common/Header/header'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home'
import PokemonDetail from './Details/pokemonDetails'
import { useState } from 'react'
import { LocalProvider } from './Common/Context/LocalContext'

function App() {

  const [currentLanguage, setCurrentLanguage] = useState('fr')

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage) // Mettre à jour la langue
  }

  return (
    <>
      <BrowserRouter>
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
      {/* Fournir le contexte pour la langue */}
      <LocalProvider value={{ currentLanguage, handleLanguageChange }}>
        <Box>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="pokemon/:id" element={<PokemonDetail />} />            
            </Routes>
        </Box>
      </LocalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
