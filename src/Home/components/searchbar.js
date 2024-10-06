import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import pokemons from '../../Common/pokemons.json';
import ListPokemon from './List/ListPokemon';

const SearchComponent = ({ language }) => {
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filtered = pokemons.filter((pokemon) =>
            pokemon.names[language]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemons(filtered);
    }, [searchTerm, language]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(87,90,96)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                }}
            />
            <ListPokemon filteredPokemons={filteredPokemons} language={language} />
        </Box>
    );
};

export default SearchComponent;
