import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import pokemons from '../../pokemons.json';

export default function SelectLanguage({currentLanguage, onLanguageChange}) {
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const desiredLanguage = ['fr', 'en', 'de', 'es', 'ja'];

    useEffect(() => {
        // Extraire les langues disponibles à partir de pokemons.json
        const languagesSet = new Set();
    
        pokemons.forEach((pokemon) => {
            Object.keys(pokemon.names).forEach((lang) => {
                if (desiredLanguage.includes(lang)) {
                    languagesSet.add(lang);
                }
            });
        });
    
        // Conserver seulement les langues dans l'ordre de desiredLanguage
        const sortedLanguages = desiredLanguage.filter((lang) => languagesSet.has(lang));
    
        setAvailableLanguages(sortedLanguages);
    }, []);

    const handleChange = (event) => {
        setAvailableLanguages(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1}}>
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
                                backgroundColor: currentLanguage === lang ? 'rgba(128, 128, 128, 0.9)' : 'rgba(0, 0, 0, 0.8)',
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
}