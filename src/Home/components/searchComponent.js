import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ListPokemon from './List/ListPokemon';
import { useLocalContext } from '../../Common/Context/LocalContext';

const SearchComponent = () => {
  const { currentLanguage } = useLocalContext();

  // State pour les données et les filtres
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState({});
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [selectedType, setSelectedType] = useState(localStorage.getItem('selectedType') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pokemonResponse, typesResponse] = await Promise.all([
          fetch('https://pokedex-jgabriele.vercel.app/pokemons.json'),
          fetch('https://pokedex-jgabriele.vercel.app/types.json'),   
        ]);
        const pokemonData = await pokemonResponse.json();
        const typesData = await typesResponse.json();

        setPokemons(pokemonData);
        setTypes(typesData);
        setFilteredPokemons(pokemonData); 
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      // Sauvegarde dans le localStorage
      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('selectedType', selectedType);

      // Appliquer les filtres
      const filtered = pokemons.filter((pokemon) => {
        const matchesSearchTerm = pokemon.names[currentLanguage]
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
        return matchesSearchTerm && matchesType;
      });

      setFilteredPokemons(filtered);
    }
  }, [searchTerm, currentLanguage, selectedType, pokemons]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  if (loading) {
    return <Box>Chargement en cours...</Box>;
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
  );
};

export default SearchComponent;
