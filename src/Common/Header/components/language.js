import React, { useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LanguageContext } from '../../Context/LanguageContext';

const SelectLanguage = () => {
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const desiredLanguage = ['fr', 'en', 'de', 'es', 'ja'];

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext); // Utilisation du contexte

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pokemonResponse] = await Promise.all([
          fetch('https://pokedex-jgabriele.vercel.app/pokemons.json'),
        ]);

        const pokemonData = await pokemonResponse.json();

        setPokemons(pokemonData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Met à jour les langues disponibles en fonction des pokemons
  useEffect(() => {
    const languagesSet = new Set();
    pokemons.forEach((pokemon) => {
      Object.keys(pokemon.names).forEach((lang) => {
        if (desiredLanguage.includes(lang)) {
          languagesSet.add(lang);
        }
      });
    });

    const sortedLanguages = desiredLanguage.filter((lang) => languagesSet.has(lang));
    setAvailableLanguages(sortedLanguages);
  }, [pokemons]);

  const handleChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

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
  );
};

export default SelectLanguage;
