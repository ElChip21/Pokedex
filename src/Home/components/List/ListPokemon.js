import React from 'react';
import { Box, Typography } from '@mui/material'; // Importer Typography pour afficher le texte
import types from '../../../Common/types.json';
import Card from '../card';

const ListPokemon = ({ filteredPokemons, language }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {filteredPokemons.map((pokemon, index) => {
        // Formater l'index
        const formattedIndex = `No.${(pokemon.id).toString().padStart(3, '0')}`;
        
        return (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
            }}
          >          
            {/* Passer les informations nécessaires au composant Card */}
            <Card
              types={pokemon.types}
              name={pokemon.names[language]} 
              image={pokemon.image} 
              typesData={types} 
              currentLanguage={language}
              identifier={formattedIndex}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ListPokemon;
