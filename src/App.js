import { Box, GlobalStyles } from '@mui/material'
import './App.css'
import Header from './Common/Header/header'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home'
import PokemonDetail from './Details/pokemonDetails'
import { LanguageProvider } from './Common/Context/LanguageContext'

function App() {

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
      <LanguageProvider >
        <Box>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="pokemon/:id" element={<PokemonDetail />} />            
            </Routes>
        </Box>
      </LanguageProvider>
      </BrowserRouter>
    </>
  )
}

export default App
