import React from 'react';
import Card from '../card';
import { Box } from '@mui/system';
import types from '../../../Common/types.json';

const ListPokemon = ({ filteredPokemons, language }) => {
    // Ajout d'une vérification pour s'assurer que `filteredPokemons` existe
    if (!filteredPokemons || filteredPokemons.length === 0) {
      return null; // Message à afficher si aucun Pokémon n'est trouvé ou la liste est indéfinie
    }
  
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {filteredPokemons.map((pokemon, index) => (
        <Card 
          key={index} 
          types={pokemon.types} // Passer les types du Pokémon
          name={pokemon.names[language]} // Utiliser le nom dans la langue sélectionnée
          image={pokemon.image} 
          typesData={types} // Passer les données de types/ types.json
        />
      ))}
    </Box>
  );
};

export default ListPokemon;
