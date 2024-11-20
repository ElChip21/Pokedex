import React, { useState, useEffect } from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import pokemons from '../../Common/pokemons.json'
import ListPokemon from './List/ListPokemon'
import { useLocalContext } from '../../Common/Context/LocalContext'
import types from '../../Common/types.json'

const SearchComponent = () => {
  const { currentLanguage } = useLocalContext()

  // Récupérer le type et le texte recherché depuis le localStorage
  const savedSearchTerm = localStorage.getItem('searchTerm') || ''
  const savedType = localStorage.getItem('selectedType') || ''

  const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm)
  const [selectedType, setSelectedType] = useState(savedType)

  useEffect(() => {
    // Sauvegarde des valeurs dans le localStorage
    localStorage.setItem('searchTerm', searchTerm)
    localStorage.setItem('selectedType', selectedType)

    // Filtrage des Pokémons
    const filtered = pokemons.filter((pokemon) => {
      const matchesSearchTerm = pokemon.names[currentLanguage]
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType = selectedType ? pokemon.types.includes(selectedType) : true
      return matchesSearchTerm && matchesType
    })

    setFilteredPokemons(filtered)
  }, [searchTerm, currentLanguage, selectedType])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  return (
    <Box sx={{ m: '16px 32px' }}>
      <TextField
        fullWidth
        label="Enter a Pokémon name"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        sx={{
          '& input': {
            color: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(255,148,65)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
      />

      {/* Filtre par type */}
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="type-select-label" sx={{ color: 'white' }}>
          Type
        </InputLabel>
        <Select
          labelId="type-select-label"
          value={selectedType}
          label="Type"
          onChange={handleTypeChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'rgb(255,148,65)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(255,148,65)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiSelect-icon': {
              color: 'white',
            },
          }}
        >
          <MenuItem value="">Tous les types</MenuItem>
          {Object.keys(types).map((typeKey) => (
            <MenuItem key={typeKey} value={typeKey}>
              {types[typeKey].translations[currentLanguage]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Liste des Pokémons filtrés */}
      <ListPokemon filteredPokemons={filteredPokemons} />
    </Box>
  )
}

export default SearchComponent
