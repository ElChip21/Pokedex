import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import pokemons from '../../Common/pokemons.json';
import ListPokemon from './List/ListPokemon'; // Importer le composant ListPokemon

const SearchComponent = () => {
    const [language, setLanguage] = useState('fr'); // Langue par défaut
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons); // Liste filtrée des pokémons
    const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche

    // Filtre les pokémons en fonction du texte de recherche et de la langue sélectionnée
    useEffect(() => {
        const filtered = pokemons.filter((pokemon) =>
            pokemon.names[language]?.toLowerCase().includes(searchTerm.toLowerCase()) // Comparaison insensible à la casse
        );
        setFilteredPokemons(filtered);
    }, [searchTerm, language]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Mettre à jour le texte de recherche
    };

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
                        color: 'white', // Couleur du texte
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(87,90,96)', // Couleur de la bordure par défaut
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Couleur de la bordure au survol
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Couleur de l'étiquette
                    },
                }}
            />


            <ListPokemon filteredPokemons={filteredPokemons} language={language} />
        </Box>
    );
};

export default SearchComponent;
