import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useLocalContext } from '../../Context/LocalContext'

const SelectLanguage = () => {
  const [availableLanguages, setAvailableLanguages] = useState([])
  const desiredLanguage = ['fr', 'en', 'de', 'es', 'ja']

  const { currentLanguage, handleLanguageChange } = useLocalContext()

  const [pokemons, setPokemons] = useState([])
  const [setTypes] = useState({})
  const [setFilteredPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // On récupère les données des Pokémons depuis l'API
        const [pokemonResponse] = await Promise.all([
          fetch('https://pokedex-jgabriele.vercel.app/pokemons.json'),
        ])

        const pokemonData = await pokemonResponse.json()

        setPokemons(pokemonData)
        setFilteredPokemons(pokemonData) // Initialise le filtrage avec tous les Pokémons
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err)
        setError('Impossible de charger les données.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const languagesSet = new Set() // Permet de ne pas avoir de doublons
    pokemons.forEach((pokemon) => {
      Object.keys(pokemon.names).forEach((lang) => {
        if (desiredLanguage.includes(lang)) {
          languagesSet.add(lang)
        }
      })
    })

    // Conserver seulement les langues dans l'ordre de desiredLanguage
    const sortedLanguages = desiredLanguage.filter((lang) => languagesSet.has(lang))

    setAvailableLanguages(sortedLanguages)
  }, [pokemons]) // Ajouter pokemons dans les dépendances

  const handleChange = (event) => {
    handleLanguageChange(event.target.value)
  }

  return (
    <div>
      <FormControl sx={{ m: 1 }}>
        <Select
          value={currentLanguage}
          onChange={handleChange}
          autoWidth
          sx={{
            color: 'white',
            borderColor: 'rgb(87,90,96)',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(87,90,96)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(255,148,65)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'black',
              },
            },
          }}
        >
          {availableLanguages.map((lang) => (
            <MenuItem
              key={lang}
              value={lang}
              sx={{
                color: 'white',
                backgroundColor:
                  currentLanguage === lang ? 'rgba(128, 128, 128, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(128, 128, 128, 0.9)',
                },
              }}
            >
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectLanguage
